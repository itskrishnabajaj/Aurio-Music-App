import { CONTACT } from "@/lib/config";

const MOMENTS = [
  {
    key: "a",
    year: "Every Navratri",
    title: "Garba Nights",
    copy: "The studio floor becomes a festival ground — members, families, dandiya and drums.",
    speed: "0.03",
  },
  {
    key: "b",
    year: "2019",
    title: "Power Garba Masterclass",
    copy: "Format founder Satyajit Vora brought his masterclass to our floor.",
    speed: "0.07",
  },
  {
    key: "c",
    year: "2024",
    title: "The 46°C Workout",
    copy: "Nagpur’s hottest week. The batch showed up anyway. The reel went everywhere.",
    speed: "0.05",
  },
  {
    key: "d",
    year: "2022",
    title: "Mrs Fit India",
    copy: "Our founder crowned on a national stage — the whole studio celebrated for a week.",
    speed: "0.08",
  },
  {
    key: "e",
    year: "2015 → today",
    title: "Anniversary Bashes",
    copy: "Every August the family gets bigger, the cake gets larger, the playlist gets louder.",
    speed: "0.04",
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
      </header>
      <div className="moments__wall">
        {MOMENTS.map((m) => (
          <article className={`moment moment--${m.key} reveal`} data-speed={m.speed} key={m.key}>
            <span className="moment__year">{m.year}</span>
            <h3>{m.title}</h3>
            <p>{m.copy}</p>
          </article>
        ))}
      </div>
      <p className="moments__ig reveal">
        Live from the floor →{" "}
        <a href={CONTACT.INSTAGRAM} target="_blank" rel="noopener">
          @2stepzfitness ↗
        </a>
      </p>
    </section>
  );
}
