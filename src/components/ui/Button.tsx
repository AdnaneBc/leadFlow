"use client";

import type { MouseEventHandler } from "react";

type VarianteTypes = "principal" | "secondaire" | "danger";
type ButtonType = "button" | "submit";

type ButtonProps = {
  variante?: VarianteTypes;
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: ButtonType;
};

export default function Button({
  variante = "principal",
  text,
  onClick,
  type,
}: ButtonProps) {
  return (
    <button type={type} className={variante} onClick={onClick}>
      {text}
    </button>
  );
}
