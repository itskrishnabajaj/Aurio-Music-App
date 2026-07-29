import { waLink, HAS_WHATSAPP } from "@/lib/config";

const ext = !HAS_WHATSAPP ? { target: "_blank", rel: "noopener" } : {};

const DOTS = [
  [100, 14], [143, 26], [174, 57], [186, 100], [174, 143], [143, 174],
  [100, 186], [57, 174], [26, 143], [14, 100], [26, 57], [57, 26],
] as const;

export default function Garba() {
  return (
    <section className="garba band" aria-labelledby="garba-title">
      <div className="garba__disc" aria-hidden="true">
        <svg viewBox="0 0 200 200" role="presentation">
          <g className="garba__dots">
            {DOTS.map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" />
            ))}
          </g>
          <circle cx="100" cy="100" r="62" className="garba__inner-ring" />
        </svg>
      </div>
      <div className="garba__inner">
        <p className="section-head__eyebrow reveal">Only at 2Stepz</p>
        <h2 className="section-head__title reveal" id="garba-title">
          The circle never
          <br />
          <em>stops turning.</em>
        </h2>
        <p className="garba__copy reveal">
          Power Garba turns India’s favourite dance into a full-body workout — dandiya sticks, live
          drum energy and a format so loved that its founder, Satyajit Vora, brought his masterclass
          to our floor. When Navratri arrives, you’ll already know every step.
        </p>
        <a
          className="btn btn--grad reveal"
          href={waLink("Hi! When does the next Power Garba batch start?")}
          {...ext}
        >
          Ask about the next batch
        </a>
      </div>
    </section>
  );
}
