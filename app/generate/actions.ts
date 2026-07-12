"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

const createTattooSchema = z.object({
  user_prompt: z.string().min(1).max(400),
  style: z.string().min(1).max(120),
  placement: z.string().min(1).max(120),
  size: z.string().min(1).max(120),
  line_quality: z.string().min(1).max(120),
  shading: z.string().min(1).max(120),
  status: z.literal("generating"),
});

export type CreateTattooState = {
  error?: string;
  success?: string;
  tattooId?: string;
};

export async function createTattoo(
  _previousState: CreateTattooState,
  formData: FormData
): Promise<CreateTattooState> {
  const parsed = createTattooSchema.safeParse({
    user_prompt: formData.get("user_prompt"),
    style: formData.get("style"),
    placement: formData.get("placement"),
    size: formData.get("size"),
    line_quality: formData.get("line_quality"),
    shading: formData.get("shading"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return { error: "Invalid tattoo payload" };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("tattoos")
    .insert({
      user_id: user.id,
      user_prompt: parsed.data.user_prompt,
      style: parsed.data.style,
      placement: parsed.data.placement,
      size: parsed.data.size,
      line_quality: parsed.data.line_quality,
      shading: parsed.data.shading,
      status: "generating",
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  redirect(`/generate/${data.id}`);
}
