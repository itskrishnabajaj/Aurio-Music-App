"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { FieldPlaceholder } from "@/components/Placeholder";
import { SCHEDULE, waLink, HAS_WHATSAPP } from "@/lib/config";

const DAYS = Object.keys(SCHEDULE);
const ext = !HAS_WHATSAPP ? { target: "_blank", rel: "noopener" } : {};

/* Today's weekday as an external store: the server snapshot is Monday (stable
   markup), the client snapshot is the real day. Reading it this way avoids
   both a hydration mismatch and a cascading render from correcting state in
   an effect. */
const subscribeDay = () => () => {};
const getDaySnapshot = () => DAYS[(new Date().getDay() + 6) % 7];
const getDayServerSnapshot = () => DAYS[0];

export default function Schedule() {
  const today = useSyncExternalStore(subscribeDay, getDaySnapshot, getDayServerSnapshot);
  const [picked, setPicked] = useState<string | null>(null);
  const day = picked ?? today;
  const tabsRef = useRef<HTMLDivElement>(null);

  const rows = SCHEDULE[day];
  const index = DAYS.indexOf(day);

  /* roving tabindex: one stop in the tab order, arrows move between days */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: DAYS.length - 1,
    };
    const next = map[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const target = DAYS[(next + DAYS.length) % DAYS.length];
    setPicked(target);
    requestAnimationFrame(() => {
      tabsRef.current
        ?.querySelector<HTMLButtonElement>(`[data-day="${target}"]`)
        ?.focus();
    });
  };

  return (
    <section className="schedule" id="schedule" aria-labelledby="schedule-title">
      <header className="section-head section-head--flush">
        <p className="section-head__eyebrow reveal">The week at 2Stepz</p>
        <h2 className="section-head__title reveal" id="schedule-title">
          Find your <em>batch.</em>
        </h2>
      </header>
      <div className="schedule__panel reveal">
        <div
          className="schedule__tabs"
          role="tablist"
          aria-label="Day of week"
          ref={tabsRef}
          onKeyDown={onKeyDown}
        >
          {DAYS.map((d) => (
            <button
              key={d}
              type="button"
              role="tab"
              id={`day-${d}`}
              data-day={d}
              aria-selected={d === day}
              aria-controls="day-panel"
              tabIndex={d === day ? 0 : -1}
              onClick={() => setPicked(d)}
            >
              {d}
            </button>
          ))}
        </div>
        <div
          className="schedule__list"
          id="day-panel"
          role="tabpanel"
          aria-labelledby={`day-${day}`}
          tabIndex={0}
        >
          {rows.length === 0 ? (
            <p className="schedule__empty">
              Sunday is rest day — the music comes back Monday morning.
            </p>
          ) : (
            rows.map((r, i) => (
              <div className="schedule__row" key={`${day}-${r.name}-${i}`}>
                <span className={`schedule__hue schedule__hue--${r.hue}`} aria-hidden="true"></span>
                <span className="schedule__time">
                  {r.time ?? <FieldPlaceholder label="Batch timing" icon="clock" />}
                </span>
                <span className="schedule__what">
                  <b>{r.name}</b>
                  <small>{r.note}</small>
                </span>
                <a
                  className="schedule__book"
                  href={waLink(`Hi! Is there space in the ${day} ${r.name} batch?`)}
                  aria-label={`Ask about the ${day} ${r.name} batch on WhatsApp`}
                  {...ext}
                >
                  Ask about this batch →
                </a>
              </div>
            ))
          )}
        </div>
      </div>
      <p className="schedule__note reveal">
        These are the formats that run each week. Exact batch timings will be published here once
        confirmed — until then,{" "}
        <a href={waLink("Hi! Can you share this week's batch timings?")} {...ext}>
          ask us on WhatsApp
        </a>
        .
      </p>
    </section>
  );
}
