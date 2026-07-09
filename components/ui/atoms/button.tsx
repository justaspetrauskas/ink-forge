import type { ButtonHTMLAttributes, ReactElement } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] active:bg-[var(--accent-active)]",
  secondary:
    "border border-[var(--border-medium)] bg-[var(--bg-main)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)]",
  ghost: "bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-raised)]",
  destructive: "bg-[var(--error)] text-[var(--accent-foreground)] hover:brightness-95 active:brightness-90"
};

export function Button({ variant = "primary", className, ...props }: ButtonProps): ReactElement {
  return (
    <button
      {...props}
      className={[
        "inline-flex h-11 items-center justify-center gap-2 rounded-[10px] px-4 text-sm font-medium",
        "transition-colors duration-200 ease-out focus-visible:outline-none",
        variantClasses[variant],
        className ?? ""
      ]
        .join(" ")
        .trim()}
    />
  );
}
