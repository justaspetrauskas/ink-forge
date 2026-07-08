import type { ReactElement } from "react";
import Link from "next/link";
import { SignupForm } from "@/components/ui/organisms/signup-form";

export default function SignupPage(): ReactElement {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-semibold">
        Sign up
      </h1>

      <SignupForm />

      <p className="mt-4 text-sm text-zinc-400">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4 hover:text-zinc-200">
          Log in
        </Link>
      </p>
    </main>
  );
}