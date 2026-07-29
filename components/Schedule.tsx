"use client";

import { useEffect, useState } from "react";
import { SCHEDULE, waLink, HAS_WHATSAPP } from "@/lib/config";

const DAYS = Object.keys(SCHEDULE);
const ext = !HAS_WHATSAPP ? { target: "_blank", rel: "noopener" } : {};

export default function Schedule() {
  const [day, setDay] = useState(DAYS[0]);

  useEffect(() => {
    setDay(DAYS[(new Date().getDay() + 6) % 7]);
  }, []);

  const rows = SCHEDULE[day];

  return (
    <section className="schedule" id="schedule" aria-labelledby="schedule-title">
      <header className="section-head section-head--flush">
        <p className="section-head__eyebrow reveal">The week at 2Stepz</p>
        <h2 className="section-head__title reveal" id="schedule-title">
          Find your <em>batch.</em>
        </h2>
      </header>
      <div className="schedule__panel reveal">
        <div className="schedule__tabs" role="tablist" aria-label="Day of week">
          {DAYS.map((d) => (
            <button
              key={d}
              type="button"
              role="tab"
              aria-selected={d === day}
              onClick={() => setDay(d)}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="schedule__list" aria-live="polite">
          {rows.length === 0 ? (
            <p className="schedule__empty">
              Sunday is rest day — the music comes back Monday morning.
            </p>
          ) : (
            rows.map((r) => (
              <div className="schedule__row" key={`${day}-${r.time}-${r.name}`}>
                <span className={`schedule__hue schedule__hue--${r.hue}`} aria-hidden="true"></span>
                <span className="schedule__time">{r.time}</span>
                <span className="schedule__what">
                  <b>{r.name}</b>
                  <small>{r.note}</small>
                </span>
                <a
                  className="schedule__book"
                  href={waLink(`Hi! Is there space in the ${day} ${r.time} ${r.name} batch?`)}
                  {...ext}
                >
                  Book this batch →
                </a>
              </div>
            ))
          )}
        </div>
      </div>
      <p className="schedule__note reveal">
        Batch timings can shift with the season — confirm today’s slots on{" "}
        <a href={waLink("Hi! Can you confirm today's batch timings?")} {...ext}>
          WhatsApp
        </a>
        .
      </p>
    </section>
  );
}
