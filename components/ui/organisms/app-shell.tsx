"use client";

import type { ReactElement, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Wand2, Compass, Bookmark, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItemConfig = {
  href: string;
  label: string;
  Icon: LucideIcon;
};

const navItems: NavItemConfig[] = [
  { href: "/generate", label: "Generate", Icon: Wand2 },
  { href: "/home",      label: "Explore",  Icon: Compass  },
  { href: "/gallery",   label: "My Tattoos", Icon: Bookmark },
];

type SidebarNavItemProps = {
  href: string;
  label: string;
  Icon: LucideIcon;
  active: boolean;
};

function SidebarNavItem({ href, label, Icon, active }: SidebarNavItemProps): ReactElement {
  return (
    <Link
      href={href}
      aria-label={label}
      className={[
        "flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium transition-colors duration-150",
        active
          ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
          : "text-[var(--text-secondary)] hover:bg-[var(--bg-raised)] hover:text-[var(--text-primary)]",
      ].join(" ")}
    >
      <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
      {label}
    </Link>
  );
}

export type AppShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function AppShell({ title, subtitle, children }: AppShellProps): ReactElement {
  const pathname = usePathname();

  const mobileNavItems: NavItemConfig[] = [
    ...navItems,
    { href: "/profile", label: "Profile", Icon: User },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-main)]">
      {/* ── Left Sidebar ── */}
      <aside className="hidden md:flex w-52 shrink-0 flex-col border-r border-[var(--border-subtle)] px-3 py-6">
        {/* Brand mark */}
        <Link
          href="/generate"
          aria-label="Tatto AI — home"
          className="mb-6 flex items-center gap-2 px-3 transition-opacity hover:opacity-60"
        >
          <span className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--text-primary)]">Tatto</span>
          <span className="rounded bg-[var(--accent)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[var(--accent-foreground)]">AI</span>
        </Link>

        {/* Primary navigation */}
        <nav className="flex flex-col gap-2" aria-label="Main navigation">
          {navItems.map(({ href, label, Icon }) => (
            <SidebarNavItem
              key={href}
              href={href}
              label={label}
              Icon={Icon}
              active={pathname === href}
            />
          ))}
        </nav>

        {/* Profile — pinned to bottom */}
        <div className="mt-auto flex flex-col gap-1">
          <div className="mb-2 h-px bg-[var(--border-subtle)]" />
          <SidebarNavItem
            href="/profile"
            label="Profile"
            Icon={User}
            active={pathname === "/profile"}
          />
        </div>
      </aside>

      {/* ── Main column ── */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Thin top header */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[var(--border-subtle)] px-6">
          <h1 className="text-sm font-semibold tracking-[-0.01em] text-[var(--text-primary)]">
            {title}
          </h1>
          {subtitle ? (
            <span className="text-xs text-[var(--text-tertiary)]">{subtitle}</span>
          ) : null}
        </header>

        {/* Scrollable workspace */}
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">{children}</main>
      </div>

      {/* ── Mobile bottom navigation ── */}
      <nav
        className="fixed inset-x-0 bottom-0 z-50 flex h-16 items-center border-t border-[var(--border-subtle)] bg-[var(--surface-overlay-strong)] px-2 backdrop-blur md:hidden"
        aria-label="Mobile navigation"
      >
        <ul className="mx-auto grid w-full max-w-sm grid-cols-4">
          {mobileNavItems.map(({ href, label, Icon }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-label={label}
                  className={[
                    "flex flex-col items-center gap-1 py-2 text-[10px] font-medium transition-colors duration-150",
                    active
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]",
                  ].join(" ")}
                >
                  <Icon size={20} strokeWidth={1.5} aria-hidden="true" />\n                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
