import { MediaPlaceholder, FieldPlaceholder } from "@/components/Placeholder";
import {
  waLink,
  telLink,
  VERIFIED,
  STUDIO,
  HAS_WHATSAPP,
  HAS_PHONE,
  HAS_EMAIL,
  HAS_HOURS,
  HAS_MAPS_EMBED,
  PENDING,
} from "@/lib/config";

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
          {HAS_PHONE ? (
            <a className="btn btn--ghost-light" href={telLink()}>
              Call the studio
            </a>
          ) : (
            <FieldPlaceholder label="Phone number placeholder" icon="portrait" tone="light" />
          )}
          <a className="btn btn--ghost-light" href={VERIFIED.INSTAGRAM} target="_blank" rel="noopener">
            DM on Instagram
          </a>
        </div>

        <address className="visit__address reveal">
          <div>
            <h3>Find us</h3>
            <p>
              {STUDIO.address.line1}
              <br />
              {STUDIO.address.line2}
              <br />
              {STUDIO.address.line3}
            </p>
            <a href={VERIFIED.MAPS} target="_blank" rel="noopener">
              Get directions ↗
            </a>
          </div>
          <div>
            <h3>Hours</h3>
            {HAS_HOURS ? (
              <p>{PENDING.HOURS}</p>
            ) : (
              <p className="visit__pending">
                <FieldPlaceholder label="Business hours placeholder" icon="clock" tone="light" />
                <FieldPlaceholder label="Batch timings placeholder" icon="clock" tone="light" />
              </p>
            )}
          </div>
          <div>
            <h3>Reach us</h3>
            <p className="visit__pending">
              {!HAS_WHATSAPP && (
                <FieldPlaceholder label="WhatsApp number placeholder" tone="light" />
              )}
              {!HAS_EMAIL && <FieldPlaceholder label="Email address placeholder" tone="light" />}
              <FieldPlaceholder label="Parking information placeholder" tone="light" />
            </p>
          </div>
        </address>

        {!HAS_MAPS_EMBED && (
          <div className="visit__map">
            <MediaPlaceholder
              label="Google Maps location placeholder"
              hint="An interactive map of the studio will be embedded here."
              ratio="16 / 7"
              icon="map"
              className="ph--on-dark"
            />
          </div>
        )}
      </div>
    </section>
  );
}
