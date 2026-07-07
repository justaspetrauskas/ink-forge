import type { TattooIdeaPayload } from "@/lib/prompts/tattoo";

export async function generateTattooPrompt(input: TattooIdeaPayload): Promise<string> {
  return [
    "Black ink tattoo flash, highly legible composition, plain white background.",
    `Subject: ${input.idea}.`,
    `Style: ${input.style}.`,
    `Linework: ${input.lineQuality}.`,
    `Shading: ${input.shading}.`,
    `Placement target: ${input.placement}.`,
    "Output: one centered concept drawing with clean silhouette and strong contrast.",
  ].join(" ");
}
