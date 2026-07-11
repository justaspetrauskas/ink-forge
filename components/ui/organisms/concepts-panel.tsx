"use client";

import type { ReactElement } from "react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Concept = {
  title: string;
  style: string;
  generatedAt: string;
};

type ConceptsPanelProps = {
  concepts: Concept[];
};

export function ConceptsPanel({ concepts }: ConceptsPanelProps): ReactElement {
  const [open, setOpen] = useState(true);

  return (
    <aside className="w-full shrink-0 border-t border-[var(--border-subtle)] pt-4 lg:w-80 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={open}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-tertiary)]">
          Latest concepts
        </span>
        <span className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)]">
          {concepts.length}
          <ChevronDown
            size={12}
            strokeWidth={2.5}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </span>
      </button>

      {open ? (
        <ul className="mt-3 space-y-3">
          {concepts.map((c) => (
            <li key={c.title}>
              <button
                type="button"
                className="group w-full overflow-hidden rounded-[10px] border border-[var(--border-subtle)] text-left transition-shadow duration-150 hover:shadow-[var(--shadow-md)]"
              >
                {/* Artwork thumbnail */}
                <div className="relative h-36 w-full bg-[radial-gradient(circle_at_20%_10%,color-mix(in_srgb,var(--accent)_8%,transparent),transparent_40%),linear-gradient(165deg,var(--art-canvas-a),var(--art-canvas-b))]">
                  <span className="absolute bottom-2 left-3 text-[10px] font-medium text-[var(--text-tertiary)]">Preview</span>
                </div>
                {/* Meta */}
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[var(--text-primary)]">{c.title}</p>
                    <p className="text-xs text-[var(--text-tertiary)]">{c.generatedAt}</p>
                  </div>
                  <span className="ml-2 shrink-0 rounded-full bg-[var(--bg-raised)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-secondary)]">
                    {c.style}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </aside>
  );
}
