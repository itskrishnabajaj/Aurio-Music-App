"use client";

import { useEffect, useRef, useState } from "react";
import { waLink, CONTACT, HAS_WHATSAPP } from "@/lib/config";

const LINKS = [
  { href: "#story", label: "Story" },
  { href: "#classes", label: "Classes" },
  { href: "#schedule", label: "Schedule" },
  { href: "#membership", label: "Membership" },
  { href: "#moments", label: "Moments" },
  { href: "#visit", label: "Visit us" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY + 4;
      const goingUp = y < lastY - 4;
      nav.classList.toggle("nav--solid", y > 40);
      if (y > 600 && goingDown && !document.body.classList.contains("menu-open")) {
        nav.classList.add("nav--hidden");
      } else if (goingUp || y <= 600) {
        nav.classList.remove("nav--hidden");
      }
      if (goingDown || goingUp) lastY = y;
      ticking = false;
    };
    const handler = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="nav" ref={navRef}>
        <div className="nav__inner">
          <a className="nav__logo" href="#top" aria-label="2Stepz home">
            <span className="nav__logo-mark">2S</span>
            <span className="nav__logo-word">
              2Stepz<em>fitness &amp; dance</em>
            </span>
          </a>
          <nav className="nav__links" aria-label="Primary">
            {LINKS.slice(0, 5).map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="nav__actions">
            <a
              className="btn btn--grad btn--sm"
              href={waLink()}
              {...(!HAS_WHATSAPP && { target: "_blank", rel: "noopener" })}
            >
              Book a free trial
            </a>
            <button
              className="nav__burger"
              aria-expanded={open}
              aria-controls="menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen(!open)}
            >
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div className={`menu${open ? " is-open" : ""}`} id="menu" aria-hidden={!open}>
        <nav className="menu__links" aria-label="Menu">
          {LINKS.map((l, i) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              <small>{String(i + 1).padStart(2, "0")}</small>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="menu__foot">
          <a
            href={waLink()}
            {...(!HAS_WHATSAPP && { target: "_blank", rel: "noopener" })}
            tabIndex={open ? 0 : -1}
          >
            WhatsApp us
          </a>
          <a href={CONTACT.INSTAGRAM} rel="noopener" target="_blank" tabIndex={open ? 0 : -1}>
            Instagram ↗
          </a>
        </div>
      </div>
    </>
  );
}
