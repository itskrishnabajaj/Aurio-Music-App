import { MediaPlaceholder, VideoPlaceholder } from "@/components/Placeholder";

const SHOTS = [
  { label: "Dance session", hint: "Zumba or Power Garba mid-class" },
  { label: "Workout floor", hint: "TRX, functional & strength area" },
  { label: "Reception area", hint: "The first thing members walk into" },
  { label: "Group class", hint: "A full batch in motion" },
  { label: "Celebration event", hint: "Garba night or an anniversary bash" },
];

export default function Gallery() {
  return (
    <section className="gallery" id="gallery" aria-labelledby="gallery-title">
      <header className="section-head section-head--flush">
        <p className="section-head__eyebrow reveal">Inside the studio</p>
        <h2 className="section-head__title reveal" id="gallery-title">
          Come see the <em>room.</em>
        </h2>
        <p className="section-head__note reveal">
          Photography from the studio will live here — these slots are sized and ready.
        </p>
      </header>

      <div className="gallery__grid">
        <VideoPlaceholder
          label="Studio reel placeholder"
          hint="A short walkthrough or class reel will play here."
          ratio="16 / 9"
          className="gallery__reel"
        />
        {SHOTS.map((s) => (
          <MediaPlaceholder key={s.label} label={s.label} hint={s.hint} ratio="4 / 5" />
        ))}
      </div>

      <p className="gallery__note reveal">
        Send us your best shots and we’ll drop them straight into these frames — no layout changes
        needed.
      </p>
    </section>
  );
}
