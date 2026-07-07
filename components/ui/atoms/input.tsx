import type { InputHTMLAttributes, ReactElement } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps): ReactElement {
  return <input {...props} className={`w-full rounded-md border border-[var(--line)] bg-[var(--panel)] px-3 py-2 ${props.className ?? ""}`.trim()} />;
}
