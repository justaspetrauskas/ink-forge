import type { LabelHTMLAttributes, ReactElement } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function Label(props: LabelProps): ReactElement {
  return (
    <label
      {...props}
      className={`block text-xs font-medium tracking-[0.01em] text-[var(--text-secondary)] ${props.className ?? ""}`.trim()}
    />
  );
}
