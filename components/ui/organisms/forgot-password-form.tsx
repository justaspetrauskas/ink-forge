"use client";

import type { ReactElement } from "react";
import { useActionState } from "react";
import { requestPasswordReset, type ForgotPasswordState } from "@/app/auth/forgot-password/actions";
import { Button } from "@/components/ui/atoms/button";
import { FormField } from "@/components/ui/molecules/form-field";

const initialState: ForgotPasswordState = {};

export function ForgotPasswordForm(): ReactElement {
  const [state, formAction, pending] = useActionState(requestPasswordReset, initialState);

  if (state.success) {
    return (
      <p className="text-sm text-zinc-300">
        If an account exists for that email, you&apos;ll receive a password reset link shortly.
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <FormField
        id="email"
        label="Email"
        inputProps={{
          name: "email",
          type: "email",
          autoComplete: "email",
          required: true,
          placeholder: "you@example.com",
        }}
      />

      {state.error ? (
        <p className="text-sm text-[var(--error)]" role="alert">
          {state.error}
        </p>
      ) : null}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Sending..." : "Send reset link"}
      </Button>
    </form>
  );
}
