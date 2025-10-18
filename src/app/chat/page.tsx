"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type Message = { id: string; role: "user" | "assistant"; content: string };

function getSessionId() {
  if (typeof window === "undefined") return "";
  const key = "orbit_chat_session";
  let id = window.localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(key, id);
  }
  return id;
}

export default function ChatPage() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const sessionIdRef = React.useRef<string>("");

  React.useEffect(() => {
    sessionIdRef.current = getSessionId();
    const loadHistory = async () => {
      const res = await fetch(`/api/chat?sessionId=${sessionIdRef.current}`);
      const data = await res.json();
      const msgs = (data?.messages || []).map((m: any, i: number) => ({ id: `h${i}`, role: m.role, content: m.content }));
      if (msgs.length === 0) {
        msgs.push({
          id: "intro",
          role: "assistant",
          content: "Hey, I'm Orbit's personality model. Share your interests and what you’re exploring—I'll tailor questions to learn your style.",
        });
      }
      setMessages(msgs);
    };
    loadHistory();
  }, []);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;
    setLoading(true);
    const optimistic: Message = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((prev) => [...prev, optimistic]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionIdRef.current, message: text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Chat error");
      const appended = data?.messages || [];
      setMessages(
        appended.map((m: any) => ({ id: crypto.randomUUID(), role: m.role, content: m.content }))
      );
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: "I hit an error reaching the model—try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl w-full">
      <h1 className="text-2xl font-semibold text-lavender mb-4">Chat</h1>
      <div className="h-[60vh] glass rounded-2xl p-4 overflow-y-auto space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
              m.role === "user" ? "ml-auto bg-lavender text-black" : "bg-black/30 border border-white/10"
            }`}
          >
            {m.content}
          </div>
        ))}
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


