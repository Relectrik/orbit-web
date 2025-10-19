"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function InterestForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = React.useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to submit");
      setStatus("success");
      setMessage("Surprise! Orbit isn't open for take-off just yet, but you're officially on the launch list 🚀");
      setName("");
      setEmail("");
      setPhone("");
    } catch (err: unknown) {
      const error = err as { message?: string } | Error;
      setStatus("error");
      setMessage((error as Error)?.message || (error as { message?: string })?.message || "Something went wrong");
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md glass rounded-2xl p-8">
      {status !== "success" && (
        <div className="space-y-4">
          <Input
            type="text"
            required
            autoComplete="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            required
            autoComplete="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="tel"
            required
            autoComplete="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button type="submit" disabled={status === "loading"} className="w-full">
            {status === "loading" ? "Sending…" : "Join"}
          </Button>
        </div>
      )}
      {status === "success" && (
        <div className="bg-white rounded-xl p-6 text-center">
          <p className="text-foreground text-lg font-medium">{message}</p>
        </div>
      )}
      {status === "error" && message && (
        <p className="mt-3 text-sm text-red-600">{message}</p>
      )}
      {status !== "success" && (
        <p className="mt-2 text-xs text-foreground/60">Limited beta: 50 early members only.</p>
      )}
    </form>
  );
}


