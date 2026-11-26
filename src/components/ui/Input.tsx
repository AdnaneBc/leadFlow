"use client";
import type { ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
  id: string;
  text?: string;
};

export default function Input({ text, id, ...rest }: InputProps) {
  return (
    <div>
      {text && <label htmlFor={id}>{text}</label>}
      <input id={id} {...rest} />
    </div>
  );
}
