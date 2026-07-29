import { waLink, HAS_WHATSAPP } from "@/lib/config";

const ext = !HAS_WHATSAPP ? { target: "_blank", rel: "noopener" } : {};

export default function Founder() {
  return (
    <section className="founder band" aria-labelledby="founder-title">
      <div className="founder__ring" data-speed="0.06" aria-hidden="true"></div>
      <div className="founder__inner">
        <div className="founder__portrait reveal" aria-hidden="true">
          <span className="founder__monogram">M</span>
          <span className="founder__caption">Madhumita Gubre · founder, 2Stepz</span>
        </div>
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
            <li className="reveal">
              Mrs Fit India <b>2022</b>
            </li>
            <li className="reveal">
              Mrs India Multimedia <b>2017</b>
            </li>
            <li className="reveal">
              Fitness Influencer <b>2018</b>
            </li>
            <li className="reveal">
              Founder &amp; lead instructor <b>since 2015</b>
            </li>
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
