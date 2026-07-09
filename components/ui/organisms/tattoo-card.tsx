import type { ReactElement } from "react";

import { Button } from "@/components/ui/atoms/button";

type TattooCardProps = {
  title: string;
  style: string;
  prompt: string;
  generatedAt: string;
};

export function TattooCard({ title, style, prompt, generatedAt }: TattooCardProps): ReactElement {
  return (
    <article className="group overflow-hidden rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-main)] shadow-[var(--shadow-md)] transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]">
      <div className="relative h-72 border-b border-[var(--border-subtle)] bg-[radial-gradient(circle_at_20%_10%,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_35%),linear-gradient(165deg,var(--art-canvas-a),var(--art-canvas-b))]">
        <button
          type="button"
          aria-label="Favorite tattoo"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface-overlay-strong)] text-sm text-[var(--text-secondary)] shadow-[var(--shadow-sm)] transition-colors duration-150 hover:text-[var(--accent)]"
        >
          ❤
        </button>

        <p className="absolute bottom-4 left-4 rounded-full bg-[var(--surface-overlay-strong)] px-3 py-1 text-[12px] font-medium text-[var(--text-secondary)]">
          Artwork preview
        </p>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[24px] font-semibold leading-tight tracking-[-0.02em] text-[var(--text-primary)]">{title}</h3>
          <span className="rounded-full bg-[var(--bg-surface)] px-3 py-1 text-[12px] font-medium text-[var(--text-secondary)]">{style}</span>
        </div>

        <p className="line-clamp-3 text-sm leading-relaxed text-[var(--text-secondary)]">{prompt}</p>

        <div className="flex items-center justify-between text-[12px] text-[var(--text-tertiary)]">
          <span>{generatedAt}</span>
          <div className="flex gap-2 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
            <Button type="button" variant="secondary" className="h-8 rounded-[8px] px-3 text-xs">
              Refine
            </Button>
            <Button type="button" variant="ghost" className="h-8 rounded-[8px] px-3 text-xs">
              Save
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
