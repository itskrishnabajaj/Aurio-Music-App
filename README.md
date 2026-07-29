# 2Stepz Fitness & Dance Studio — Website

A custom website for **2Stepz Fitness & Dance Studio**, Gokulpeth, Nagpur — built on Next.js 15 (App Router) and ready to deploy on Vercel.

```bash
npm install
npm run dev      # local development
npm run build    # production build (fully static prerender)
```

Deploy: push to Vercel — zero configuration required.

---

## Handover checklist

The site is complete and branded. Everything below is information the studio has not supplied yet; each one currently renders as a labelled placeholder in its final position, so nothing needs redesigning when the real content arrives.

Open **`lib/config.ts`** and fill in the `PENDING` block — the placeholders disappear automatically as each value is added.

| # | Needed from the studio | Where it appears |
|---|------------------------|------------------|
| 1 | WhatsApp number (digits, country code first) | Every "Book a trial" action, the dock, schedule enquiries |
| 2 | Phone number | Visit section, dock call button |
| 3 | Email address | Visit section |
| 4 | Business hours + weekly batch timings | Visit section, Schedule (add `time` to each entry in `SCHEDULE`) |
| 5 | Membership pricing for all three tiers | Membership cards |
| 6 | Founder portrait | Founder section |
| 7 | Studio photography — dance session, workout floor, reception, group class, celebration event | Gallery |
| 8 | Studio reel or walkthrough video | Gallery |
| 9 | Member photos for testimonials | Testimonial avatars |
| 10 | Google Maps embed URL | Visit section |
| 11 | YouTube channel | Footer |
| 12 | Parking information | Visit section |
| 13 | External booking/registration link, if one is used | Optional, `PENDING.BOOKING_URL` |

Already live and verified: studio name, address, founder story and awards, class formats, timeline milestones, 4.6★ / 88+ review count, Instagram, Facebook and Justdial links.

**Until a WhatsApp number is added**, every chat action safely falls back to Instagram DMs and call buttons are hidden, so no call to action can dead-end during a demo.

---

## Architecture

**Stylesheet** — `app/globals.css` is an entry point that imports `app/styles/` in cascade order:

| File | Holds |
|------|-------|
| `tokens.css` | Every colour, type size, line-height, space, radius, shadow and duration |
| `base.css` | Reset, document, a11y primitives, ambient light layer, `.band` rhythm |
| `components.css` | Buttons, nav, menu, carousel, dock, section heads |
| `sections.css` | Each section in narrative order |
| `placeholders.css` | Placeholder surfaces and the layouts that host them |
| `responsive.css` | Breakpoints and `prefers-reduced-motion` |

**Components** are React Server Components by default. Only four ship JavaScript: `Nav` (menu, focus trap, shrink), `Rail` (carousel physics), `Schedule` (day tabs), and `Fx` (scroll orchestration). First Load JS: **109 kB**.

**Design system.** Warm-white ground with blush/peach/lilac/mint washes, deep-plum ink, an 8px spacing scale, Fraunces + Manrope. Two gradients by design: `--grad` carries text and clears WCAG AA at both stops; `--grad-warm` keeps the pink→amber signature for decorative surfaces that never carry text.

**Experience.** Kinetic hero over a scroll-linked ambient layer; a physics carousel with momentum, damped-spring snap, rubber-band edges and an axis lock so it never swallows page scroll (and a native scroll-snap fallback without JavaScript); scroll-fill manifesto; animated counters; an illuminating vertical timeline; day-tabbed schedule; sticky WhatsApp/call/trial dock. All motion is transform/opacity only, GPU-composited, and honours `prefers-reduced-motion`.

---

## Internal

`docs/case-study/` holds the original discovery research the design was derived from. It is excluded from deployment and referenced nowhere in the site.
