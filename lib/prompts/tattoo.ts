import { z } from "zod";

export const tattooIdeaSchema = z.object({
  idea: z.string().min(5).max(400),
  style: z.string().min(2).max(120),
  lineQuality: z.string().min(2).max(120),
  shading: z.string().min(2).max(120),
  placement: z.string().min(2).max(120),
  size: z.string().min(2).max(120),
});

export const imagePromptSchema = z.object({
  prompt: z.string().min(10).max(2000),
});

export const saveProjectSchema = z.object({
  idea: z.string().min(5).max(400),
  prompt: z.string().min(10).max(2000),
  images: z.array(z.string().url()).min(1).max(8),
});

export type TattooIdeaPayload = z.infer<typeof tattooIdeaSchema>;
