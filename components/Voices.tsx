import Rail from "@/components/Rail";
import { CONTACT } from "@/lib/config";

const QUOTES = [
  "The classes are so much fun that sticking to a routine stopped feeling like effort. I look forward to it all day.",
  "Madhumita’s energy is unreal. Every week there’s a new format, new music, new creativity — you simply can’t get bored.",
  "I came for weight loss. I stayed for the people. The results arrived on their own.",
  "I was the shy one hiding in the last row. Nobody let me stay there for long — in the nicest way possible.",
];

export default function Voices() {
  return (
    <section className="voices band" aria-labelledby="voices-title">
      <header className="section-head">
        <p className="section-head__eyebrow reveal">Why they stay</p>
        <h2 className="section-head__title reveal" id="voices-title">
          In their own <em>words.</em>
        </h2>
        <p className="section-head__note reveal">
          Drawn from a decade of public reviews · rated <b>4.6 / 5</b>
        </p>
      </header>
      <Rail label="Member reviews">
        {QUOTES.map((q) => (
          <figure className="voice" key={q.slice(0, 24)}>
            <div className="voice__stars" aria-label="5 stars">
              ★★★★★
            </div>
            <blockquote>{q}</blockquote>
            <figcaption>Member review · Justdial</figcaption>
          </figure>
        ))}
      </Rail>
      <p className="voices__link reveal">
        <a className="link" href={CONTACT.JUSTDIAL} target="_blank" rel="noopener">
          Read all 88+ reviews <i aria-hidden="true">↗</i>
        </a>
      </p>
    </section>
  );
}
