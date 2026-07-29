# 11 · Mobile-First Strategy

Assumption (safe for Tier-2 India): **90 %+ of visits on smartphones**, mostly mid-range Android on 4G, often via Instagram/WhatsApp in-app browsers. Mobile is not a breakpoint; it is the design target. Desktop is the adaptation.

## Navigation
- Header: logo + hamburger + persistent **Book Trial** pill. The hamburger opens a full-screen sheet with the 5 primary items in large type + contact icons at the bottom.
- **Sticky bottom action bar** (thumb zone): WhatsApp · Call · Book Trial. Appears after the visitor scrolls past the hero (the hero has its own CTA; doubling is noise), hides on downward scroll of long reads, reappears on scroll-up. Never overlaps form fields (respect keyboard insets and `safe-area-inset-bottom`).
- Breadcrumbs on class pages ("Classes → Zumba") for orientation from deep SEO entries.

## Scrolling & layout
- Single-column, generous spacing; sections sized so one idea ≈ one viewport.
- No horizontal carousels for critical content (schedule, pricing) — vertical stacking or swipe with visible affordance for galleries only.
- Schedule: day-tabs (Mon–Sun) rather than a pinch-zoom grid; today pre-selected; each row a tappable card ending in "Book this batch."
- Section anchors + a subtle "back to top" after 3 viewports.

## Touch & interaction
- All targets ≥ 44×44 px; primary CTAs full-width with 16 px+ vertical padding.
- `tel:` and WhatsApp deep links (`wa.me/<number>?text=<pre-filled>`) — verified to work inside Instagram's in-app browser (a real failure mode; test explicitly).
- Tap feedback on every interactive element (state change ≤ 100 ms).
- No hover-dependent anything.

## Forms
- Trial form: 3 fields max (name, phone, preferred batch as chips — not a dropdown). `inputmode="tel"` for phone; no OTP, no email required, no captcha (use honeypot + rate-limit instead).
- Auto-advance and inline validation; errors in words, not colors alone.
- Success state sells the next step: "Done! We'll WhatsApp you within the hour 💬" + fallback call button.

## Performance budget (hard limits, because a slow site kills SEO *and* trust)
- LCP < 2.5 s on a mid-range Android over fast 4G (test on a real device, not just Lighthouse desktop).
- Initial payload: ≤ 200 KB JS (compressed) — this site needs almost no JavaScript; total above-the-fold weight < 1 MB including hero media.
- Hero video: ≤ 1.5 MB, muted, `playsinline`, poster image, `prefers-reduced-data`/save-data fallback to a static photo.
- Images: AVIF/WebP with srcset; lazy-load everything below the fold; explicit width/height (zero CLS).
- Fonts: max 2 families / 4 weights, `font-display: swap`, subset if using a display face.
- Third-party scripts: analytics only. Instagram feed via server-side fetch or static snapshot — never the official embed script (it's a performance bomb).

## Readability
- Base font ≥ 16 px (body 17–18 px works well for this audience); line length 60–70 chars; contrast ≥ 4.5:1 everywhere, including text over photos (use scrims).
- Short paragraphs (2–3 lines mobile), meaningful subheads — pages must be skimmable in the 8 seconds between WhatsApp messages.

## Accessibility (non-negotiables)
- Semantic landmarks/headings; alt text on all real photos (doubles as image SEO).
- Focus states visible; forms labeled; sticky bar reachable by keyboard/screen reader.
- `prefers-reduced-motion` honored globally (see §13).
- Color never the sole carrier of meaning (schedule format tags get labels, not just hues).
- Hindi/Marathi speakers: keep English simple; consider a Marathi FAQ variant later (validate demand via WhatsApp questions first).

## In-app browser & share hygiene
- Test in Instagram, Facebook, and WhatsApp in-app browsers (majority of social referrals).
- Open Graph + Twitter cards for every page: when Priya forwards the schedule page to a friend, the preview must show the studio, not a blank card.
- QR codes (reception poster → /trial) get UTM tags.
