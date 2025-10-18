import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

function buildSystemPrompt(): string {
  return (
    "You are Orbit's onboarding personality model. Your job is to quickly understand the user's interests, hobbies, preferences, and deeper aspirations. " +
    "Ask concise, empathetic, and varied questions. Reflect briefly on what they've said, then move forward. Avoid generic advice; focus on high-signal discovery. " +
    "Prefer one focused question per response. Maintain a premium, warm tone."
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  if (!sessionId) {
    return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
  }
  try {
    const doc = await db.collection("orbit_chats").doc(sessionId).get();
    const data = doc.exists ? doc.data() : { messages: [] };
    return NextResponse.json({ messages: data?.messages || [] });
  } catch (e: any) {
    // Firestore not fully initialized or database missing returns NOT_FOUND (code 5)
    if (e?.code === 5) {
      return NextResponse.json({ messages: [] });
    }
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const sessionId: string | undefined = body?.sessionId;
    const userText: string | undefined = body?.message;
    const model: string = body?.model || "google/gemma-3-27b-it:free";
    if (!sessionId || !userText) {
      return NextResponse.json({ error: "Missing sessionId or message" }, { status: 400 });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json({ error: "OPENROUTER_API_KEY is not set" }, { status: 500 });
    }

    const chatRef = db.collection("orbit_chats").doc(sessionId);
    const snapshot = await chatRef.get();
    const existing: ChatMessage[] = (snapshot.exists ? snapshot.data()?.messages : []) || [];

    const systemPrompt = buildSystemPrompt();
    const messagesForProvider = [
      { role: "system", content: systemPrompt },
      ...existing.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: userText },
    ];

    // Persist user message immediately so Firestore always reflects activity
    const afterUser: ChatMessage[] = [...existing, { role: "user", content: userText }];
    await chatRef.set(
      {
        messages: afterUser,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    const headers: Record<string, string> = {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    };
    if (process.env.NEXT_PUBLIC_SITE_URL) headers["HTTP-Referer"] = process.env.NEXT_PUBLIC_SITE_URL;
    if (process.env.NEXT_PUBLIC_SITE_NAME) headers["X-Title"] = process.env.NEXT_PUBLIC_SITE_NAME;

    const providerRes = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model,
        messages: messagesForProvider.map((m) => ({ role: m.role, content: m.content })),
      }),
    });

    if (!providerRes.ok) {
      const text = await providerRes.text();
      return NextResponse.json({ error: `OpenRouter error: ${text}` }, { status: 502 });
    }

    const json = await providerRes.json();
    const reply: string =
      json?.choices?.[0]?.message?.content?.[0]?.text ||
      json?.choices?.[0]?.message?.content ||
      "";
    if (!reply) {
      return NextResponse.json({ error: "No reply from model" }, { status: 502 });
    }

    const nextMessages: ChatMessage[] = [...afterUser, { role: "assistant", content: reply }];

    await chatRef.set(
      {
        messages: nextMessages,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    return NextResponse.json({ reply, messages: nextMessages });
  } catch (e: any) {
    try {
      // Append a graceful assistant error so history still reflects the attempt
      const url = new URL(req.url);
      const sessionId = (await req.json().catch(() => null))?.sessionId || url.searchParams.get("sessionId") || "";
      if (sessionId) {
        const chatRef = db.collection("orbit_chats").doc(sessionId);
        const snap = await chatRef.get();
        const existing: ChatMessage[] = (snap.exists ? snap.data()?.messages : []) || [];
        const nextMessages: ChatMessage[] = [
          ...existing,
          { role: "assistant", content: "I hit an error reaching the model—please try again shortly." },
        ];
        await chatRef.set(
          { messages: nextMessages, updatedAt: new Date().toISOString() },
          { merge: true }
        );
      }
    } catch {}
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}


