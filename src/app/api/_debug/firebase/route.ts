import { NextResponse } from "next/server";
import * as admin from "firebase-admin";
import { db } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

export async function GET() {
  try {
    const app = admin.app();
    const appOptions = app?.options as { projectId?: string } | undefined;
    const projectId = appOptions?.projectId || process.env.FIREBASE_PROJECT_ID;
    const docRef = db.collection("__health__").doc("ping");
    const doc = await docRef.get();
    return NextResponse.json({ ok: true, projectId, exists: doc.exists });
  } catch (e: unknown) {
    const err = e as { message?: string; code?: number | string };
    return NextResponse.json(
      {
        ok: false,
        error: err?.message || "unknown",
        code: err?.code,
      },
      { status: 500 }
    );
  }
}


