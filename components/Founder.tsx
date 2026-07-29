import { waLink, HAS_WHATSAPP } from "@/lib/config";

const ext = !HAS_WHATSAPP ? { target: "_blank", rel: "noopener" } : {};

const ACHIEVEMENTS = [
  ["Mrs Fit India", "2022"],
  ["Mrs India Multimedia", "2017"],
  ["Fitness Influencer", "2018"],
  ["Founder & lead instructor", "since 2015"],
];

export default function Founder() {
  return (
    <section className="founder band" aria-labelledby="founder-title">
      <div className="founder__ring" data-speed="0.06" aria-hidden="true"></div>
      <div className="founder__inner">
        <figure className="founder__figure reveal">
          <div className="founder__portrait" aria-hidden="true">
            <span className="founder__monogram">M</span>
          </div>
          <figcaption className="founder__caption">Madhumita Gubre · founder, 2Stepz</figcaption>
        </figure>
        <div className="founder__copy section-head--onplum">
          <p className="section-head__eyebrow reveal">The woman leading the room</p>
          <h2 className="section-head__title reveal" id="founder-title">
            Meet <em>Madhumita.</em>
          </h2>
          <p className="founder__bio reveal">
            Ten years ago she opened a studio on Canal Road with one belief — that women would fall
            in love with fitness the moment it stopped feeling like punishment. A decade, a few
            thousand classes and a national crown later, the belief has a waiting room.
          </p>
          <ul className="founder__badges">
            {ACHIEVEMENTS.map(([title, year]) => (
              <li className="reveal" key={title}>
                {title} <b>{year}</b>
              </li>
            ))}
          </ul>
          <blockquote className="founder__quote reveal">
            “Members don’t review our equipment. They review how the hour made them feel.”
          </blockquote>
          <a
            className="btn btn--grad reveal"
            href={waLink("Hi Madhumita! I'd love to visit 2Stepz for a trial class.")}
            {...ext}
          >
            Train with her
          </a>
        </div>
      </div>
    </section>
  );
}
