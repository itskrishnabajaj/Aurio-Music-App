import { VERIFIED } from "@/lib/config";

const ICONS = {
  sticks: (
    <path d="M6 2h2v13a1 1 0 0 1-2 0V2Zm10 0h2v13a1 1 0 0 1-2 0V2ZM7 17.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm10 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />
  ),
  star: <path d="M12 2l2.9 6.3 6.6.8-4.9 4.5 1.3 6.6-5.9-3.3-5.9 3.3 1.3-6.6L2.5 9.1l6.6-.8L12 2Z" />,
  sun: (
    <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0-6 1.5 3h-3L12 1Zm0 22-1.5-3h3L12 23ZM1 12l3-1.5v3L1 12Zm22 0-3 1.5v-3l3 1.5ZM4.2 4.2l3.2 1-2.2 2.2-1-3.2Zm15.6 15.6-3.2-1 2.2-2.2 1 3.2Zm0-15.6-1 3.2-2.2-2.2 3.2-1ZM4.2 19.8l1-3.2 2.2 2.2-3.2 1Z" />
  ),
  crown: <path d="M3 7l4.5 3.5L12 4l4.5 6.5L21 7l-1.8 11H4.8L3 7Zm2.5 13h13v2h-13v-2Z" />,
  cake: (
    <path d="M12 1.5c1.2 1.4 1.8 2.4 1.8 3.1a1.8 1.8 0 1 1-3.6 0c0-.7.6-1.7 1.8-3.1ZM6 8h12a2 2 0 0 1 2 2v2.2c-1 0-1.4.8-2.7.8s-1.7-.8-2.7-.8-1.4.8-2.6.8-1.7-.8-2.7-.8-1.5.8-2.7.8S4.9 12.2 4 12.2V10a2 2 0 0 1 2-2Zm-2 6.6c1 0 1.4.8 2.6.8s1.6-.8 2.7-.8 1.5.8 2.7.8 1.6-.8 2.6-.8 1.5.8 2.7.8 1.6-.8 2.7-.8V21H4v-6.4Z" />
  ),
};

const MILESTONES = [
  {
    key: "bashes",
    year: "2015 → today",
    title: "Anniversary Bashes",
    copy: "Every August the family gets bigger, the cake gets larger, the playlist gets louder.",
    accent: "var(--rasp)",
    ink: "var(--rasp-deep)",
    icon: ICONS.cake,
  },
  {
    key: "masterclass",
    year: "2019",
    title: "Power Garba Masterclass",
    copy: "Format founder Satyajit Vora brought his masterclass to our floor.",
    accent: "var(--violet)",
    ink: "var(--violet-deep)",
    icon: ICONS.sticks,
  },
  {
    key: "crown",
    year: "2022",
    title: "Mrs Fit India",
    copy: "Our founder crowned on a national stage — the whole studio celebrated for a week.",
    accent: "#e0397a",
    ink: "#b81f5c",
    icon: ICONS.crown,
  },
  {
    key: "heat",
    year: "2024",
    title: "The 46°C Workout",
    copy: "Nagpur’s hottest week. The batch showed up anyway. The reel went everywhere.",
    accent: "var(--tang)",
    ink: "var(--tang-deep)",
    icon: ICONS.sun,
  },
  {
    key: "garba",
    year: "Every Navratri",
    title: "Garba Nights",
    copy: "The studio floor becomes a festival ground — members, families, dandiya and drums.",
    accent: "var(--green)",
    ink: "var(--green-deep)",
    icon: ICONS.star,
  },
];

export default function Moments() {
  return (
    <section className="moments" id="moments" aria-labelledby="moments-title">
      <header className="section-head">
        <p className="section-head__eyebrow reveal">The community</p>
        <h2 className="section-head__title reveal" id="moments-title">
          A decade of <em>moments.</em>
        </h2>
        <p className="section-head__note reveal">
          Scroll the studio’s journey, one milestone at a time.
        </p>
      </header>

      <div className="timeline" data-timeline>
        <div className="timeline__spine" data-spine aria-hidden="true"></div>
        <ol className="timeline__list">
          {MILESTONES.map((m, i) => (
            <li
              className={`milestone milestone--${i % 2 === 0 ? "left" : "right"}`}
              key={m.key}
              data-milestone
              style={{ "--accent": m.accent, "--accent-ink": m.ink } as React.CSSProperties}
            >
              <span className="milestone__marker" aria-hidden="true">
                <svg viewBox="0 0 24 24">{m.icon}</svg>
              </span>
              <span className="milestone__aside" aria-hidden="true">
                {m.year}
              </span>
              <div className="milestone__card">
                <span className="milestone__year">{m.year}</span>
                <h3>{m.title}</h3>
                <p>{m.copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className="moments__ig reveal">
        Live from the floor →{" "}
        <a className="link" href={VERIFIED.INSTAGRAM} target="_blank" rel="noopener">
          @2stepzfitness <i aria-hidden="true">↗</i>
        </a>
      </p>
    </section>
  );
}
