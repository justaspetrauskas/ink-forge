"use client";

import type { ReactElement, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type AppShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

const navItems = [
  { href: "/generator", label: "Generate" },
  { href: "/home", label: "Gallery" },
  { href: "/home", label: "Favorites" },
  { href: "/home", label: "History" },
  { href: "/home", label: "Account" }
];

export function AppShell({ title, subtitle, children }: AppShellProps): ReactElement {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex min-h-screen max-w-[1400px] bg-transparent md:px-6">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-[var(--border-subtle)] bg-[var(--surface-overlay)] px-4 py-8 backdrop-blur md:flex">
        <div className="mb-10 px-3">
          <p className="font-semibold tracking-[-0.02em] text-[var(--text-primary)]">Tatto</p>
          <p className="mt-1 text-xs text-[var(--text-tertiary)]">AI Creative Studio</p>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={[
                  "rounded-[10px] px-3 py-2 text-sm transition-colors duration-150",
                  active
                    ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col pb-24 md:pb-0">
        <header className="border-b border-[var(--border-subtle)] bg-[var(--surface-overlay)] px-4 py-6 backdrop-blur sm:px-8">
          <h1 className="text-[32px] font-bold leading-tight tracking-[-0.03em] text-[var(--text-primary)]">{title}</h1>
          {subtitle ? <p className="mt-2 text-sm text-[var(--text-secondary)]">{subtitle}</p> : null}
        </header>

        <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--border-subtle)] bg-[var(--surface-overlay-strong)] px-2 py-2 backdrop-blur md:hidden">
        <ul className="mx-auto grid max-w-md grid-cols-5 gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={[
                    "block rounded-[10px] px-2 py-2 text-center text-[12px] font-medium transition-colors duration-150",
                    active
                      ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]"
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
