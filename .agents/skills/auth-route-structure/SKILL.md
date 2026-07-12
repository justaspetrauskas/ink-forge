---
name: auth-route-structure
description: Standard auth routing structure for this repo. Use for any new auth flow or when editing login/signup/password/auth callback behavior.
metadata:
  author: local
  version: "1.0.0"
---

# Auth Route Structure

Use this skill whenever you add or edit auth-related pages, server actions, or auth redirects.

## Goal

Keep auth features grouped under `app/auth` with route-local server actions.

## Canonical Structure

```text
app/
  auth/
    callback/
      route.ts
    login/
      page.tsx
      actions.ts
    signup/
      page.tsx
      actions.ts
    forgot-password/
      page.tsx
      actions.ts
    reset-password/
      page.tsx
      actions.ts
    logout/
      actions.ts
```

## Rules

1. Auth page routes must live under `app/auth/<route>/page.tsx`.
2. Server actions must be separate files in the same route folder as `actions.ts`.
3. Components should import actions from `@/app/auth/<route>/actions`.
4. All auth links and redirects must use `/auth/*` paths.
5. Keep callback handling in `app/auth/callback/route.ts`.
6. Keep middleware public auth routes aligned with `/auth/*` paths.
7. Keep legacy redirects in middleware for old paths:
   - `/login` -> `/auth/login`
   - `/signup` -> `/auth/signup`
   - `/forgot-password` -> `/auth/forgot-password`
   - `/reset-password` -> `/auth/reset-password`

## Implementation Checklist

1. Create `page.tsx` in `app/auth/<route>/`.
2. Create `actions.ts` in the same folder if server mutations are needed.
3. Update UI form imports to route-local action files.
4. Update middleware public route list if route should be accessible unauthenticated.
5. Update redirects and links to `/auth/<route>`.
6. Run `npm run build`.

## Examples

- Login form action import:
  - `@/app/auth/login/actions`
- Signup link from login page:
  - `/auth/signup`
- Redirect unauthenticated users:
  - `/auth/login`
