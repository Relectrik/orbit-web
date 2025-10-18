Orbit Website – Next.js
=======================

Separate marketing/onboarding website for Orbit (simulation-based connections). Built with Next.js App Router, Tailwind v4, and Firebase Admin for interest capture.

Getting Started
---------------

1. Install deps:

```bash
pnpm install
```

2. Configure environment variables. Create an `.env.local` with either a service account JSON or individual fields:

```bash
# JSON (preferred)
FIREBASE_SERVICE_ACCOUNT='{"project_id":"...","client_email":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"}'

# Or individual fields
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=service-account@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY='-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n'
```

3. Run the dev server:

```bash
pnpm dev
```

4. Open `http://localhost:3000`.

Features
--------

- Home page with email interest form (stored in Firestore collection `orbit_interest`).
- Chat page scaffold for previewing the chatbot UI (logic TBD).
- Shared UI components for consistent styling.

OpenRouter Setup
----------------

Add to `.env.local`:

```bash
OPENROUTER_API_KEY=sk-or-...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Orbit
```

API route: `POST /api/chat` with `{ sessionId, message }`. It stores conversation in Firestore collection `orbit_chats` and streams replies via OpenRouter request (non-streaming response currently).

Project Structure
-----------------

- `src/app/page.tsx`: Home with interest form
- `src/app/chat/page.tsx`: Chat UI placeholder
- `src/app/api/interest/route.ts`: API route to store emails
- `src/lib/firebaseAdmin.ts`: Admin SDK init
- `src/components/InterestForm.tsx`: Form UI
