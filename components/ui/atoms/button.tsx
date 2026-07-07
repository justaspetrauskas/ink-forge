import type { ButtonHTMLAttributes, ReactElement } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps): ReactElement {
  return (
    <button
      {...props}
      className={`w-full rounded-md bg-white px-4 py-2 text-black transition hover:bg-zinc-200 ${props.className ?? ""}`.trim()}
    />
  );
}
