"use client";

import type { ReactElement } from "react";
import { useActionState } from "react";
import Link from "next/link";
import {
  login,
  loginWithGoogle,
  type LoginState,
} from "@/app/api/auth/login/actions";
import { Button } from "@/components/ui/atoms/button";
import { Input } from "@/components/ui/atoms/input";
import { Label } from "@/components/ui/atoms/label";
import { FormField } from "@/components/ui/molecules/form-field";

const initialState: LoginState = {};

export function LoginForm(): ReactElement {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <>
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

        <div className="flex items-center gap-2 py-1 text-xs text-zinc-500">
          <span className="h-px flex-1 bg-[var(--border-medium)]" />
          <span>OR</span>
          <span className="h-px flex-1 bg-[var(--border-medium)]" />
        </div>
      </form>

      <form action={loginWithGoogle} className="mt-3">
        <input type="hidden" name="next" value="/home" />
        <Button type="submit" variant="secondary" className="w-full">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
          >
            <path
              d="M21.805 10.023h-9.62v3.955h5.516c-.238 1.272-.954 2.35-2.029 3.071v2.552h3.282c1.919-1.767 3.026-4.37 3.026-7.44 0-.72-.065-1.412-.175-2.138z"
              fill="#4285F4"
            />
            <path
              d="M12.185 22c2.745 0 5.05-.902 6.734-2.399l-3.282-2.552c-.912.612-2.076.98-3.452.98-2.65 0-4.892-1.79-5.694-4.202H3.108v2.633A10.171 10.171 0 0012.185 22z"
              fill="#34A853"
            />
            <path
              d="M6.491 13.827a6.12 6.12 0 010-3.905V7.289H3.108a10.171 10.171 0 000 9.171l3.383-2.633z"
              fill="#FBBC05"
            />
            <path
              d="M12.185 5.971c1.492 0 2.83.514 3.886 1.524l2.913-2.913C17.23 2.951 14.93 2 12.185 2A10.171 10.171 0 003.108 7.289l3.383 2.633c.802-2.412 3.044-4.202 5.694-4.202z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </Button>
      </form>
    </>
  );
}