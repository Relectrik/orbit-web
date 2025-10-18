import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

function sanitize(text: string): string {
  // remove emojis (basic range, not exhaustive) and markdown emphasis symbols
  const withoutEmojis = text.replace(/[\u{1F300}-\u{1FAFF}\u{1F900}-\u{1F9FF}\u{2600}-\u{27BF}]/gu, "");
  const withoutMarkdown = withoutEmojis.replace(/[\*\_\~\`]/g, "");
  const collapsed = withoutMarkdown.replace(/\s+/g, " ").trim();
  // keep it short-ish
  const truncated = collapsed.slice(0, 280);
  return truncated.toLowerCase();
}

async function extractNameFromConversation(
  allMessages: ChatMessage[],
  model: string,
  headers: Record<string, string>
): Promise<string> {
  const sys =
    "you extract the user's preferred name from this conversation. respond with only the name in lowercase (letters only). if unclear, respond exactly: unknown. no punctuation, no extra words.";
  const providerRes = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: sys },
        ...allMessages.slice(-12).map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: "what is the user's name?" },
      ],
    }),
  });
  if (!providerRes.ok) return "unknown";
  const json = await providerRes.json();
  const raw: string =
    json?.choices?.[0]?.message?.content?.[0]?.text || json?.choices?.[0]?.message?.content || "";
  const name = sanitize(raw).replace(/[^a-z]/g, "").trim();
  if (!name) return "unknown";
  return name;
}

function buildSystemPrompt(): string {
  return (
    "you are orbit's onboarding model. keep replies short, lowercase, and personal. mirror the user's energy, formality, and text length. " +
    "ask one focused question at a time to learn hobbies, interests, lifestyle, and deeper goals. " +
    "reflect lightly (<=1 short line), then ask the next question. avoid generic advice. no emojis, no markdown styling."
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
  } catch (e: unknown) {
    const err = e as { code?: number | string; message?: string };
    // Firestore not fully initialized or database missing returns NOT_FOUND (code 5)
    if (err?.code === 5) {
      return NextResponse.json({ messages: [] });
    }
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
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
    const rawReply: string =
      json?.choices?.[0]?.message?.content?.[0]?.text ||
      json?.choices?.[0]?.message?.content ||
      "";
    const reply = sanitize(rawReply);
    if (!reply) {
      return NextResponse.json({ error: "No reply from model" }, { status: 502 });
    }

    const nextMessages: ChatMessage[] = [...afterUser, { role: "assistant", content: reply }];

    // Attempt private name extraction if not already stored or still unknown
    let profileName: string | undefined;
    try {
      const existingDoc = await chatRef.get();
      const existingProfile = existingDoc.exists ? (existingDoc.data() as { profile?: { name?: string } })?.profile : undefined;
      const currentName = existingProfile?.name;
      if (!currentName || currentName === "unknown") {
        profileName = await extractNameFromConversation(nextMessages, model, headers);
      }
    } catch {}

    await chatRef.set(
      {
        messages: nextMessages,
        updatedAt: new Date().toISOString(),
        ...(profileName ? { profile: { name: profileName } } : {}),
      },
      { merge: true }
    );

    return NextResponse.json({ reply, messages: nextMessages });
  } catch (e: unknown) {
    try {
      // Append a graceful assistant error so history still reflects the attempt
      const url = new URL(req.url);
      const maybeBody = await req.json().catch(() => null) as { sessionId?: string } | null;
      const sessionId = maybeBody?.sessionId || url.searchParams.get("sessionId") || "";
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
    const err = e as { message?: string };
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}


