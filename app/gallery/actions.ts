"use server";

import { createClient } from "@/lib/supabase/server";

export type TattooRecord = {
  id: string;
  user_id: string;
  user_prompt: string;
  style: string;
  placement: string;
  size: string;
  line_quality: string;
  shading: string;
  status: string;
  created_at: string;
};

export async function getMyTattoos(): Promise<TattooRecord[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await supabase
    .from("tattoos")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as TattooRecord[];
}
