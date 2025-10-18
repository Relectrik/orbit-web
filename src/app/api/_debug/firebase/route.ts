import { NextResponse } from "next/server";
import * as admin from "firebase-admin";
import { db } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

export async function GET() {
  try {
    const app = admin.app();
    const projectId = (app?.options as any)?.projectId || process.env.FIREBASE_PROJECT_ID;
    const docRef = db.collection("__health__").doc("ping");
    const doc = await docRef.get();
    return NextResponse.json({ ok: true, projectId, exists: doc.exists });
  } catch (e: any) {
    return NextResponse.json(
      {
        ok: false,
        error: e?.message || "unknown",
        code: e?.code,
      },
      { status: 500 }
    );
  }
}


