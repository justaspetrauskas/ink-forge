import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function IndexPage(): Promise<never> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  redirect("/home");
}