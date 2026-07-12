"use client";

import type { ReactElement } from "react";
import { useActionState } from "react";
import { motion } from "framer-motion";
import { signup, type SignupState } from "@/app/auth/signup/actions";
import { Button } from "@/components/ui/atoms/button";
import { FormField } from "@/components/ui/molecules/form-field";

const initialState: SignupState = {};

const springIn = {
  type: "spring",
  stiffness: 320,
  damping: 28,
  mass: 0.7,
} as const;

export function SignupForm(): ReactElement {
  const [state, formAction, pending] = useActionState(
    signup,
    initialState
  );

  const feedbackMessage = state.error;

  return (
    <form
      action={formAction}
      className="space-y-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springIn, delay: 0.02 }}
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springIn, delay: 0.06 }}
      >
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springIn, delay: 0.1 }}
      >
        <FormField
          id="confirmPassword"
          label="Repeat password"
          inputProps={{
            name: "confirmPassword",
            type: "password",
            autoComplete: "new-password",
            required: true,
            minLength: 10,
            placeholder: "Repeat your password",
          }}
        />
      </motion.div>

      {feedbackMessage ? (
        <motion.p
          className="text-sm text-[var(--error)]"
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {feedbackMessage}
        </motion.p>
      ) : null}

      {state.success ? (
        <motion.p
          className="text-sm text-[var(--success)]"
          role="status"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          Account created successfully.
        </motion.p>
      ) : null}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springIn, delay: 0.14 }}
        whileHover={{ y: -1 }}
        whileTap={{ y: 0, scale: 0.995 }}
      >
        <Button
          type="submit"
          disabled={pending}
          className="w-full"
        >
          {pending ? "Creating account..." : "Create account"}
        </Button>
      </motion.div>
    </form>
  );
}