"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";

type Props = {
  label: string;
  children: React.ReactNode;
};

/* Physics-driven carousel.

   The track is moved with a transform and settled by a critically-damped
   spring, so a release always eases into a snap point instead of stopping
   dead or drifting. A flick is projected by pointer velocity; dragging past
   either end meets rubber-band resistance.

   Two details make it safe on a phone:
   - `touch-action: pan-y` on the viewport hands every vertical gesture back
     to the page, and a per-gesture axis lock ignores anything that starts
     out mostly vertical — the carousel can never swallow page scrolling.
   - Until hydration (and under reduced motion) the same markup renders as a
     native scroll-snap strip, so it is fully usable without JavaScript. */

const FRICTION = 0.94;      // momentum decay per frame
const STIFFNESS = 0.11;     // spring pull toward the snap point
const DAMPING = 0.78;       // velocity retained per frame while settling
const RUBBER = 0.35;        // resistance factor past the ends
const FLICK = 0.45;         // px/ms that counts as a deliberate flick
const AXIS_LOCK = 8;        // px of travel before we commit to an axis
const DRAG_SLOP = 6;        // px of travel that turns a tap into a drag

export default function Rail({ label, children }: Props) {
  const slides = Children.toArray(children);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  const [dragging, setDragging] = useState(false);

  const sim = useRef({
    x: 0,
    target: 0,
    v: 0,
    max: 0,
    points: [] as number[],
    raf: 0,
    running: false,
    pointer: -1,
    startX: 0,
    startY: 0,
    startPos: 0,
    axis: "" as "" | "x" | "y",
    moved: 0,
    samples: [] as { t: number; x: number }[],
  });

  /* measure snap points: each slide's offset minus the page gutter, so
     slide 1 lands exactly on the same margin as every other slide */
  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    const items = [...track.children] as HTMLElement[];
    const max = Math.max(0, track.scrollWidth - viewport.clientWidth);
    sim.current.max = max;
    sim.current.points = items.map((el) => Math.min(Math.max(el.offsetLeft - pad, 0), max));
  }, []);

  const apply = useCallback(() => {
    const track = trackRef.current;
    if (track) track.style.transform = `translate3d(${-sim.current.x}px, 0, 0)`;
  }, []);

  const nearest = useCallback((x: number) => {
    const { points } = sim.current;
    let best = 0;
    let dist = Infinity;
    points.forEach((p, i) => {
      const d = Math.abs(p - x);
      if (d < dist) {
        dist = d;
        best = i;
      }
    });
    return best;
  }, []);

  const run = useCallback(() => {
    const s = sim.current;
    if (s.running) return;
    s.running = true;

    const step = () => {
      if (s.pointer !== -1) {
        s.running = false;
        return;
      }
      const dx = s.target - s.x;
      s.v += dx * STIFFNESS;
      s.v *= DAMPING;
      s.x += s.v;

      if (Math.abs(dx) < 0.4 && Math.abs(s.v) < 0.4) {
        s.x = s.target;
        s.v = 0;
        apply();
        s.running = false;
        return;
      }
      apply();
      s.raf = requestAnimationFrame(step);
    };
    s.raf = requestAnimationFrame(step);
  }, [apply]);

  const goTo = useCallback(
    (index: number, instant = false) => {
      const s = sim.current;
      const i = Math.min(Math.max(index, 0), s.points.length - 1);
      s.target = s.points[i] ?? 0;
      setActive(i);
      if (instant) {
        s.x = s.target;
        s.v = 0;
        apply();
      } else {
        run();
      }
    },
    [apply, run]
  );

  /* ---------- enhance after hydration ---------- */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    measure();
    setEnhanced(true);
  }, [measure]);

  useEffect(() => {
    if (!enhanced) return;
    measure();
    apply();
    const viewport = viewportRef.current;
    if (!viewport) return;
    const ro = new ResizeObserver(() => {
      const s = sim.current;
      measure();
      const i = nearest(s.x);
      s.target = s.points[i] ?? 0;
      s.x = s.target;
      apply();
      setActive(i);
    });
    ro.observe(viewport);
    return () => ro.disconnect();
  }, [enhanced, measure, apply, nearest]);

  /* ---------- pointer physics ---------- */
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !enhanced) return;
    const s = sim.current;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      cancelAnimationFrame(s.raf);
      s.running = false;
      s.pointer = e.pointerId;
      s.startX = e.clientX;
      s.startY = e.clientY;
      s.startPos = s.x;
      s.axis = "";
      s.moved = 0;
      s.v = 0;
      s.samples = [{ t: performance.now(), x: e.clientX }];
    };

    const onMove = (e: PointerEvent) => {
      if (s.pointer !== e.pointerId) return;
      const dx = e.clientX - s.startX;
      const dy = e.clientY - s.startY;

      if (!s.axis) {
        if (Math.abs(dx) < AXIS_LOCK && Math.abs(dy) < AXIS_LOCK) return;
        /* vertical intent belongs to the page, not the carousel */
        s.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (s.axis === "y") {
          s.pointer = -1;
          return;
        }
        viewport.setPointerCapture(e.pointerId);
        setDragging(true);
      }
      if (s.axis !== "x") return;

      s.moved = Math.max(s.moved, Math.abs(dx));
      let next = s.startPos - dx;
      if (next < 0) next = next * RUBBER;
      else if (next > s.max) next = s.max + (next - s.max) * RUBBER;
      s.x = next;
      apply();

      const now = performance.now();
      s.samples.push({ t: now, x: e.clientX });
      while (s.samples.length > 2 && now - s.samples[0].t > 100) s.samples.shift();
    };

    const onUp = (e: PointerEvent) => {
      if (s.pointer !== e.pointerId) return;
      s.pointer = -1;
      if (viewport.hasPointerCapture(e.pointerId)) viewport.releasePointerCapture(e.pointerId);
      if (s.axis !== "x") return;
      setDragging(false);

      const first = s.samples[0];
      const last = s.samples[s.samples.length - 1];
      const dt = last && first ? last.t - first.t : 0;
      const velocity = dt > 0 ? (last.x - first.x) / dt : 0; // px/ms, positive = swiping right

      let index = nearest(s.x);
      if (Math.abs(velocity) > FLICK) {
        /* a deliberate flick advances exactly one slide, Wallet-style */
        const from = nearest(s.startPos);
        index = velocity < 0 ? from + 1 : from - 1;
      } else {
        /* carry a little of the throw into the spring so slow drags glide */
        const projected = s.x - velocity * 60;
        index = nearest(projected);
      }
      index = Math.min(Math.max(index, 0), s.points.length - 1);
      s.v = -velocity * FRICTION * 4;
      goTo(index);
    };

    const onCancel = () => {
      if (s.pointer === -1) return;
      s.pointer = -1;
      setDragging(false);
      if (s.axis === "x") goTo(nearest(s.x));
    };

    /* a drag must not fire the link underneath it */
    const onClick = (e: MouseEvent) => {
      if (s.moved > DRAG_SLOP) {
        e.preventDefault();
        e.stopPropagation();
        s.moved = 0;
      }
    };

    viewport.addEventListener("pointerdown", onDown);
    viewport.addEventListener("pointermove", onMove);
    viewport.addEventListener("pointerup", onUp);
    viewport.addEventListener("pointercancel", onCancel);
    viewport.addEventListener("click", onClick, true);
    return () => {
      viewport.removeEventListener("pointerdown", onDown);
      viewport.removeEventListener("pointermove", onMove);
      viewport.removeEventListener("pointerup", onUp);
      viewport.removeEventListener("pointercancel", onCancel);
      viewport.removeEventListener("click", onClick, true);
      cancelAnimationFrame(s.raf);
    };
  }, [enhanced, apply, nearest, goTo]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    if (!enhanced) {
      const viewport = viewportRef.current;
      const el = viewport?.querySelectorAll(".rail__slide")[
        e.key === "ArrowRight" ? active + 1 : Math.max(active - 1, 0)
      ] as HTMLElement | undefined;
      el?.scrollIntoView({ inline: "start", block: "nearest", behavior: "smooth" });
      return;
    }
    if (e.key === "ArrowRight") goTo(active + 1);
    else if (e.key === "ArrowLeft") goTo(active - 1);
    else if (e.key === "Home") goTo(0);
    else goTo(slides.length - 1);
  };

  /* native fallback keeps the dots in sync while unenhanced */
  const onScroll = () => {
    if (enhanced) return;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    const items = [...track.children] as HTMLElement[];
    const x = viewport.scrollLeft;
    let best = 0;
    let dist = Infinity;
    items.forEach((el, i) => {
      const d = Math.abs(el.offsetLeft - pad - x);
      if (d < dist) {
        dist = d;
        best = i;
      }
    });
    setActive(best);
  };

  const jump = (i: number) => {
    if (enhanced) return goTo(i);
    const track = trackRef.current;
    const el = track?.children[i] as HTMLElement | undefined;
    el?.scrollIntoView({ inline: "start", block: "nearest", behavior: "smooth" });
  };

  return (
    <div
      className={`rail ${enhanced ? "rail--physics" : "rail--native"}${dragging ? " is-dragging" : ""}`}
    >
      <div
        className="rail__viewport"
        ref={viewportRef}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        onKeyDown={onKeyDown}
        onScroll={onScroll}
      >
        <div className="rail__track" ref={trackRef}>
          {slides.map((slide, i) => (
            <div
              className={`rail__slide${i === active ? " is-active" : ""}`}
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className="rail__nav">
        <div className="rail__dots">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-current={i === active}
              aria-label={`Go to slide ${i + 1} of ${slides.length}`}
              onClick={() => jump(i)}
            >
              <i aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="rail__arrows">
          <button type="button" aria-label="Previous slide" disabled={active === 0} onClick={() => jump(active - 1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m15 5-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next slide"
            disabled={active >= slides.length - 1}
            onClick={() => jump(active + 1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <p className="visually-hidden" aria-live="polite">
        Slide {active + 1} of {slides.length}
      </p>
    </div>
  );
}
