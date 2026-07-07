import { ZodError, z } from "zod";
import { NextResponse } from "next/server";

import { fail, ok } from "@/lib/utils/api";
import { createClient } from "@/lib/supabase/server";

const WINDOW_MS = 60_000;
const MAX_ATTEMPTS_PER_WINDOW = 5;
const rateLimitStore = new Map<string, { count: number; windowStart: number }>();

const signupSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z
    .string()
    .min(10)
    .max(128)
});

function getRateLimitKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (!forwardedFor) {
    return "unknown";
  }

  const firstIp = forwardedFor.split(",")[0]?.trim();
  return firstIp || "unknown";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    rateLimitStore.set(key, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= MAX_ATTEMPTS_PER_WINDOW) {
    return true;
  }

  entry.count += 1;
  rateLimitStore.set(key, entry);
  return false;
}

function isFormSubmission(request: Request): boolean {
  const contentType = request.headers.get("content-type") || "";
  return contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data");
}

function redirectToSignup(request: Request, status: "success" | "error", message: string): Response {
  const url = new URL("/signup", request.url);
  url.searchParams.set("status", status);
  url.searchParams.set("message", message);
  return NextResponse.redirect(url, { status: 303 });
}

export async function POST(request: Request): Promise<Response> {
  const formRequest = isFormSubmission(request);

  try {
    const rateLimitKey = getRateLimitKey(request);

    if (isRateLimited(rateLimitKey)) {
      const message = "Too many signup attempts. Please try again in a minute.";

      if (formRequest) {
        return redirectToSignup(request, "error", message);
      }

      return Response.json(
        {
          error: {
            message,
          },
        },
        {
          status: 429,
          headers: {
            "Retry-After": "60",
          },
        }
      );
    }

    const payload = formRequest
      ? {
          email: String((await request.formData()).get("email") || ""),
          password: String((await request.formData()).get("password") || ""),
        }
      : await request.json();
    const { email, password } = signupSchema.parse(payload);

    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      if (formRequest) {
        return redirectToSignup(request, "error", "Unable to process signup request.");
      }

      return fail("Unable to process signup request.", 400);
    }

    const successMessage = "If the account is eligible, check your email for verification.";

    if (formRequest) {
      return redirectToSignup(request, "success", successMessage);
    }

    return ok({ message: successMessage }, 201);
  } catch (error) {
    if (error instanceof ZodError) {
      if (formRequest) {
        return redirectToSignup(request, "error", "Invalid signup payload.");
      }

      return fail("Invalid signup payload.", 422);
    }

    if (formRequest) {
      return redirectToSignup(request, "error", "Failed to sign up.");
    }

    return fail("Failed to sign up.", 500);
  }
}