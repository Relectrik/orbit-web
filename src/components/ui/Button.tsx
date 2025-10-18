"use client";

import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ variant = "primary", className = "", ...rest }: ButtonProps) {
  const variantClass =
    variant === "primary"
      ? "bg-white text-black hover:opacity-90"
      : variant === "secondary"
      ? "glass text-foreground hover:opacity-90"
      : "bg-transparent text-foreground hover:opacity-80";

  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantClass} ${className}`}
      {...rest}
    />
  );
}


