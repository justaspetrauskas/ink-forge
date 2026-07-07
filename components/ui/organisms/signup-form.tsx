import type { ReactElement } from "react";

import { Button } from "@/components/ui/atoms/button";
import { FormField } from "@/components/ui/molecules/form-field";

export function SignupForm(): ReactElement {
  return (
    <form action="/api/auth/signup" method="post" className="space-y-4">
      <FormField
        id="email"
        label="Email"
        inputProps={{
          name: "email",
          type: "email",
          autoComplete: "email",
          required: true,
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
        }}
      />

      <Button type="submit">Create account</Button>
    </form>
  );
}
