"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { waLink, CONTACT, HAS_WHATSAPP } from "@/lib/config";

const LINKS = [
  { href: "#story", label: "Story" },
  { href: "#classes", label: "Classes" },
  { href: "#schedule", label: "Schedule" },
  { href: "#membership", label: "Membership" },
  { href: "#moments", label: "Moments" },
  { href: "#visit", label: "Visit us" },
];

const ext = !HAS_WHATSAPP ? { target: "_blank", rel: "noopener" } : {};

export default function Nav() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    burgerRef.current?.focus();
  }, []);

  /* lock the page without the layout shifting as the scrollbar goes */
  useEffect(() => {
    if (!open) {
      document.body.classList.remove("menu-open");
      document.body.style.paddingRight = "";
      return;
    }
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.classList.add("menu-open");
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    return () => {
      document.body.classList.remove("menu-open");
      document.body.style.paddingRight = "";
    };
  }, [open]);

  /* focus trap: the menu is a modal surface while it is open */
  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    if (!menu) return;
    const focusables = () =>
      [...menu.querySelectorAll<HTMLElement>("a[href], button")].filter((el) => el.offsetParent !== null);

    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      /* DOM order: the burger sits in the header, ahead of the panel */
      const items = [burgerRef.current, ...focusables()].filter(Boolean) as HTMLElement[];
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  /* shrink + auto-hide */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    let lastY = window.scrollY;
    let ticking = false;

    const read = () => {
      const y = window.scrollY;
      const down = y > lastY + 4;
      const up = y < lastY - 4;
      nav.classList.toggle("nav--solid", y > 40);
      if (y > 600 && down && !document.body.classList.contains("menu-open")) {
        nav.classList.add("nav--hidden");
      } else if (up || y <= 600) {
        nav.classList.remove("nav--hidden");
      }
      if (down || up) lastY = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(read);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    read();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="nav" ref={navRef}>
        <div className="nav__inner">
          <a className="nav__logo" href="#top" aria-label="2Stepz — back to top">
            <span className="nav__logo-mark" aria-hidden="true">
              2S
            </span>
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
            <a className="btn btn--grad btn--sm" href={waLink()} {...ext}>
              Book a free trial
            </a>
            <button
              className="nav__burger"
              ref={burgerRef}
              aria-expanded={open}
              aria-controls="menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => (open ? close() : setOpen(true))}
            >
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
        <div className="nav__progress" aria-hidden="true"></div>
      </header>

      <div
        className={`menu${open ? " is-open" : ""}`}
        id="menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        {...(!open && { inert: "" as unknown as boolean })}
      >
        <nav className="menu__links" aria-label="Menu">
          {LINKS.map((l, i) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              <small>{String(i + 1).padStart(2, "0")}</small>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="menu__foot">
          <a href={waLink()} {...ext}>
            WhatsApp us
          </a>
          <a href={CONTACT.INSTAGRAM} rel="noopener" target="_blank">
            Instagram ↗
          </a>
        </div>
      </div>
    </>
  );
}
