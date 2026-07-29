const ITEMS = [
  {
    q: "I’ve never danced. I have two left feet.",
    a: "Perfect — half the room started exactly that way. There are no “wrong” steps here, and Bokwa was practically invented for you. By week two you’ll wonder what you were worried about.",
  },
  {
    q: "Am I too old or too unfit to start?",
    a: "Our members range from school kids to grandmothers. Every format scales to your pace, and instructors give low-impact options in every single class.",
  },
  {
    q: "Is it ladies-only?",
    a: "Most batches are predominantly women and the studio is proudly women-first. Message us and we’ll match you to the batch where you’ll feel most at home.",
  },
  {
    q: "What should I wear and bring?",
    a: "Comfortable workout clothes, sports shoes and a water bottle. We’ll take care of the music, the energy and the dandiya sticks.",
  },
  {
    q: "How do fees work?",
    a: "Plans run monthly, quarterly or annually and always include all group formats. Ping us on WhatsApp for the current offer — festival seasons usually bring a good one.",
  },
  {
    q: "Where exactly are you?",
    a: "Second floor, Gubre Bhavan, Plot 63, Canal Road, Gokulpeth — two minutes from Times of India square. Take the stairs up; the music will guide you from there.",
  },
];

export default function Faq() {
  return (
    <section className="faq" aria-labelledby="faq-title">
      <header className="section-head">
        <p className="section-head__eyebrow reveal">Before you ask</p>
        <h2 className="section-head__title reveal" id="faq-title">
          Honest <em>answers.</em>
        </h2>
      </header>
      <div className="faq__list">
        {ITEMS.map((item) => (
          <details className="reveal" key={item.q}>
            <summary>
              {item.q}
              <span></span>
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
