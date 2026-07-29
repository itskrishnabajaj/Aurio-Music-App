export default function Manifesto() {
  return (
    <section className="manifesto" id="story" aria-labelledby="story-title">
      <h2 className="visually-hidden" id="story-title">
        Our story
      </h2>
      <div className="manifesto__inner">
        <p className="fill-line">You walk in nervous.</p>
        <p className="fill-line">You leave laughing.</p>
        <p className="fill-line">No mirrors judging you. No counting reps alone.</p>
        <p className="fill-line">
          Just music, movement, and a room full of people who were once as nervous as you.
        </p>
        <p className="fill-line fill-line--accent">
          This is fitness that feels like a celebration — and it has, for ten years.
        </p>
      </div>
      <div className="manifesto__stats" data-stats>
        <div className="stat stat--blush reveal">
          <strong data-count="10" data-suffix="+">
            0
          </strong>
          <span>years in Gokulpeth</span>
        </div>
        <div className="stat stat--peach reveal">
          <strong data-count="4.6" data-decimals="1">
            0
          </strong>
          <span>public rating</span>
        </div>
        <div className="stat stat--lilac reveal">
          <strong data-count="88" data-suffix="+">
            0
          </strong>
          <span>member reviews</span>
        </div>
        <div className="stat stat--mint reveal">
          <strong data-count="10" data-suffix="+">
            0
          </strong>
          <span>class formats</span>
        </div>
      </div>
    </section>
  );
}
