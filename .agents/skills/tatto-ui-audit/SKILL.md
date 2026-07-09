---
name: tatto-ui-audit
description: Ultra-compact pre-commit UI audit for Tatto. Use before finalizing any frontend change.
metadata:
  author: local
  version: "1.0.0"
---

# Tatto UI Audit (Tiny)

Run this checklist before shipping any UI change.
If any item fails, fix it first.

## 10-Point Gate

1. Artwork is the visual priority.
2. Accent token is only used for primary action, highlight, or error.
3. Layout uses calm whitespace (8px scale only).
4. Type uses approved scale and weights.
5. Surfaces/borders/shadows match system tokens.
6. Inputs/buttons/cards match Tatto component specs.
7. Motion is subtle (150/200/300ms, no bounce).
8. Hover/focus states are clear and consistent.
9. Desktop sidebar and mobile bottom nav remain coherent.
10. Empty/error states include a clear Generate CTA.

## Fast Output Format

Respond with only:
- PASS or FAIL
- failed item numbers
- one-line fix per failed item
