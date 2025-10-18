"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function InterestForm() {
  const [email, setEmail] = React.useState("");
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
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to submit");
      setStatus("success");
      setMessage("You're on the list. We’ll reach out soon.");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.message || "Something went wrong");
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md glass rounded-2xl p-4">
      <div className="flex items-center gap-2">
        <Input
          type="email"
          required
          autoComplete="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Join"}
        </Button>
      </div>
      {status !== "idle" && message && (
        <p className={`mt-3 text-sm ${status === "error" ? "text-red-300" : "text-lavender-light"}`}>{message}</p>
      )}
      <p className="mt-2 text-xs text-white/50">We respect your privacy. Unsubscribe anytime.</p>
    </form>
  );
}


