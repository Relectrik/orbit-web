"use client";

import * as React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full rounded-xl bg-black/20 border border-white/10 px-4 py-2 text-sm outline-none placeholder:text-white/40 focus:border-lavender ${className}`}
        {...rest}
      />
    );
  }
);
Input.displayName = "Input";


