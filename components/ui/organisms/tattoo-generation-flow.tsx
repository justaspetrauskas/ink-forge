"use client";

import type { ReactElement } from "react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/atoms/button";
import {
  LINE_QUALITY_OPTIONS,
  SHADING_OPTIONS,
  TATTOO_SIZES,
  TATTOO_STYLES,
} from "@/lib/tattoo/generation-config";

const MAX_IDEA_LENGTH = 400;

type TattooGenerationFlowProps = Record<string, never>;

const stepLabels = [
  "1. Enter tattoo idea",
  "2. Choose style and options",
  "3. Choose size",
  "4. Generate"
] as const;

export function TattooGenerationFlow(_props: TattooGenerationFlowProps): ReactElement {
  const [idea, setIdea] = useState("");
  const [styleId, setStyleId] = useState(TATTOO_STYLES[0]?.id ?? "");
  const [sizeId, setSizeId] = useState(TATTOO_SIZES[1]?.id ?? TATTOO_SIZES[0]?.id ?? "");
  const [lineQuality, setLineQuality] = useState<string>(LINE_QUALITY_OPTIONS[0]);
  const [shading, setShading] = useState<string>(SHADING_OPTIONS[0]);
  const [placement, setPlacement] = useState("Forearm");

  const selectedStyle = useMemo(
    () => TATTOO_STYLES.find((style) => style.id === styleId) ?? TATTOO_STYLES[0],
    [styleId]
  );

  const selectedSize = useMemo(
    () => TATTOO_SIZES.find((size) => size.id === sizeId) ?? TATTOO_SIZES[0],
    [sizeId]
  );

  const remainingCharacters = MAX_IDEA_LENGTH - idea.length;

  const canGenerate =
    idea.trim().length >= 5 &&
    Boolean(selectedStyle?.id) &&
    Boolean(selectedSize?.id) &&
    placement.trim().length >= 2;

  const selectionPayload = useMemo(
    () => ({
      idea,
      styleId: selectedStyle?.id ?? "",
      style: selectedStyle?.label ?? "",
      lineQuality,
      shading,
      placement,
      sizeId: selectedSize?.id ?? "",
      size: selectedSize?.label ?? "",
    }),
    [idea, lineQuality, placement, selectedSize?.id, selectedSize?.label, selectedStyle?.id, selectedStyle?.label, shading]
  );

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-main)] p-5 shadow-[var(--shadow-sm)] sm:p-6">
        <h2 className="text-[30px] font-semibold leading-[1.04] tracking-[-0.03em] text-[var(--text-primary)]">
          Tattoo Prompt Builder
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Follow the flow: idea, style, options, size, then generate.
        </p>

        <ol className="mt-4 grid gap-2 text-xs sm:grid-cols-2">
          {stepLabels.map((stepLabel) => (
            <li
              key={stepLabel}
              className="rounded-full border border-[var(--border-medium)] px-3 py-1.5 font-medium text-[var(--text-secondary)]"
            >
              {stepLabel}
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-main)] p-5 shadow-[var(--shadow-sm)] sm:p-6">
        <section>
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">1. Enter tattoo idea</h3>
            <p className="text-xs font-medium text-[var(--text-tertiary)]">{remainingCharacters} left</p>
          </div>

          <textarea
            name="idea"
            value={idea}
            onChange={(event) => setIdea(event.target.value.slice(0, MAX_IDEA_LENGTH))}
            placeholder="Example: A storm raven wrapped around a compass with open negative space"
            className="mt-3 h-32 w-full rounded-[10px] border border-[var(--border-medium)] bg-[var(--bg-main)] p-3 text-[16px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent)] focus:outline-none focus:shadow-[var(--focus-ring)]"
          />
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">2. Choose style and options</h3>

          <div className="flex flex-wrap gap-2">
            {TATTOO_STYLES.map((style) => {
              const active = style.id === styleId;
              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => {
                    setStyleId(style.id);
                    setLineQuality(style.recommendedLineQuality);
                    setShading(style.recommendedShading);
                  }}
                  className={[
                    "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors duration-150",
                    active
                      ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-foreground)]"
                      : "border-[var(--border-medium)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]"
                  ].join(" ")}
                  aria-pressed={active}
                >
                  {style.label}
                </button>
              );
            })}
          </div>

          <p className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-2 text-xs text-[var(--text-secondary)]">
            {selectedStyle?.description}
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            <label className="space-y-1.5">
              <span className="text-xs font-medium text-[var(--text-secondary)]">Line quality</span>
              <select
                value={lineQuality}
                onChange={(event) => setLineQuality(event.target.value)}
                className="h-11 w-full rounded-[10px] border border-[var(--border-medium)] px-3 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none"
              >
                {LINE_QUALITY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-medium text-[var(--text-secondary)]">Shading</span>
              <select
                value={shading}
                onChange={(event) => setShading(event.target.value)}
                className="h-11 w-full rounded-[10px] border border-[var(--border-medium)] px-3 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none"
              >
                {SHADING_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1.5">
              <span className="text-xs font-medium text-[var(--text-secondary)]">Placement</span>
              <input
                type="text"
                value={placement}
                onChange={(event) => setPlacement(event.target.value)}
                placeholder="Forearm"
                className="h-11 w-full rounded-[10px] border border-[var(--border-medium)] px-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent)] focus:outline-none"
              />
            </label>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">3. Choose size</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {TATTOO_SIZES.map((size) => {
              const active = size.id === sizeId;
              return (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => setSizeId(size.id)}
                  className={[
                    "rounded-xl border p-3 text-left transition-all duration-150",
                    active
                      ? "border-[var(--accent)] bg-[var(--bg-surface)] shadow-[var(--shadow-sm)]"
                      : "border-[var(--border-medium)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface)]"
                  ].join(" ")}
                  aria-pressed={active}
                >
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{size.label}</p>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">{size.bodyFit}</p>
                </button>
              );
            })}
          </div>
        </section>

        <section className="space-y-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">4. Generate</h3>
          <p className="text-xs text-[var(--text-secondary)]">Generate to create your tattoo concept from the selected setup.</p>

          <div className="rounded-lg border border-[var(--border-medium)] bg-[var(--bg-main)] p-3">
            <p className="mb-2 text-xs font-medium text-[var(--text-secondary)]">Selection JSON</p>
            <pre className="max-h-48 overflow-auto text-xs text-[var(--text-secondary)]">
              {JSON.stringify(selectionPayload, null, 2)}
            </pre>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="button" disabled={!canGenerate}>
              Generate Tattoo
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIdea("");
                setStyleId(TATTOO_STYLES[0]?.id ?? "");
                setSizeId(TATTOO_SIZES[1]?.id ?? TATTOO_SIZES[0]?.id ?? "");
                setLineQuality(LINE_QUALITY_OPTIONS[0]);
                setShading(SHADING_OPTIONS[0]);
                setPlacement("Forearm");
              }}
            >
              Reset
            </Button>
          </div>
        </section>
      </div>
    </section>
  );
}
