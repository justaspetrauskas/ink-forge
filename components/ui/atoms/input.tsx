import type { InputHTMLAttributes, ReactElement } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps): ReactElement {
  return (
    <input
      {...props}
      className={[
        "h-11 w-full rounded-[10px] border border-[var(--border-medium)] bg-[var(--bg-main)] px-3 text-[16px] text-[var(--text-primary)]",
        "placeholder:text-[var(--text-tertiary)] transition-colors duration-150 ease-out",
        "focus:border-[var(--accent)] focus:outline-none focus:shadow-[var(--focus-ring)]",
        "aria-[invalid=true]:border-[var(--error)]",
        props.className ?? ""
      ]
        .join(" ")
        .trim()}
    />
  );
}
