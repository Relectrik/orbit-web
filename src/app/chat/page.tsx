"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type Message = { id: string; role: "user" | "assistant"; content: string };

function generateId(): string {
  // Use crypto.randomUUID if available, else a simple fallback
  try {
    if (typeof crypto !== "undefined" && typeof (crypto as any).randomUUID === "function") {
      return (crypto as any).randomUUID();
    }
  } catch {}
  return `id-${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;
}

function getSessionId() {
  if (typeof window === "undefined") return "";
  const key = "orbit_chat_session";
  let id = window.localStorage.getItem(key);
  if (!id) {
    id = generateId();
    window.localStorage.setItem(key, id);
  }
  return id;
}

export default function ChatPage() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const sessionIdRef = React.useRef<string>("");
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const endRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    sessionIdRef.current = getSessionId();
    const loadHistory = async () => {
      const res = await fetch(`/api/chat?sessionId=${sessionIdRef.current}`);
      const data: { messages?: Array<{ role: Message["role"]; content: string }> } = await res.json();
      const msgs = (data?.messages || []).map((m, i) => ({ id: `h${i}`, role: m.role, content: m.content }));
      if (msgs.length === 0) {
        msgs.push({
          id: "intro",
          role: "assistant",
          content: "hey hey! i’m orbit’s lil personality bot. tell me what you’re into + what you’ve been vibin’ with lately. i'd also love to hear your name!",
        });
      }
      setMessages(msgs);
    };
    loadHistory();
  }, []);

  React.useEffect(() => {
    // Auto-scroll to the bottom when messages change
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;
    setLoading(true);
    const optimistic: Message = { id: generateId(), role: "user", content: text };
    setMessages((prev) => [...prev, optimistic]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionIdRef.current, message: text }),
      });
      const data: { messages?: Array<{ role: Message["role"]; content: string }>; error?: string } = await res.json();
      if (!res.ok) throw new Error(data?.error || "Chat error");
      const appended = data?.messages || [];
      setMessages(appended.map((m) => ({ id: generateId(), role: m.role, content: m.content })));
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: generateId(), role: "assistant", content: "i hit an error reaching the model — try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl w-full">
      <h1 className="text-2xl font-semibold text-lavender mb-4">Chat</h1>
      <div
        ref={listRef}
        className="h-[60vh] max-h-[70dvh] glass rounded-2xl p-4 overflow-y-scroll overscroll-contain space-y-3"
        style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap break-words ${
              m.role === "user" ? "ml-auto bg-lavender text-black" : "bg-black/30 border border-white/10"
            }`}
          >
            {m.content}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <Input
          placeholder="Share a hobby, a weekend favorite, or an aspiration…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <Button onClick={sendMessage} disabled={loading}>{loading ? "Thinking…" : "Send"}</Button>
      </div>
      <p className="mt-2 text-xs text-white/50">Conversations are saved to your session in this browser.</p>
    </div>
  );
}


