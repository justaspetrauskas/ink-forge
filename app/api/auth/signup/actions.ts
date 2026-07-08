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

  if (!email || !password) {
    return {
      error: "Email and password are required",
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  console.log('data', data);

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