"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type LoginState = {
  error?: string;
};

const FALLBACK_NEXT_PATH = "/home";

function sanitizeNextPath(next: string | null): string {
  if (!next || !next.startsWith("/")) {
    return FALLBACK_NEXT_PATH;
  }

  if (next.startsWith("//")) {
    return FALLBACK_NEXT_PATH;
  }

  return next;
}

export async function login(
  previousState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      error: "Email and password are required",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  redirect("/home");
}

export async function loginWithGoogle(formData: FormData): Promise<void> {
  const nextPath = sanitizeNextPath(formData.get("next") as string | null);
  const supabase = await createClient();

  const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=${encodeURIComponent(nextPath)}`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
    },
  });

  if (error || !data.url) {
    redirect(`/login?error=${encodeURIComponent("Unable to start Google login")}`);
  }

  redirect(data.url);
}