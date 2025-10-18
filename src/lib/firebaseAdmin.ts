import * as admin from "firebase-admin";

function decodeBase64(jsonB64?: string) {
  if (!jsonB64) return undefined;
  try {
    const json = Buffer.from(jsonB64, "base64").toString("utf8");
    return JSON.parse(json);
  } catch {
    return undefined;
  }
}

function getServiceAccount() {
  // Preferred: FIREBASE_SERVICE_ACCOUNT (JSON string) or FIREBASE_SERVICE_ACCOUNT_BASE64
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
  const serviceAccountFromB64 = decodeBase64(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64);

  const parsed = (() => {
    if (serviceAccountJson) {
      try {
        return JSON.parse(serviceAccountJson);
      } catch {
        // fall through to base64/individual vars
      }
    }
    if (serviceAccountFromB64) return serviceAccountFromB64;
    return undefined;
  })();

  if (parsed) {
    return {
      projectId: parsed.project_id,
      clientEmail: parsed.client_email,
      privateKey: parsed.private_key?.replace(/\\n/g, "\n"),
    } as const;
  }

  return {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  } as const;
}

if (!admin.apps.length) {
  const creds = getServiceAccount();
  const missing: string[] = [];
  if (!creds.projectId) missing.push("projectId");
  if (!creds.clientEmail) missing.push("clientEmail");
  if (!creds.privateKey) missing.push("privateKey");
  if (missing.length > 0) {
    throw new Error(
      `Missing Firebase Admin credentials (${missing.join(", ")}). Provide FIREBASE_SERVICE_ACCOUNT (JSON), FIREBASE_SERVICE_ACCOUNT_BASE64, or FIREBASE_PROJECT_ID/FIREBASE_CLIENT_EMAIL/FIREBASE_PRIVATE_KEY.`
    );
  }
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: creds.projectId!,
      clientEmail: creds.clientEmail!,
      privateKey: creds.privateKey!,
    }),
  });
}

export const db = admin.firestore();


