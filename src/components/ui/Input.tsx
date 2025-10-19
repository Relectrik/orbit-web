"use client";

import * as React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full rounded-xl bg-foreground/5 border border-foreground/15 px-4 py-2 text-sm outline-none placeholder:text-foreground/50 focus:border-foreground ${className}`}
        {...rest}
      />
    );
  }
);
Input.displayName = "Input";


