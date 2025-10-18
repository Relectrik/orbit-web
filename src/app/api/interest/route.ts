import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export const runtime = "nodejs"; // ensure Node runtime for firebase-admin

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const now = new Date();
    const key = email.toLowerCase();
    await db.collection("orbit_interest").doc(key).set(
      {
        email: key,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        source: "website",
      },
      { merge: true }
    );

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const err = e as { message?: string };
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}


