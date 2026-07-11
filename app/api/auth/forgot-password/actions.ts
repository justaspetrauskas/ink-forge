"use server";

import { createClient } from "@/lib/supabase/server";

export type ForgotPasswordState = {
  error?: string;
  success?: boolean;
};

export async function requestPasswordReset(
  _prev: ForgotPasswordState,
  formData: FormData
): Promise<ForgotPasswordState> {
  const email = formData.get("email");

  if (typeof email !== "string" || !email) {
    return { error: "Email is required." };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
  });

  if (error) {
    return { error: "Something went wrong. Please try again." };
  }

  return { success: true };
}
