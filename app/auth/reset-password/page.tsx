import type { ReactElement } from "react"
import { ResetPasswordForm } from "@/components/ui/organisms/reset-password-form"

export default function ResetPasswordPage(): ReactElement {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-10 sm:px-6">
      <h1 className="mb-2 text-2xl font-semibold">
        Set new password
      </h1>
      <p className="mb-6 text-sm text-zinc-400">
        Choose a strong password for your account.
      </p>

      <ResetPasswordForm />
    </main>
  )
}
