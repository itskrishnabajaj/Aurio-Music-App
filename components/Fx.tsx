"use client";

import { useEffect } from "react";

/* Global scroll orchestration: entrance choreography, reveals, text fills,
   counters, the timeline spine, parallax floats, dock behaviour and magnetic
   buttons. Renders nothing — it decorates the server-rendered markup.
   Every scroll consumer shares one rAF-throttled listener per concern and
   only ever writes transform/opacity. */
export default function Fx() {
  useEffect(() => {
    const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const $$ = <T extends HTMLElement = HTMLElement>(sel: string) =>
      [...document.querySelectorAll<T>(sel)];
    const cleanups: (() => void)[] = [];
    const onScrollRaf = (fn: () => void) => {
      let ticking = false;
      const handler = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(() => {
            fn();
            ticking = false;
          });
        }
      };
      window.addEventListener("scroll", handler, { passive: true });
      window.addEventListener("resize", handler, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("scroll", handler);
        window.removeEventListener("resize", handler);
      });
      fn();
    };

    requestAnimationFrame(() => document.body.classList.add("is-loaded"));

    /* ---------- section reveals ---------- */
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    $$(".reveal").forEach((el, i) => {
      el.style.setProperty("--d", `calc(var(--stagger) * ${i % 4})`);
      revealObserver.observe(el);
    });
    cleanups.push(() => revealObserver.disconnect());

    /* ---------- manifesto scroll-fill ---------- */
    const fillLines = $$(".fill-line");
    if (fillLines.length && motionOK) {
      onScrollRaf(() => {
        const vh = window.innerHeight;
        fillLines.forEach((line) => {
          const r = line.getBoundingClientRect();
          const progress = Math.min(1, Math.max(0, (vh * 0.82 - r.top) / (vh * 0.55)));
          line.style.setProperty("--fill", `${(progress * 100).toFixed(1)}%`);
        });
      });
    }

    /* ---------- counters ---------- */
    const runCounter = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.count || "0");
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      const suffix = el.dataset.suffix || "";
      if (!motionOK) {
        el.textContent = target.toFixed(decimals) + suffix;
        return;
      }
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 900);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const statHost = document.querySelector("[data-stats]");
    if (statHost) {
      const statObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll<HTMLElement>("[data-count]").forEach(runCounter);
            statObserver.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      statObserver.observe(statHost);
      cleanups.push(() => statObserver.disconnect());
    }

    /* ---------- timeline: one handler drives spine fill + focus state ---------- */
    const spine = document.querySelector<HTMLElement>("[data-spine]");
    const milestones = $$("[data-milestone]");
    if (milestones.length) {
      const tlObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              tlObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
      );
      milestones.forEach((el, i) => {
        el.style.setProperty("--d", `calc(var(--stagger) * ${i % 3})`);
        tlObserver.observe(el);
      });
      cleanups.push(() => tlObserver.disconnect());

      const markers = milestones
        .map((m) => m.querySelector<HTMLElement>(".milestone__marker"))
        .filter((m): m is HTMLElement => m !== null);
      const centres = () => markers.map((m) => { const r = m.getBoundingClientRect(); return r.top + r.height / 2; });

      if (motionOK && spine && markers.length > 1) {
        /* the spine spans exactly first marker → last marker; only re-measured
           on layout change, never during scroll */
        const timeline = spine.parentElement as HTMLElement;
        const layoutSpine = () => {
          const origin = timeline.getBoundingClientRect().top;
          const c = centres();
          spine.style.top = `${c[0] - origin}px`;
          spine.style.height = `${c[c.length - 1] - c[0]}px`;
        };
        layoutSpine();
        const ro = new ResizeObserver(layoutSpine);
        ro.observe(timeline);
        cleanups.push(() => ro.disconnect());

        onScrollRaf(() => {
          const focus = window.innerHeight * 0.55;
          const c = centres();
          const span = c[c.length - 1] - c[0];
          const progress = span > 0 ? (focus - c[0]) / span : 0;
          spine.style.setProperty("--progress", Math.min(1, Math.max(0, progress)).toFixed(3));

          let activeIndex = -1;
          c.forEach((top, i) => {
            if (top <= focus) activeIndex = i;
          });
          if (activeIndex === -1 && c[0] < window.innerHeight) activeIndex = 0;
          milestones.forEach((m, i) => m.classList.toggle("is-active", i === activeIndex));
        });
      } else if (spine) {
        spine.style.setProperty("--progress", "1");
        milestones.forEach((m) => m.classList.add("is-active"));
      }
    }

    /* ---------- parallax floats ---------- */
    const floats = $$("[data-speed]");
    if (floats.length && motionOK) {
      onScrollRaf(() => {
        const vh = window.innerHeight;
        floats.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.bottom < -100 || r.top > vh + 100) return;
          const offset = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.speed || "0");
          el.style.transform = `translate3d(0, ${(-offset).toFixed(1)}px, 0)`;
        });
      });
    }

    /* ---------- dock ---------- */
    const dock = document.querySelector<HTMLElement>("[data-dock]");
    const hero = document.querySelector<HTMLElement>(".hero");
    const visit = document.querySelector<HTMLElement>("#visit");
    if (dock && hero) {
      dock.hidden = false;
      let dockArmed = false;
      let dockSuppressed = false;
      let lastY = window.scrollY;

      const heroObserver = new IntersectionObserver(
        ([entry]) => {
          dockArmed = !entry.isIntersecting;
          dock.classList.toggle("is-visible", dockArmed);
          const h = dockArmed ? dock.offsetHeight + 24 : 0;
          document.documentElement.style.setProperty("--dock-h", `${h}px`);
        },
        { rootMargin: "-30% 0px 0px 0px" }
      );
      heroObserver.observe(hero);
      cleanups.push(() => heroObserver.disconnect());

      if (visit) {
        const visitObserver = new IntersectionObserver(
          ([entry]) => {
            dockSuppressed = entry.isIntersecting;
            dock.classList.toggle("is-tucked", dockSuppressed);
          },
          { threshold: 0.25 }
        );
        visitObserver.observe(visit);
        cleanups.push(() => visitObserver.disconnect());
      }

      onScrollRaf(() => {
        const y = window.scrollY;
        const goingDown = y > lastY + 4;
        const goingUp = y < lastY - 4;
        if (dockArmed) {
          if (dockSuppressed || (goingDown && y > hero.offsetHeight * 1.6)) {
            dock.classList.add("is-tucked");
          } else if (goingUp) {
            dock.classList.remove("is-tucked");
          }
        }
        if (goingDown || goingUp) lastY = y;
      });
    }

    /* ---------- magnetic buttons ---------- */
    if (motionOK && window.matchMedia("(pointer: fine)").matches) {
      $$(".btn--grad, .btn--wa, .btn--white").forEach((btn) => {
        const move = (e: PointerEvent) => {
          const r = btn.getBoundingClientRect();
          const dx = (e.clientX - r.left - r.width / 2) * 0.14;
          const dy = (e.clientY - r.top - r.height / 2) * 0.22;
          btn.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
        };
        const leave = () => {
          btn.style.transform = "";
        };
        btn.addEventListener("pointermove", move);
        btn.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          btn.removeEventListener("pointermove", move);
          btn.removeEventListener("pointerleave", leave);
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
