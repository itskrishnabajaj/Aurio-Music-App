import { waLink, HAS_WHATSAPP } from "@/lib/config";

const ext = !HAS_WHATSAPP ? { target: "_blank", rel: "noopener" } : {};

export default function Hero() {
  return (
    <section className="hero" id="top" aria-label="Welcome">
      <div className="hero__blob hero__blob--a" aria-hidden="true"></div>
      <div className="hero__blob hero__blob--b" aria-hidden="true"></div>
      <div className="hero__ring" data-speed="0.05" aria-hidden="true"></div>
      <div className="hero__dot hero__dot--a" data-speed="0.09" aria-hidden="true"></div>
      <div className="hero__dot hero__dot--b" data-speed="0.12" aria-hidden="true"></div>
      <div className="hero__dot hero__dot--c" data-speed="0.07" aria-hidden="true"></div>

      <div className="hero__inner">
        <p className="reveal-line">
          <span>
            <span className="hero__eyebrow">Gokulpeth · Nagpur · since 2015</span>
          </span>
        </p>
        <h1 className="hero__title">
          <span className="reveal-line">
            <span>The best</span>
          </span>
          <span className="reveal-line">
            <span>
              <em>hour</em> of
            </span>
          </span>
          <span className="reveal-line">
            <span>your day.</span>
          </span>
        </h1>
        <p className="hero__sub reveal-line">
          <span>
            Zumba. Power Garba. Bokwa. Pilates. One boutique studio where fitness feels like a
            celebration — led by <strong>Mrs&nbsp;Fit&nbsp;India&nbsp;2022</strong>.
          </span>
        </p>
        <div className="hero__cta reveal-line">
          <span className="btn-row">
            <a className="btn btn--grad" href={waLink()} {...ext}>
              Book a free trial class
            </a>
            <a className="btn btn--outline" href="#classes">
              Explore the formats
            </a>
          </span>
        </div>
        <div className="hero__proof-wrap reveal-line">
          <span>
            <dl className="hero__proof">
              <div>
                <dt>★ 4.6</dt>
                <dd>88+ reviews</dd>
              </div>
              <div>
                <dt>10 yrs</dt>
                <dd>of classes</dd>
              </div>
              <div>
                <dt>10+</dt>
                <dd>formats</dd>
              </div>
              <div>
                <dt>1</dt>
                <dd>big family</dd>
              </div>
            </dl>
          </span>
        </div>
      </div>
      <div className="hero__scroll" aria-hidden="true">
        <span></span>scroll
      </div>
    </section>
  );
}
