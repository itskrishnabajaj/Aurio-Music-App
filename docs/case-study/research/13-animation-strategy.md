# 13 · Animation Strategy

Motion philosophy: **the site is about a place where people move — so the site itself should feel gently alive, never busy.** Animation serves storytelling and orientation; it must cost nothing in performance (§11 budgets are law) and must degrade gracefully.

## The motion system (small, consistent, cheap)

| Pattern | Use | Spec |
|---------|-----|------|
| **Fade-up reveal** | Default entrance for sections/cards as they scroll into view | 300–450 ms, 12–24 px translate, ease-out; stagger children 60–80 ms; fires once (no re-triggering on scroll-up) |
| **Hero motion** | The one cinematic moment: muted looping class video (or Ken-Burns pan on a photo for the data-saver fallback) + headline words rising in sequence | Video ≤ 1.5 MB, poster-first; headline stagger ≤ 600 ms total |
| **Count-up stats** | Trust strip (4.6★, years, formats) | 800 ms, once, starts on visibility |
| **Micro-feedback** | Buttons, cards, chips | ≤ 150 ms transform/opacity only |
| **Sticky-bar slide** | Bottom bar enters after hero, hides/reveals with scroll direction | 200 ms transform |
| **Marquee strip** (optional) | A slow, pausable ticker of format names or review words ("fun · energy · community…") as a section divider | CSS-only, pauses on interaction, `prefers-reduced-motion` disables |

## Cinematic moments (rationed to three)

Restraint is the premium tell: exactly **three** places may go beyond the default system —

1. **Home hero** — the video + type reveal described above. This is the "walk into the studio" moment.
2. **Founder section** — portrait slides in with a subtle parallax (≤ 10 % offset) while her titles stamp in one by one. Authority, dramatized slightly.
3. **Events/Gallery strip** — a horizontal photo band with momentum scroll (native `scroll-snap`, not a JS carousel), letting Garba-night energy breathe.

Everything else uses the default reveal. If a fourth "wow" moment is proposed, one of these three must be removed.

## Hard rules

1. **Transform + opacity only.** Never animate layout properties (width/height/top) — compositor-friendly or it doesn't ship.
2. **No scroll-jacking.** Native scroll speed and direction are sacred; parallax capped at subtle offsets.
3. **Nothing blocks content.** Text is readable before/without JS; animations are progressive enhancement (`IntersectionObserver` + CSS classes; no animation library heavier than ~3 KB, and CSS-only where possible).
4. **`prefers-reduced-motion: reduce`** collapses all entrances to simple fades ≤ 150 ms and freezes the hero video to its poster.
5. **First paint is never delayed** by animation setup; no entrance animation on above-the-fold critical text (the headline may stagger, but content is visible ≤ 600 ms).
6. **Once per session.** Reveals don't replay on every scroll pass — repeat motion converts delight into irritation.
7. **Test on the target device** (mid-range Android): if any interaction drops below ~60 fps, the animation is cut, not "optimized later."

## What we deliberately do NOT do

Preloaders/splash screens (fatal on 4G) · autoplaying sound · cursor effects · 3D/WebGL · Lottie mascots · animated background gradients · carousel auto-rotation for testimonials (users must control reading pace).

## Why this level of restraint

The emotional energy on this site comes from **photography and people**, not from interface acrobatics. Motion's job is to make the craft perceptible — the visitor should feel "this site is *nice*" without being able to say why. That feeling, attached to a local studio in a market of static directory listings, is itself a differentiator worth protecting from over-decoration.
