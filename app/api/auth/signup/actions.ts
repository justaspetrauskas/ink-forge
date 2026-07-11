"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type SignupState = {
  error?: string;
  success?: boolean;
};

export async function signup(
  previousState: SignupState,
  formData: FormData
): Promise<SignupState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!email || !password || !confirmPassword) {
    return {
      error: "Email and both password fields are required",
    };
  }

  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match",
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  if (!data.user) {
    return {
      success: true,
    };
  }

  const { error: profileError } = await supabase.from("profiles").insert({
    id: data.user.id,
  });

  if (profileError) {
    return {
      error: profileError.message,
    };
  }

  redirect("/home");
}