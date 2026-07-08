"use client";

import type { ReactElement } from "react";
import { useActionState } from "react";
import {signup, type SignupState } from "@/app/api/auth/signup/actions";
import { Button } from "@/components/ui/atoms/button";
import { FormField } from "@/components/ui/molecules/form-field";

const initialState: SignupState = {};

type SignupFormProps = {
  status?: "success" | "error";
  message?: string;
};

export function SignupForm({ status, message }: SignupFormProps): ReactElement {
  const [state, formAction, pending] = useActionState(
    signup,
    initialState
  );

  const feedbackMessage = state.error ?? (status ? message : undefined);
  const feedbackType = state.error ? "error" : status;

  return (
    <form
      action={formAction}
      className="space-y-4"
    >
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
          autoComplete: "new-password",
          required: true,
          minLength: 10,
          placeholder: "Create a password",
        }}
      />

      {feedbackMessage ? (
        <p
          className={`text-sm ${feedbackType === "success" ? "text-green-500" : "text-red-500"}`}
          role={feedbackType === "success" ? "status" : "alert"}
        >
          {feedbackMessage}
        </p>
      ) : null}

      {state.success ? (
        <p
          className="text-sm text-green-500"
          role="status"
        >
          Account created successfully.
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={pending}
        className="w-full"
      >
        {pending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}