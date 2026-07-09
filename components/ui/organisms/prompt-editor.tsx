"use client";

import type { ReactElement } from "react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/atoms/button";

const MAX_PROMPT_LENGTH = 500;

const suggestedPrompts = [
  "Minimal blackwork wolf with geometric moon composition",
  "Fine line koi fish flowing around peony stems",
  "Neo traditional dagger and rose with high contrast shading",
  "Japanese crane with subtle wave texture and negative space"
];

type PromptEditorProps = {
  mode?: "full" | "rail";
};

export function PromptEditor({ mode = "full" }: PromptEditorProps): ReactElement {
  const [prompt, setPrompt] = useState("");

  const remainingCharacters = useMemo(() => MAX_PROMPT_LENGTH - prompt.length, [prompt.length]);
  const isRail = mode === "rail";

  return (
    <section className={isRail ? "border-l border-[var(--border-medium)] pl-5" : "border-t border-[var(--border-subtle)] pt-5"}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-[24px] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">Prompt Editor</h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            {isRail
              ? "Write direction while generated concepts stay visible on the canvas."
              : "Describe concept, placement, style, and mood with clear details."}
          </p>
        </div>
        <p className="text-xs font-medium text-[var(--text-tertiary)]">{remainingCharacters} left</p>
      </div>

      <textarea
        name="prompt"
        value={prompt}
        onChange={(event) => setPrompt(event.target.value.slice(0, MAX_PROMPT_LENGTH))}
        placeholder="Example: Blackwork raven with abstract smoke trails, shoulder placement, high contrast and clean negative space."
        className={[
          "mt-4 w-full border border-[var(--border-medium)] bg-[var(--bg-main)] p-3 text-[16px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent)] focus:outline-none focus:shadow-[var(--focus-ring)]",
          isRail ? "h-36" : "h-44"
        ].join(" ")}
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {suggestedPrompts.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setPrompt(item)}
            className="border border-[var(--border-medium)] px-3 py-1 text-xs text-[var(--text-secondary)] transition-colors duration-150 hover:bg-[var(--bg-surface)]"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="button" variant="secondary" className={isRail ? "w-full" : "w-full sm:w-auto"}>
          Improve Prompt
        </Button>
        <Button type="button" className={isRail ? "w-full" : "w-full sm:w-auto"}>
          Generate Tattoo
        </Button>
      </div>
    </section>
  );
}
