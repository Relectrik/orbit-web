import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export const runtime = "nodejs"; // ensure Node runtime for firebase-admin

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone } = await req.json();
    
    // Validate required fields
    if (typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (typeof phone !== "string" || phone.trim().length === 0) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    const now = new Date();
    const key = email.toLowerCase();
    await db.collection("orbit_interest").doc(key).set(
      {
        name: name.trim(),
        email: key,
        phone: phone.trim(),
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


