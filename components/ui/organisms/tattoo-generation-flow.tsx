"use client";

import type { ReactElement } from "react";
import { useActionState, useEffect, useMemo, useState } from "react";

import { createTattoo, type CreateTattooState } from "@/app/generate/actions";
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

const initialCreateTattooState: CreateTattooState = {};

export function TattooGenerationFlow(_props: TattooGenerationFlowProps): ReactElement {
  const [createState, submitAction, isSubmitting] = useActionState(createTattoo, initialCreateTattooState);
  const [idea, setIdea] = useState("");
  const [selectedStyleLabel, setSelectedStyleLabel] = useState(TATTOO_STYLES[0]?.label ?? "");
  const [selectedSizeLabel, setSelectedSizeLabel] = useState(TATTOO_SIZES[1]?.label ?? TATTOO_SIZES[0]?.label ?? "");
  const [lineQuality, setLineQuality] = useState<string>(LINE_QUALITY_OPTIONS[0]);
  const [shading, setShading] = useState<string>(SHADING_OPTIONS[0]);
  const [placement, setPlacement] = useState("Forearm");

  const selectedStyle = useMemo(
    () => TATTOO_STYLES.find((style) => style.label === selectedStyleLabel) ?? TATTOO_STYLES[0],
    [selectedStyleLabel]
  );

  const selectedSize = useMemo(
    () => TATTOO_SIZES.find((size) => size.label === selectedSizeLabel) ?? TATTOO_SIZES[0],
    [selectedSizeLabel]
  );

  const remainingCharacters = MAX_IDEA_LENGTH - idea.length;

  const canGenerate =
    idea.trim().length >= 5 &&
    Boolean(selectedStyle?.label) &&
    Boolean(selectedSize?.label) &&
    placement.trim().length >= 2;

  const selectionPayload = useMemo(
    () => ({
      user_prompt: idea,
      style: selectedStyle?.label ?? "",
      placement,
      size: selectedSize?.label ?? "",
      line_quality: lineQuality,
      shading,
      status: "generating",
    }),
    [idea, lineQuality, placement, selectedSize?.label, selectedStyle?.label, shading]
  );

  const resetForm = (): void => {
    setIdea("");
    setSelectedStyleLabel(TATTOO_STYLES[0]?.label ?? "");
    setSelectedSizeLabel(TATTOO_SIZES[1]?.label ?? TATTOO_SIZES[0]?.label ?? "");
    setLineQuality(LINE_QUALITY_OPTIONS[0]);
    setShading(SHADING_OPTIONS[0]);
    setPlacement("Forearm");
  };

  useEffect(() => {
    if (createState.success) {
      resetForm();
    }
  }, [createState.success]);

  return (
    <form action={submitAction} className="space-y-6">
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
            name="user_prompt"
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
              const active = style.label === selectedStyleLabel;
              return (
                <button
                  key={style.label}
                  type="button"
                  onClick={() => {
                    setSelectedStyleLabel(style.label);
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
                name="line_quality"
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
                name="shading"
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
                name="placement"
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
              const active = size.label === selectedSizeLabel;
              return (
                <button
                  key={size.label}
                  type="button"
                  onClick={() => setSelectedSizeLabel(size.label)}
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

          <input type="hidden" name="style" value={selectedStyle?.label ?? ""} />
          <input type="hidden" name="size" value={selectedSize?.label ?? ""} />
          <input type="hidden" name="status" value="generating" />

          <div className="rounded-lg border border-[var(--border-medium)] bg-[var(--bg-main)] p-3">
            <p className="mb-2 text-xs font-medium text-[var(--text-secondary)]">Selection JSON</p>
            <pre className="max-h-48 overflow-auto text-xs text-[var(--text-secondary)]">
              {JSON.stringify(selectionPayload, null, 2)}
            </pre>
          </div>

          {createState.error ? (
            <p className="text-sm text-[var(--error)]" role="alert">
              {createState.error}
            </p>
          ) : null}

          {createState.success ? (
            <p className="text-sm text-[var(--success)]" role="status">
              {createState.success}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={!canGenerate || isSubmitting}>
              {isSubmitting ? "Creating..." : "Generate Tattoo"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={resetForm}
            >
              Reset
            </Button>
          </div>
        </section>
      </div>
    </form>
  );
}
