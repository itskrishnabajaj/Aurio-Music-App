"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

/* Horizontal carousel built on native scroll-snap — momentum and inertia come
   from the platform, so touch stays at 60fps on mid-range Android. The snap
   positions honour `scroll-padding-inline` (set in CSS), which is what keeps
   the first slide locked to the page gutter instead of drifting under the
   scroller's padding. */
export default function Rail({ label, children, className }: Props) {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const slides = [...rail.children] as HTMLElement[];
    setCount(slides.length);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.55) {
            setActive(slides.indexOf(entry.target as HTMLElement));
          }
        });
      },
      { root: rail, threshold: [0.55, 0.9] }
    );
    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [children]);

  const goTo = useCallback((index: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const slide = rail.children[index] as HTMLElement | undefined;
    if (!slide) return;
    const gutter = parseFloat(getComputedStyle(rail).scrollPaddingLeft) || 0;
    rail.scrollTo({ left: slide.offsetLeft - gutter, behavior: "smooth" });
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(Math.min(active + 1, count - 1));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(Math.max(active - 1, 0));
    }
  };

  return (
    <div className={`rail-wrap${className ? ` ${className}` : ""}`}>
      <div
        className="rail"
        ref={railRef}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        onKeyDown={onKeyDown}
      >
        {children}
      </div>

      <div className="rail-nav">
        <div className="rail-dots" role="tablist" aria-label={`${label} — choose a slide`}>
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-current={i === active}
              aria-label={`Go to slide ${i + 1} of ${count}`}
              onClick={() => goTo(i)}
            >
              <i aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="rail-arrows">
          <button
            type="button"
            aria-label="Previous"
            disabled={active === 0}
            onClick={() => goTo(active - 1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m15 5-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next"
            disabled={active >= count - 1}
            onClick={() => goTo(active + 1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <p className="visually-hidden" aria-live="polite">
        Slide {active + 1} of {count}
      </p>
    </div>
  );
}
