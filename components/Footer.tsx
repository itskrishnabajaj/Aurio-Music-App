import { FieldPlaceholder } from "@/components/Placeholder";
import { VERIFIED, HAS_YOUTUBE, PENDING } from "@/lib/config";

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
          <a href="#gallery">Gallery</a>
          <a href="#visit">Visit</a>
        </nav>
        <div className="footer__social">
          <a href={VERIFIED.INSTAGRAM} target="_blank" rel="noopener">
            Instagram ↗
          </a>
          <a href={VERIFIED.FACEBOOK} target="_blank" rel="noopener">
            Facebook ↗
          </a>
          {HAS_YOUTUBE ? (
            <a href={PENDING.YOUTUBE} target="_blank" rel="noopener">
              YouTube ↗
            </a>
          ) : (
            <FieldPlaceholder label="YouTube channel placeholder" tone="light" />
          )}
        </div>
        <p className="footer__meta">
          Gokulpeth, Nagpur · est. 2015 · rated 4.6★ by our members
          <br />© {new Date().getFullYear()} 2Stepz Fitness &amp; Dance Studio. Made with sweat,
          music and love.
        </p>
      </div>
    </footer>
  );
}
