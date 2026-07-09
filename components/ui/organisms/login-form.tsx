"use client";

import type { ReactElement } from "react";
import { useActionState } from "react";
import { login, type LoginState } from "@/app/api/auth/login/actions";
import { Button } from "@/components/ui/atoms/button";
import { FormField } from "@/components/ui/molecules/form-field";

const initialState: LoginState = {};

export function LoginForm(): ReactElement {
  const [state, formAction, pending] = useActionState(login, initialState);

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

      <FormField
        id="password"
        label="Password"
        inputProps={{
          name: "password",
          type: "password",
          autoComplete: "current-password",
          required: true,
          placeholder: "Enter your password",
        }}
      />

      {state.error ? (
        <p className="text-sm text-[var(--error)]" role="alert">
          {state.error}
        </p>
      ) : null}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}