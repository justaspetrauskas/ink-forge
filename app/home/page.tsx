import Link from "next/link";
import { redirect } from "next/navigation";

import { logout } from "@/app/api/auth/logout/actions";
import { Button } from "@/components/ui/atoms/button";
import { AuthStoreSync } from "@/components/ui/organisms/auth-store-sync";
import { AppShell } from "@/components/ui/organisms/app-shell";
import { createClient } from "@/lib/supabase/server";

const quickStats = [
  { label: "Generated", value: "12" },
  { label: "Favorites", value: "4" },
  { label: "In Progress", value: "3" }
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
    redirect("/login");
  }

  const { data: profile } = await supabase.from("profiles").select("id").eq("id", user.id).maybeSingle();

  return (
    <AppShell title="Gallery" subtitle="Your private space for generated tattoo directions and saved concepts.">
      <AuthStoreSync
        user={{
          id: user.id,
          email: user.email ?? null
        }}
      />

      <section className="space-y-5">
        <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-main)] p-6 shadow-[var(--shadow-md)]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-[var(--text-tertiary)]">Signed in</p>
                <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">{user.email}</h2>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">Profile status: {profile ? "Ready" : "Pending setup"}</p>
                <p className="mt-1 max-w-[44ch] truncate text-xs text-[var(--text-tertiary)]">{user.id}</p>
              </div>

              <div className="rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-2 text-xs text-[var(--text-secondary)]">
                Studio tier: Free
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {quickStats.map((stat) => (
                <div key={stat.label} className="rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
                  <p className="text-xs text-[var(--text-tertiary)]">{stat.label}</p>
                  <p className="mt-1 text-[24px] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/generator">
                <Button type="button">Start Generating</Button>
              </Link>

              <Button type="button" variant="secondary">
                View Favorites
              </Button>

              <form action={logout}>
                <Button type="submit" variant="ghost">
                  Log out
                </Button>
              </form>
            </div>
          </article>

          <article className="rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-main)] p-6 shadow-[var(--shadow-md)]">
            <p className="text-xs font-medium text-[var(--text-tertiary)]">Creative focus</p>
            <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">Build your next concept set</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
              Start from style + placement + mood. Save only your strongest variations, then iterate with tighter prompt language.
            </p>
            <div className="mt-6 rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 text-sm text-[var(--text-secondary)]">
              Tip: Mention line weight and negative space to improve first-pass composition quality.
            </div>
          </article>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-main)] p-6 shadow-[var(--shadow-md)]">
            <div className="flex items-center justify-between">
              <h3 className="text-[24px] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">Recent Concepts</h3>
              <Link
                href="/generator"
                className="text-sm font-medium text-[var(--accent)] transition-colors duration-150 hover:text-[var(--accent-hover)]"
              >
                Open Generator
              </Link>
            </div>

            <ul className="mt-4 space-y-3">
              {recentConcepts.map((concept) => (
                <li
                  key={concept.name}
                  className="flex items-center justify-between rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{concept.name}</p>
                    <p className="mt-1 text-xs text-[var(--text-secondary)]">{concept.style}</p>
                  </div>
                  <p className="text-xs text-[var(--text-tertiary)]">{concept.date}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-main)] p-6 shadow-[var(--shadow-md)]">
            <p className="text-xs font-medium text-[var(--text-tertiary)]">Favorites</p>
            <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">No favorites yet</h3>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">
              Save standout concepts from the generator to build a focused shortlist for your final tattoo direction.
            </p>

            <div className="mt-6 rounded-[10px] border border-dashed border-[var(--border-strong)] bg-[var(--bg-surface)] p-8 text-center">
              <p className="text-sm text-[var(--text-secondary)]">Start your first design and favorite what feels right.</p>
              <Link href="/generator" className="mt-4 inline-block">
                <Button type="button">Generate First Concept</Button>
              </Link>
            </div>
          </article>
        </div>
      </section>
    </AppShell>
  );
}