---
name: tatto-design-system
description: Token-efficient UI guardrail for Tatto. Use for any new or edited frontend component/page/style. Enforces minimal, premium, tattoo-first design with strict accent-token discipline.
metadata:
  author: local
  version: "1.0.0"
---

# Tatto Design System (Compact)

Use this skill for every UI change in this repo.
Goal: premium creative tool feel, artwork-first, low-noise interfaces.

Before final output, run the tatto-ui-audit skill and only ship PASS.

## Core Rules

- Prioritize artwork over chrome.
- Keep layouts calm: whitespace first, minimal decoration.
- Use accent token only for key actions/highlights/error.
- Motion is subtle, smooth, purposeful.
- Prefer precise typography and spacing over visual effects.

## Tokens

### Color

- brand.primary: #0A0A0A
- brand.secondary: #DC2626
- accent: var(--brand-secondary)
- brand.tertiary: #FAFAFA
- bg.main: #FFFFFF
- bg.surface: #FAFAFA
- bg.raised: #F5F5F5
- text.primary: #0A0A0A
- text.secondary: #525252
- text.tertiary: #A3A3A3
- border.subtle: #F0F0F0
- border.medium: #E5E5E5
- border.strong: #D4D4D4
- semantic.success: #16A34A
- semantic.warning: #D97706
- semantic.error: #DC2626
- semantic.info: #2563EB

### Typography

- display/ui: Geist Sans, Inter, sans-serif
- mono: Geist Mono, monospace
- scale:
  - display 56/700
  - h1 40/700
  - h2 32/700
  - h3 24/600
  - body-lg 18/400
  - body 16/400
  - small 14/400
  - caption 12/500
  - mono 14/400

### Spacing / Radius / Elevation

- spacing (8px base): 4 8 12 16 24 32 48 64 96 128
- radius: sm 6, md 10, lg 16, xl 24, full 9999
- shadow.sm: 0 1px 2px rgb(0 0 0 / 0.05)
- shadow.md: 0 8px 24px rgb(0 0 0 / 0.08)
- shadow.lg: 0 20px 50px rgb(0 0 0 / 0.12)
- focus ring: tokenized (e.g., color-matched to accent)
- motion durations: 150ms, 200ms, 300ms

## Component Specs

### Buttons

- primary: bg accent, text accent-foreground, h 44, r 10, hover accent-hover, active accent-active
- secondary: bg #FFF, border #E5E5E5, text #0A0A0A, hover #FAFAFA
- ghost: transparent, no border, hover #F5F5F5
- destructive: semantic error tone (can match accent in specific themes)

### Cards

- bg #FFF, radius 16, border 1px #F0F0F0, shadow.md, padding 24

### Inputs

- h 44, radius 10, border #E5E5E5, bg #FFF
- focus: accent border + focus ring
- error: border #DC2626

### Tattoo Card (critical)

Must include:
- artwork
- style badge
- favorite action
- prompt preview
- generation date
- hover quick actions

Hover behavior:
- slight lift
- stronger shadow
- quick actions fade in

### Style Badges

- small rounded neutral chips
- selected: accent bg + accent-foreground text
- common values: Traditional, Fine Line, Japanese, Neo Traditional, Blackwork, Minimal, Geometric, Tribal, Watercolor

### Prompt Editor

- large multiline input
- character counter
- Improve Prompt action
- Generate action
- suggested prompts

## Navigation

- desktop: sidebar (logo, generate, gallery, favorites, history, account)
- mobile: bottom navigation

## Empty States

- clean icon/illustration + clear CTA to generate artwork

## Enforcement Checklist (run mentally before finalizing UI code)

1. Does artwork have clear visual priority?
2. Is accent token used only for priority actions/highlight/error?
3. Does spacing use the defined scale?
4. Are type sizes/weights from the scale?
5. Are radius, borders, shadows, and focus ring token-aligned?
6. Are interactions subtle (150-300ms, no bouncy motion)?
7. Is the screen calm (no clutter, no flashy gradients)?
8. Is desktop/mobile navigation pattern preserved?

If any answer is no, revise before shipping.
