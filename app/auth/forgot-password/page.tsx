import type { ReactElement } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ForgotPasswordForm } from "@/components/ui/organisms/forgot-password-form"

export default async function ForgotPasswordPage(): Promise<ReactElement> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect("/home")
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-10 sm:px-6">
      <h1 className="mb-2 text-2xl font-semibold">
        Forgot password
      </h1>
      <p className="mb-6 text-sm text-zinc-400">
        Enter your email and we&apos;ll send you a reset link.
      </p>

      <ForgotPasswordForm />

      <p className="mt-4 text-sm text-zinc-400">
        Remembered it?{" "}
        <Link href="/auth/login" className="underline underline-offset-4 hover:text-zinc-200">
          Log in
        </Link>
      </p>
    </main>
  )
}
