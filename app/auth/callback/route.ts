import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

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

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const nextPath = sanitizeNextPath(searchParams.get("next"));

  const supabase = await createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      if (searchParams.has("next")) {
        return NextResponse.redirect(new URL(nextPath, origin));
      }

      return NextResponse.redirect(new URL("/auth/reset-password", origin));
    }
  }

  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as "recovery",
    });
    if (!error) {
      return NextResponse.redirect(new URL("/auth/reset-password", origin));
    }
  }

  return NextResponse.redirect(new URL("/auth/login?error=invalid_link", origin));
}
