import Link from "next/link";
import { redirect } from "next/navigation";

import { logout } from "@/app/auth/logout/actions";
import { Button } from "@/components/ui/atoms/button";
import { AuthStoreSync } from "@/components/ui/organisms/auth-store-sync";
import { AppShell } from "@/components/ui/organisms/app-shell";
import { createClient } from "@/lib/supabase/server";

const generationModes = [
  {
    title: "Flash pass",
    detail: "Three quick directions to test silhouette and motion.",
    pace: "30s"
  },
  {
    title: "Detail pass",
    detail: "One stronger draft with line weight and texture language.",
    pace: "1m"
  },
  {
    title: "Placement pass",
    detail: "Flow test for forearm, shoulder, chest, or calf mapping.",
    pace: "45s"
  }
];

const recentConcepts = [
  { name: "Raven Sigil", style: "Blackwork", date: "Jul 8" },
  { name: "Koi Ascend", style: "Japanese", date: "Jul 7" },
  { name: "Signal Rose", style: "Neo Traditional", date: "Jul 6" }
];

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase.from("profiles").select("id").eq("id", user.id).maybeSingle();

  return (
    <AppShell title="Studio" subtitle="Generation takes priority. Archive and account details stay out of the way.">
      <AuthStoreSync
        user={{
          id: user.id,
          email: user.email ?? null
        }}
      />

      <section className="grid gap-10 xl:grid-cols-[1.62fr_0.88fr]">
        <article className="relative pb-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-4 top-0 h-full w-[3px] bg-[linear-gradient(180deg,var(--accent)_0%,rgba(220,38,38,0.15)_65%,transparent_100%)]"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-6 h-64 bg-[radial-gradient(circle_at_12%_6%,rgba(220,38,38,0.09),transparent_38%),radial-gradient(circle_at_90%_0%,rgba(10,10,10,0.05),transparent_45%)]"
          />

          <div className="relative space-y-8 pl-4">
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--text-tertiary)]">Tattoo concept studio</p>
              <h2 className="max-w-[18ch] text-[34px] font-bold leading-[1.02] tracking-[-0.03em] text-[var(--text-primary)] sm:text-[46px]">
                Build marks, not dashboards.
              </h2>
              <p className="max-w-[62ch] text-sm leading-relaxed text-[var(--text-secondary)] sm:text-[16px]">
                Start with style, subject, and placement. Generate fast, compare hard, and keep only concepts you would take to stencil.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/generate">
                <Button type="button">Open Generator</Button>
              </Link>

              <Button type="button" variant="secondary">
                Use Random Prompt
              </Button>
            </div>

            <div className="grid gap-4 border-y border-[var(--border-subtle)] py-5 sm:grid-cols-3">
              {generationModes.map((mode) => (
                <article key={mode.title} className="border-l border-[var(--border-medium)] pl-4">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{mode.title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">{mode.detail}</p>
                  <p className="mt-3 text-xs font-medium text-[var(--accent)]">{mode.pace}</p>
                </article>
              ))}
            </div>

            <div className="max-w-[70ch] space-y-2">
              <p className="text-xs font-medium text-[var(--text-tertiary)]">Prompt formula</p>
              <p className="text-sm text-[var(--text-secondary)]">Subject + style + placement + contrast target + negative-space note.</p>
              <p className="text-sm text-[var(--text-secondary)]">Example: Raven sigil, blackwork, outer forearm, high contrast, open halo negative space.</p>
            </div>
          </div>
        </article>

        <aside className="space-y-8 border-t border-[var(--border-subtle)] pt-6 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0">
          <section className="space-y-4 border-b border-[var(--border-subtle)] pb-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-[var(--text-tertiary)]">Signed in</p>
                <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">{user.email}</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">Profile status: {profile ? "Ready" : "Pending setup"}</p>
                <p className="mt-1 max-w-[44ch] truncate text-xs text-[var(--text-tertiary)]">{user.id}</p>
              </div>

              <div className="rounded-full border border-[var(--border-medium)] px-3 py-1 text-xs text-[var(--text-secondary)]">
                Studio tier: Free
              </div>
            </div>

            <div className="pt-2">
              <form action={logout}>
                <Button type="submit" variant="ghost">
                  Log out
                </Button>
              </form>
            </div>
          </section>

          <section className="space-y-4 border-b border-[var(--border-subtle)] pb-6">
            <div className="flex items-center justify-between">
              <h3 className="text-[24px] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">Recent Concepts</h3>
              <Link
                href="/generate"
                className="text-sm font-medium text-[var(--accent)] transition-colors duration-150 hover:text-[var(--accent-hover)]"
              >
                Open Generator
              </Link>
            </div>

            <ul className="mt-2 divide-y divide-[var(--border-subtle)]">
              {recentConcepts.map((concept) => (
                <li key={concept.name} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{concept.name}</p>
                    <p className="mt-1 text-xs text-[var(--text-secondary)]">{concept.style}</p>
                  </div>
                  <p className="text-xs text-[var(--text-tertiary)]">{concept.date}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <p className="text-xs font-medium text-[var(--text-tertiary)]">Favorites</p>
            <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">No favorites yet</h3>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">
              Save standout concepts from the generator to build a focused shortlist for your final tattoo direction.
            </p>

            <div className="pt-1">
              <p className="text-sm text-[var(--text-secondary)]">Start your first design and favorite what feels right.</p>
              <Link href="/generate" className="mt-4 inline-block">
                <Button type="button">Generate First Concept</Button>
              </Link>
            </div>
          </section>
        </aside>
      </section>
    </AppShell>
  );
}