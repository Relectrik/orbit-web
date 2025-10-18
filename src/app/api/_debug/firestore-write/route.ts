import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

export async function POST() {
  const ts = new Date().toISOString();
  try {
    const interestDocId = `debug-${ts}`;
    const chatSessionId = `debug-${ts}`;

    await db.collection("orbit_interest").doc(interestDocId).set({
      email: `debug-${ts}@orbit.test`,
      source: "debug",
      createdAt: ts,
    });

    await db.collection("orbit_chats").doc(chatSessionId).set({
      messages: [
        { role: "user", content: "Debug hello" },
        { role: "assistant", content: "Debug world" },
      ],
      updatedAt: ts,
    });

    return NextResponse.json({ ok: true, interestDocId, chatSessionId });
  } catch (e: unknown) {
    const err = e as { message?: string; code?: number | string };
    return NextResponse.json(
      { ok: false, error: err?.message || "unknown", code: err?.code },
      { status: 500 }
    );
  }
}


