import { waLink, HAS_WHATSAPP } from "@/lib/config";

const ext = !HAS_WHATSAPP ? { target: "_blank", rel: "noopener" } : {};

const STEPS = [
  { title: "Message us", copy: "One tap on WhatsApp. Tell us nothing more than “I want to try”." },
  { title: "Pick your batch", copy: "Morning or evening — we’ll suggest the friendliest one for beginners." },
  { title: "Wear anything comfy", copy: "Sports shoes, a water bottle, and clothes you can move in. That’s it." },
  { title: "We handle the rest", copy: "Come ten minutes early. Leave with a playlist stuck in your head." },
];

export default function FirstClass() {
  return (
    <section className="first band" aria-labelledby="first-title">
      <header className="section-head section-head--flush">
        <p className="section-head__eyebrow reveal">Nervous? Everyone was.</p>
        <h2 className="section-head__title reveal" id="first-title">
          Your first class,
          <br />
          step by <em>step.</em>
        </h2>
      </header>
      <ol className="first__steps">
        {STEPS.map((s, i) => (
          <li className="reveal" key={s.title}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <h3>{s.title}</h3>
            <p>{s.copy}</p>
          </li>
        ))}
      </ol>
      <div className="first__cta reveal">
        <a className="btn btn--grad" href={waLink()} {...ext}>
          Take the first step
        </a>
        <p>Bring a friend — first class is on us for both of you.</p>
      </div>
    </section>
  );
}
