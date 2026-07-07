import type { LabelHTMLAttributes, ReactElement } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function Label(props: LabelProps): ReactElement {
  return <label {...props} className={`block text-sm font-medium ${props.className ?? ""}`.trim()} />;
}
