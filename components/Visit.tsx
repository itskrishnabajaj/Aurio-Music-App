import { waLink, telLink, CONTACT, HAS_WHATSAPP, HAS_PHONE } from "@/lib/config";

const ext = !HAS_WHATSAPP ? { target: "_blank", rel: "noopener" } : {};

export default function Visit() {
  return (
    <section className="visit band" id="visit" aria-labelledby="visit-title">
      <div className="visit__blob visit__blob--a" aria-hidden="true"></div>
      <div className="visit__blob visit__blob--b" aria-hidden="true"></div>
      <div className="visit__inner">
        <h2 className="visit__title reveal" id="visit-title">
          Come dance
          <br />
          <em>with us.</em>
        </h2>
        <p className="visit__sub reveal">
          Your first class is the easiest step. We’ll be waiting — probably mid-song.
        </p>
        <div className="visit__actions btn-row reveal">
          <a className="btn btn--white" href={waLink()} {...ext}>
            Book my trial on WhatsApp
          </a>
          {HAS_PHONE && (
            <a className="btn btn--ghost-light" href={telLink()}>
              Call the studio
            </a>
          )}
          <a className="btn btn--ghost-light" href={CONTACT.INSTAGRAM} target="_blank" rel="noopener">
            DM on Instagram
          </a>
        </div>
        <address className="visit__address reveal">
          <div>
            <h3>Find us</h3>
            <p>
              Plot 63, Gubre Bhavan, 2nd Floor,
              <br />
              Canal Road, Gokulpeth,
              <br />
              Nagpur 440010 · near Times of India
            </p>
            <a href={CONTACT.MAPS} target="_blank" rel="noopener">
              Get directions ↗
            </a>
          </div>
          <div>
            <h3>Hours</h3>
            <p>
              Monday – Saturday
              <br />
              Morning &amp; evening batches
              <br />
              Message us for today’s timings
            </p>
            <a href={CONTACT.INSTAGRAM} target="_blank" rel="noopener">
              @2stepzfitness ↗
            </a>
          </div>
        </address>
      </div>
    </section>
  );
}
