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

type PromptEditorProps = Record<string, never>;

export function PromptEditor(_props: PromptEditorProps): ReactElement {
  const [prompt, setPrompt] = useState("");

  const remainingCharacters = useMemo(() => MAX_PROMPT_LENGTH - prompt.length, [prompt.length]);

  return (
    <section>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">Prompt Editor</h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Describe concept, placement, style, and mood with clear details.
          </p>
        </div>
        <p className="text-xs font-medium text-[var(--text-tertiary)]">{remainingCharacters} left</p>
      </div>

      <textarea
        name="prompt"
        value={prompt}
        onChange={(event) => setPrompt(event.target.value.slice(0, MAX_PROMPT_LENGTH))}
        placeholder="Example: Blackwork raven with abstract smoke trails, shoulder placement, high contrast and clean negative space."
        className="mt-4 h-44 w-full rounded-[10px] border border-[var(--border-medium)] bg-[var(--bg-main)] p-3 text-[16px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent)] focus:outline-none focus:shadow-[var(--focus-ring)]"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {suggestedPrompts.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setPrompt(item)}
            className="rounded-full border border-[var(--border-medium)] px-3 py-1 text-xs text-[var(--text-secondary)] transition-colors duration-150 hover:bg-[var(--bg-surface)]"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="button" variant="secondary">
          Improve Prompt
        </Button>
        <Button type="button">
          Generate Tattoo
        </Button>
      </div>
    </section>
  );
}
