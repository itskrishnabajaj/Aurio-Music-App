import { FieldPlaceholder } from "@/components/Placeholder";
import { waLink, HAS_WHATSAPP } from "@/lib/config";

const ext = !HAS_WHATSAPP ? { target: "_blank", rel: "noopener" } : {};

export default function Plans() {
  return (
    <section className="plans band" id="membership" aria-labelledby="plans-title">
      <header className="section-head section-head--flush">
        <p className="section-head__eyebrow reveal">Membership</p>
        <h2 className="section-head__title reveal" id="plans-title">
          A seat in <em>the circle.</em>
        </h2>
        <p className="section-head__note reveal">
          Every plan includes all group formats. Start with a free trial — decide later.
        </p>
      </header>
      <div className="plans__grid">
        <article className="plan reveal">
          <h3>Monthly</h3>
          <p className="plan__for">Dip your toes in. Perfect after a trial class you didn’t want to end.</p>
          <p className="plan__price">
            <FieldPlaceholder label="Pricing placeholder" />
          </p>
          <ul>
            <li>All group formats included</li>
            <li>Morning &amp; evening batches</li>
            <li>No lock-in pressure</li>
          </ul>
          <a
            className="btn btn--outline"
            href={waLink("Hi! Please share the current monthly membership offer.")}
            {...ext}
          >
            Get today’s offer
          </a>
        </article>
        <article className="plan plan--star reveal">
          <span className="plan__flag">Most loved</span>
          <h3>Quarterly</h3>
          <p className="plan__for">Twelve weeks — exactly how long real transformations take to show.</p>
          <p className="plan__price">
            <FieldPlaceholder label="Pricing placeholder" />
          </p>
          <ul>
            <li>All group formats included</li>
            <li>Priority in festival batches</li>
            <li>Progress check-ins</li>
            <li>Best value per class</li>
          </ul>
          <a
            className="btn btn--grad"
            href={waLink("Hi! Please share the current quarterly membership offer.")}
            {...ext}
          >
            Get today’s offer
          </a>
        </article>
        <article className="plan reveal">
          <h3>Annual</h3>
          <p className="plan__for">For the ones who know this is their place now. The circle’s inner ring.</p>
          <p className="plan__price">
            <FieldPlaceholder label="Pricing placeholder" />
          </p>
          <ul>
            <li>Everything in Quarterly</li>
            <li>Free entry to studio events</li>
            <li>Membership pause option</li>
          </ul>
          <a
            className="btn btn--outline"
            href={waLink("Hi! Please share the current annual membership offer.")}
            {...ext}
          >
            Get today’s offer
          </a>
        </article>
      </div>
      <p className="plans__note reveal">
        Kids’ batches, personal training and corporate programs are quoted separately —{" "}
        <a href={waLink("Hi! I'd like to know about kids' / PT / corporate programs.")} {...ext}>
          just ask
        </a>
        .
      </p>
    </section>
  );
}
