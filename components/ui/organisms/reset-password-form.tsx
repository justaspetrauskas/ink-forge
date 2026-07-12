"use client";

import type { ReactElement } from "react";
import { useActionState } from "react";
import { resetPassword, type ResetPasswordState } from "@/app/auth/reset-password/actions";
import { Button } from "@/components/ui/atoms/button";
import { FormField } from "@/components/ui/molecules/form-field";

const initialState: ResetPasswordState = {};

export function ResetPasswordForm(): ReactElement {
  const [state, formAction, pending] = useActionState(resetPassword, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <FormField
        id="password"
        label="New password"
        inputProps={{
          name: "password",
          type: "password",
          autoComplete: "new-password",
          required: true,
          placeholder: "At least 8 characters",
          minLength: 8,
        }}
      />

      <FormField
        id="confirm"
        label="Confirm password"
        inputProps={{
          name: "confirm",
          type: "password",
          autoComplete: "new-password",
          required: true,
          placeholder: "Repeat your password",
        }}
      />

      {state.error ? (
        <p className="text-sm text-[var(--error)]" role="alert">
          {state.error}
        </p>
      ) : null}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Saving..." : "Set new password"}
      </Button>
    </form>
  );
}
