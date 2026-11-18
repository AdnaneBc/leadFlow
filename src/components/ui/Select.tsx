"use client";

import type { ComponentProps } from "react";

type SelectProps = ComponentProps<"select"> & {
  id: string;
  text?: string;
  options: string[];
};

export default function Select({ text, options, id, ...rest }: SelectProps) {
  return (
    <div>
      {text && <label htmlFor={id}>{text}</label>}
      <select id={id} {...rest}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
