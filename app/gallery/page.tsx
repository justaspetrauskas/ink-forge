import type { ReactElement } from "react";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/ui/organisms/app-shell";
import { getMyTattoos } from "@/app/gallery/actions";

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function GalleryPage(): Promise<ReactElement> {
  try {
    const tattoos = await getMyTattoos();

    return (
      <AppShell title="My Tattoos" subtitle="Newest requests first.">
        <section className="mx-auto w-full max-w-5xl space-y-4 p-6">
          {tattoos.length === 0 ? (
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-main)] p-8 text-center shadow-[var(--shadow-sm)]">
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">No tattoos yet</h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Generate your first tattoo to see it in this gallery.
              </p>
            </div>
          ) : (
            tattoos.map((tattoo) => (
              <article
                key={tattoo.id}
                className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-main)] p-5 shadow-[var(--shadow-sm)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{tattoo.user_prompt}</p>
                  <span className="rounded-full border border-[var(--border-medium)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
                    {tattoo.status}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 text-sm text-[var(--text-secondary)] sm:grid-cols-3">
                  <p>Style: {tattoo.style}</p>
                  <p>Placement: {tattoo.placement}</p>
                  <p>Size: {tattoo.size}</p>
                  <p>Line quality: {tattoo.line_quality}</p>
                  <p>Shading: {tattoo.shading}</p>
                  <p>Created: {formatDate(tattoo.created_at)}</p>
                </div>
              </article>
            ))
          )}
        </section>
      </AppShell>
    );
  } catch {
    redirect("/login");
  }
}
