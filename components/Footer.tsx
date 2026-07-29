export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__mark">
          2Stepz <em>fitness &amp; dance studio</em>
        </p>
        <nav className="footer__links" aria-label="Footer">
          <a href="#story">Story</a>
          <a href="#classes">Classes</a>
          <a href="#schedule">Schedule</a>
          <a href="#membership">Membership</a>
          <a href="#visit">Visit</a>
        </nav>
        <p className="footer__meta">
          Gokulpeth, Nagpur · est. 2015 · rated 4.6★ by our members
          <br />© {new Date().getFullYear()} 2Stepz Fitness &amp; Dance Studio. Made with sweat,
          music and love.
        </p>
      </div>
    </footer>
  );
}
