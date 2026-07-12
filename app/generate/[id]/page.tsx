import type { ReactElement } from "react";
import { notFound, redirect } from "next/navigation";

import { AppShell } from "@/components/ui/organisms/app-shell";
import { createClient } from "@/lib/supabase/server";

type GenerateResultPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function GenerateResultPage({ params }: GenerateResultPageProps): Promise<ReactElement> {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data, error } = await supabase
    .from("tattoos")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !data) {
    notFound();
  }

  return (
    <AppShell title="Generation Result" subtitle="Live record from tattoos table.">
      <section className="mx-auto w-full max-w-4xl space-y-4 p-6">
        <article className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-main)] p-5 shadow-[var(--shadow-sm)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">{data.user_prompt}</h2>
            <span className="rounded-full border border-[var(--border-medium)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
              {data.status}
            </span>
          </div>

          <div className="mt-4 grid gap-3 text-sm text-[var(--text-secondary)] sm:grid-cols-2">
            <p>Style: {data.style}</p>
            <p>Placement: {data.placement}</p>
            <p>Size: {data.size}</p>
            <p>Line quality: {data.line_quality}</p>
            <p>Shading: {data.shading}</p>
            <p>Created: {formatDate(data.created_at)}</p>
          </div>

          <div className="mt-5 rounded-lg border border-[var(--border-medium)] bg-[var(--bg-surface)] p-3">
            <p className="mb-2 text-xs font-medium text-[var(--text-secondary)]">Record JSON</p>
            <pre className="max-h-72 overflow-auto text-xs text-[var(--text-secondary)]">{JSON.stringify(data, null, 2)}</pre>
          </div>
        </article>
      </section>
    </AppShell>
  );
}
