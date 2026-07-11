"use client";

import type { ReactElement } from "react";
import { useActionState } from "react";
import Link from "next/link";
import { login, type LoginState } from "@/app/api/auth/login/actions";
import { Button } from "@/components/ui/atoms/button";
import { Input } from "@/components/ui/atoms/input";
import { Label } from "@/components/ui/atoms/label";
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

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            href="/forgot-password"
            className="text-xs text-zinc-400 underline underline-offset-4 hover:text-zinc-200"
          >
            Forgot password?
          </Link>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="Enter your password"
        />
      </div>

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