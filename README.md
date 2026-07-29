# 2Stepz Fitness & Dance Studio — Website + Strategy Blueprint

**Client:** 2Stepz Fitness & Dance Studio, Gokulpeth, Nagpur, Maharashtra
**Deliverables:** (1) a research-first consulting report — the blueprint below — and (2) the production website built from it, at the root of this repo.

---

## The Website

A vibrant, mobile-first, single-page experience built with **Next.js 15 (App Router)** for deployment on **Vercel**. Hand-written vanilla CSS design system (no Tailwind, no animation libraries), Server Components throughout with client islands only where interaction lives (`Nav`, `Schedule`, `Fx`), self-hosted fonts via `next/font`, fully static prerender.

```bash
npm install
npm run dev      # local development
npm run build    # production build (static prerender)
```

Deploy: push to Vercel — zero config needed.

**Design system:** warm-white ground with blush/peach/lilac/mint section washes, raspberry→tangerine signature gradient, deep-plum ink, 8px spacing scale, curved section bands, floating gradient blobs, Fraunces + Manrope. **Experience:** kinetic hero, tilted gradient marquee, scroll-fill manifesto, colorful stat tiles, snap-scroll class/testimonial rails, warm founder band, rotating Power Garba disc, moments wall, day-tabbed schedule, membership tiers, animated FAQ, gradient finale, and a sticky WhatsApp/call/trial dock. All motion is transform/opacity-only and `prefers-reduced-motion` aware.

**Before launch, the owner must update** `lib/config.ts`:

- `CONTACT.WHATSAPP` / `CONTACT.PHONE` — while these contain placeholders, every chat CTA safely falls back to Instagram and call buttons are omitted.
- `SCHEDULE` — ships with representative timings that must be replaced with the studio's real weekly grid.

Also re-verify the public figures quoted on the page (4.6★, 88+ reviews) and swap the graphic portrait/moment cards for real photography when the shoot from the blueprint (§12) happens — the layouts are designed to accept it.

---

## The Research Blueprint

**Scope:** strategy grounded in publicly available research; anything that could not be independently verified is explicitly flagged.

---

## Executive Summary (TL;DR)

2Stepz is a **founder-led, women-centric dance-fitness studio** with a decade of operating history (est. 2015), a **4.6/5 public rating**, a charismatic and award-winning founder (Madhumita Gubre — Mrs Fit India 2022), and a class mix nobody else in Nagpur matches (Zumba, Power Garba, Bokwa, folk fitness, Pilates, TRX, yoga). Its single biggest digital weakness is simple: **it has no website**. Its entire online presence lives on Justdial, a ~1.6K-follower Instagram, and Facebook — none of which it owns or controls.

The recommended play is **not** a generic gym website. It is a **warm, energetic, boutique-premium, founder-forward site** built mobile-first (90 %+ of local traffic), engineered around three conversion actions — **WhatsApp, phone call, and trial-class booking** — and structured to dominate local search for "Zumba classes in Nagpur," "dance fitness Gokulpeth," and the women's-fitness intent cluster that competitors underserve.

Full reasoning, evidence, and the prioritized roadmap are in the report below.

---

## Report Contents

| # | Section | Covers |
|---|---------|--------|
| 01 | [Executive Summary](report/01-executive-summary.md) | Findings, thesis, headline recommendations |
| 02 | [Business Audit](report/02-business-audit.md) | Positioning, services, audience, strengths, weaknesses, USPs |
| 03 | [Google Business Profile Audit](report/03-google-business-audit.md) | Listing audit, review insights, gaps, action checklist |
| 04 | [Social Media Audit](report/04-social-media-audit.md) | Instagram, Facebook, YouTube — strengths, gaps, voice |
| 05 | [Competitor Analysis](report/05-competitor-analysis.md) | Global premium references + the Nagpur landscape + how to win |
| 06 | [SEO Strategy](report/06-seo-strategy.md) | Keyword map, local SEO, GBP optimization, content plan |
| 07 | [Website Strategy](report/07-website-strategy.md) | What the site should *feel* like, and why |
| 08 | [UX Strategy](report/08-ux-strategy.md) | The ideal customer journey, step by step |
| 09 | [Information Architecture](report/09-information-architecture.md) | Every page: purpose, audience, goal, sections, CTAs |
| 10 | [Content Strategy](report/10-content-strategy.md) | Page-by-page content recommendations |
| 11 | [Mobile-First Strategy](report/11-mobile-first-strategy.md) | Navigation, touch, performance, accessibility |
| 12 | [Visual Direction](report/12-visual-direction.md) | Palette, typography, photography, shape language |
| 13 | [Animation Strategy](report/13-animation-strategy.md) | Cinematic but performance-safe motion |
| 14 | [Conversion Strategy](report/14-conversion-strategy.md) | Sticky CTAs, WhatsApp, trust, urgency, lead gen |
| 15 | [Roadmap & Final Recommendations](report/15-roadmap.md) | Weaknesses, opportunities, prioritized build plan |

---

## Research Sources

Primary public sources used across this report:

- [Justdial listing — 2Stepz Fitness & Dance Studio, Gokulpeth](https://www.justdial.com/Nagpur/2Stepz-Fitness-Dance-Studio-Near-Times-Of-India-Gokulpeth/0712PX712-X712-160112122546-L2C3_BZDET)
- [Instagram — @2stepzfitness](https://www.instagram.com/2stepzfitness/) and [@madhumitagubre_2stepzfitness](https://www.instagram.com/madhumitagubre_2stepzfitness/)
- [Facebook — 2 STEPZ Fitness & Dance Studio](https://www.facebook.com/2stepzfitness/)
- [The Live Nagpur — 4th anniversary coverage](https://thelivenagpur.com/2019/08/13/2stepz-fitness-studio-completes-4-glorious-years-with-a-bash/) · [Power Garba masterclass](https://thelivenagpur.com/2019/06/16/power-garba-at-2-stepsz/) · [Mrs Fit India 2022](https://thelivenagpur.com/2022/06/20/madhumita-gubre-crowned-as-mrs-fit-india-2022/)
- [Nagpur Today — Mrs India Multimedia title](https://www.nagpurtoday.in/citys-madhumita-gubre-wins-mrs-india-multimedia-title/)
- [Youngbutterfly directory listing](https://youngbutterfly.in/class/2-stepz-fitness-dance-studio-fitness-with-madhumita-in-nagpur-2/)
- Competitor and market sources cited inline within each section.

**Verification note:** Google Maps, Instagram, and Justdial block automated page access. Figures such as ratings and follower counts come from search-index snapshots captured during research (July 2026) and should be re-verified by the owner before being quoted on the website.
