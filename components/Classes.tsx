import Rail from "@/components/Rail";
import { waLink, HAS_WHATSAPP } from "@/lib/config";

const ext = !HAS_WHATSAPP ? { target: "_blank", rel: "noopener" } : {};

const FORMATS = [
  {
    key: "zumba",
    letter: "Z",
    eyebrow: "Latin dance fitness",
    title: "Zumba",
    feel: "Latin beats, zero judgment. The class that made the whole studio famous for fun.",
    fit: "you want cardio that never feels like cardio.",
    tags: ["All levels", "High energy", "Incl. Toning & Strong"],
    msg: "Hi! I'm interested in the Zumba batches — can you share timings and a trial?",
    cta: "Try a Zumba class",
  },
  {
    key: "garba",
    letter: "G",
    eyebrow: "Indian folk power",
    title: "Power Garba",
    feel: "Navratri energy, all year. Dandiya in hand, heart rate up, grin guaranteed.",
    fit: "Indian music moves you before any playlist does.",
    tags: ["Signature", "Full body", "Festival batches"],
    msg: "Hi! I'd love to know about the Power Garba batches.",
    cta: "Join Power Garba",
  },
  {
    key: "bokwa",
    letter: "B",
    eyebrow: "Steps & letters",
    title: "Bokwa",
    feel: "Draw the alphabet. Break a sweat. No choreography to memorise — ever.",
    fit: "“I have two left feet” is your opening line.",
    tags: ["Beginner magic", "Rare in Nagpur"],
    msg: "Hi! I'd like to try a Bokwa class.",
    cta: "Try Bokwa",
  },
  {
    key: "pilates",
    letter: "P",
    eyebrow: "Mind & body",
    title: "Pilates & Yoga",
    feel: "Strong core, calm mind. The quiet counterweight to all that dancing.",
    fit: "you want strength that stands tall, not bulky.",
    tags: ["Low impact", "Posture", "Meditation"],
    msg: "Hi! Please share the Pilates and yoga batch details.",
    cta: "Find your calm",
  },
  {
    key: "trx",
    letter: "T",
    eyebrow: "Strength & conditioning",
    title: "TRX & Functional",
    feel: "Suspension straps, bodyweight, real-life strength. Sweat with structure.",
    fit: "you want toning results you can measure.",
    tags: ["Small groups", "Progressive"],
    msg: "Hi! I'm interested in TRX / functional training.",
    cta: "Get strong",
  },
  {
    key: "kids",
    letter: "K",
    eyebrow: "Little movers",
    title: "Kids’ Batches",
    feel: "Confidence, coordination and a screen-time antidote — disguised as dance.",
    fit: "your child dances before they walk into a room.",
    tags: ["After school", "Workshops"],
    msg: "Hi! I'd like details about the kids' batches.",
    cta: "Enrol your kid",
  },
];

export default function Classes() {
  return (
    <section className="classes band" id="classes" aria-labelledby="classes-title">
      <header className="section-head">
        <p className="section-head__eyebrow reveal">The formats</p>
        <h2 className="section-head__title reveal" id="classes-title">
          Pick your <em>energy.</em>
        </h2>
        <p className="section-head__note reveal">
          Swipe through — every format welcomes complete beginners.
        </p>
      </header>
      <Rail label="Class formats">
        {FORMATS.map((f) => (
          <article className={`card card--${f.key}`} key={f.key}>
            <div className="card__art" data-letter={f.letter}>
              <p className="card__eyebrow">{f.eyebrow}</p>
            </div>
            <div className="card__body">
              <h3 className="card__title">{f.title}</h3>
              <p className="card__feel">{f.feel}</p>
              <p className="card__fit">
                <b>For you if</b> {f.fit}
              </p>
              <div className="card__tags">
                {f.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <a className="link" href={waLink(f.msg)} {...ext}>
                {f.cta} <i aria-hidden="true">→</i>
              </a>
            </div>
          </article>
        ))}
      </Rail>
    </section>
  );
}
