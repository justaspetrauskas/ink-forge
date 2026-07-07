import type { InputHTMLAttributes, ReactElement } from "react";

import { Input } from "@/components/ui/atoms/input";
import { Label } from "@/components/ui/atoms/label";

type FormFieldProps = {
  id: string;
  label: string;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
};

export function FormField({ id, label, inputProps }: FormFieldProps): ReactElement {
  return (
    <div className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...inputProps} />
    </div>
  );
}
