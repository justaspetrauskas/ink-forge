import type { ReactElement } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { LoginForm } from "@/components/ui/organisms/login-form"

export default async function LoginPage(): Promise<ReactElement> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect("/home")
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-semibold">
        Log in
      </h1>

      <LoginForm />

      <p className="mt-4 text-sm text-zinc-400">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="underline underline-offset-4 hover:text-zinc-200">
          Sign up
        </Link>
      </p>
    </main>
  )
}
