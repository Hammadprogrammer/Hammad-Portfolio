# Your workplace has the answer. Just ask Dala for it. — Style Reference
> Particle cosmos on a void — violet pulse against infinite black

**Theme:** dark

Dala is a knowledge-management product rendered as a dark cosmic field: a pure black canvas, a single saturated violet as the only authority color, and white type that glows against the void. The interface recedes — sparse text blocks, hairline borders, pill controls — while a massive particle constellation dominates the visual real estate, its thousands of tiny geometric shapes (triangles, circles, diamonds) clustering into organic forms. Typography is stretched and ultra-tight at display sizes (negative tracking pushes letters almost together) but opens up at body sizes (slight positive tracking aids legibility on black). Components feel lightweight and fast: no shadows, no gradients, no card elevation — depth comes purely from color contrast and the negative space of the void.

## Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Void | `#000000` | `--color-void` | Page background, primary canvas |
| Bone | `#ffffff` | `--color-bone` | Primary text, icon strokes, hairlines, card borders, nav text |
| Ash | `#bdbdbd` | `--color-ash` | Secondary muted text, subtle border accents |
| Smoke | `#9a9a9a` | `--color-smoke` | Tertiary text, nav link resting state, low-emphasis dividers |
| Plum Voltage | `#8052ff` | `--color-plum-voltage` | Primary action background, nav accents — the only filled chromatic surface |
| Amber Spark | `#ffb829` | `--color-amber-spark` | Outlined action borders, linked labels. Never the primary CTA |
| Lichen | `#15846e` | `--color-lichen` | Decorative icon accent, constellation node color |

## Typography

**Acronym** (substitute: Inter / Söhne / Space Grotesk) — sole typeface.
- **Weights:** 200 (display), 400 (body), 600/700 (nav & buttons)
- **Tracking:** -0.04em at 78–113px; +0.021em at 12–15px; +0.025em at 15–18px; +0.05em uppercase kickers

### Type Scale (Tailwind utilities via `@theme`)

| Role | Utility | Size | Line Height | Tracking |
|------|---------|------|-------------|----------|
| caption | `text-caption` | 12px | 1.5 | 0.05em |
| body-sm | `text-body-sm` | 14px | 1.5 | 0.05em |
| body | `text-body` | 15px | 1.5 | 0.025em |
| subheading | `text-subheading` | 18px | 1.5 | 0.025em |
| heading-sm | `text-heading-sm` | 24px | 1.3 | 0.021em |
| heading | `text-heading` | 36px | 1.2 | 0.021em |
| heading-lg | `text-heading-lg` | 48px | 1.1 | -0.04em |
| display | `text-display` | 78px | 0.9 | -0.04em |
| hero | `text-hero` | 113px | 0.81 | -0.04em |

## Spacing & Layout

**Base unit:** 6px · **Density:** comfortable

| Token | Value | Utility |
|-------|-------|---------|
| `--container-page` | 1200px | `max-w-page` |
| `--spacing-section` | 60px | `gap-section`, `py-section` |
| `--spacing-card` | 24px | — |
| `--spacing-element` | 15px | `gap-element` |
| `--radius-pill` | 24px | `rounded-pill` |

## Do's and Don'ts

### Do
- Use Plum Voltage (`#8052ff`) as the only filled button background.
- Display headlines: weight 200, 78–113px, -0.04em tracking.
- 24px (`rounded-pill`) radius on every interactive surface.
- `#ffffff` + 0.05em tracking + uppercase for eyebrow/kicker text.
- Let the constellation own ≥50% of hero real estate.
- 60px section gaps; let the void breathe.

### Don't
- No shadows, glows, or elevation — depth comes from the void.
- No second filled chromatic button — one action color only.
- No font weight above 700 or below 200.
- No body type below 15px or with negative tracking.
- No radius smaller than 24px on interactive elements.
- No bright text on a colored background (Plum on Bone is forbidden — invert only).
- No gradients, textures, or noise on surfaces.

## Where this lives in the project

- **Tokens:** `app/globals.css` (`@theme { ... }`)
- **Font (Acronym → Inter):** `app/layout.tsx`
- **Particle constellation:** `app/components/ParticleField.tsx`
- **Landing page demo:** `app/page.tsx`

## Similar Brands
Linear · Anthropic · Midjourney · Replicate
