const ITEMS =
  "Zumba ✦ Power Garba ✦ Bokwa ✦ Pilates ✦ Yoga ✦ TRX ✦ Folk Fitness ✦ Zumba Toning ✦ Kids’ Batches ✦ ";

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        <span>{ITEMS}</span>
        <span>{ITEMS}</span>
      </div>
    </div>
  );
}
