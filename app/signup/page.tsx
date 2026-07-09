import type { ReactElement } from "react";
import Link from "next/link";
import { SignupForm } from "@/components/ui/organisms/signup-form";

export default function SignupPage(): ReactElement {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-10 sm:px-6">
      <section className="rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-main)] p-6 shadow-[var(--shadow-md)] sm:p-8">
        <p className="text-xs font-medium text-[var(--text-tertiary)]">Tatto</p>
        <h1 className="mt-2 text-[32px] font-bold tracking-[-0.03em] text-[var(--text-primary)]">Sign up</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">Create your account to start generating tattoo concepts.</p>

        <div className="mt-6">
          <SignupForm />
        </div>

        <p className="mt-5 text-sm text-[var(--text-secondary)]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[var(--accent)] transition-colors duration-150 hover:text-[var(--accent-hover)]"
          >
            Log in
          </Link>
        </p>
      </section>
    </main>
  );
}