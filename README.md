# INNIT Tattoo AI MVP

Minimal production-ready MVP with Next.js App Router, TypeScript, Tailwind, OpenAI, Cloudinary, Zod, and Zustand.

## MVP Flow

1. Create tattoo idea
2. Generate structured AI prompt
3. Generate 4 tattoo images
4. Preview the result

## Project Structure

```text
app/
  (marketing)/
  dashboard/
  api/
components/
lib/
  ai/
  prompts/
  utils/
types/
hooks/
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Start dev server:

```bash
npm run dev
```

## Notes

- OpenAI requests only run server-side in `lib/ai`.
- If Cloudinary env vars are missing, generated image URLs are returned directly from OpenAI payloads.
- API routes validate input with Zod and return clean JSON.
- Database persistence has been removed while Supabase integration is pending.