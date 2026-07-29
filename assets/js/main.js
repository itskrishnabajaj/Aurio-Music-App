(() => {
  "use strict";

  /* Studio contact + weekly schedule.
     WHATSAPP/PHONE must be real digits (country code first) before launch —
     while they contain placeholders every chat CTA falls back to Instagram
     and call buttons stay hidden, so nothing on the page ever dead-ends. */
  const CONTACT = {
    WHATSAPP: "91XXXXXXXXXX",
    PHONE: "+91XXXXXXXXXX",
    INSTAGRAM: "https://www.instagram.com/2stepzfitness/",
  };

  const SCHEDULE = {
    Mon: [
      { time: "7:00 am", name: "Zumba", note: "all levels" },
      { time: "6:00 pm", name: "Zumba Toning", note: "light weights" },
      { time: "7:00 pm", name: "Power Garba", note: "signature format" },
    ],
    Tue: [
      { time: "7:00 am", name: "Pilates", note: "core & posture" },
      { time: "6:00 pm", name: "Zumba", note: "all levels" },
      { time: "7:00 pm", name: "TRX & Functional", note: "small group" },
    ],
    Wed: [
      { time: "7:00 am", name: "Zumba", note: "all levels" },
      { time: "6:00 pm", name: "Bokwa", note: "beginner friendly" },
      { time: "7:00 pm", name: "Zumba", note: "all levels" },
    ],
    Thu: [
      { time: "7:00 am", name: "Yoga & Meditation", note: "slow morning" },
      { time: "6:00 pm", name: "Zumba", note: "all levels" },
      { time: "7:00 pm", name: "Power Garba", note: "signature format" },
    ],
    Fri: [
      { time: "7:00 am", name: "Zumba", note: "all levels" },
      { time: "6:00 pm", name: "TRX & Functional", note: "small group" },
      { time: "7:00 pm", name: "Folk Fitness", note: "desi beats" },
    ],
    Sat: [
      { time: "8:00 am", name: "Strong by Zumba", note: "sweat special" },
      { time: "5:00 pm", name: "Kids' Batch", note: "ages 6–14" },
      { time: "6:00 pm", name: "Community Class", note: "bring a friend" },
    ],
    Sun: [],
  };

  const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* ---------- contact wiring ---------- */
  const hasWhatsApp = /^\d{10,15}$/.test(CONTACT.WHATSAPP);
  const hasPhone = /^\+?\d{10,15}$/.test(CONTACT.PHONE.replace(/\s/g, ""));
  const defaultMsg = "Hi! I'd like to book a trial class at 2Stepz \u{1F483}";

  const waLink = (msg) =>
    hasWhatsApp
      ? `https://wa.me/${CONTACT.WHATSAPP}?text=${encodeURIComponent(msg || defaultMsg)}`
      : CONTACT.INSTAGRAM;

  $$("[data-cta]").forEach((el) => {
    const kind = el.dataset.cta;
    if (kind === "whatsapp" || kind === "trial") {
      el.href = waLink(el.dataset.msg);
      if (!hasWhatsApp) {
        el.target = "_blank";
        el.rel = "noopener";
      }
    } else if (kind === "call") {
      if (hasPhone) {
        el.href = `tel:${CONTACT.PHONE.replace(/\s/g, "")}`;
        el.hidden = false;
      } else {
        el.hidden = true;
      }
    }
  });

  /* ---------- hero entrance ---------- */
  requestAnimationFrame(() => document.body.classList.add("is-loaded"));

  /* ---------- nav state + hide on scroll down ---------- */
  const nav = $("[data-nav]");
  const dock = $("[data-dock]");
  const hero = $(".hero");
  let lastY = window.scrollY;
  let dockArmed = false;
  let dockSuppressed = false;
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

    if (dockArmed) {
      if (dockSuppressed || (goingDown && y > hero.offsetHeight * 1.6)) {
        dock.classList.add("is-tucked");
      } else if (goingUp) {
        dock.classList.remove("is-tucked");
      }
    }

    if (goingDown || goingUp) lastY = y;
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true });

  /* dock appears once the hero is left behind */
  dock.hidden = false;
  new IntersectionObserver(
    ([entry]) => {
      dockArmed = !entry.isIntersecting;
      dock.classList.toggle("is-visible", dockArmed);
      const h = dockArmed ? dock.offsetHeight + 24 : 0;
      document.documentElement.style.setProperty("--dock-h", `${h}px`);
    },
    { rootMargin: "-30% 0px 0px 0px" }
  ).observe(hero);

  /* the visit section is itself the CTA — keep the dock out of its way */
  const visit = $("#visit");
  if (visit) {
    new IntersectionObserver(
      ([entry]) => {
        dockSuppressed = entry.isIntersecting;
        dock.classList.toggle("is-tucked", dockSuppressed);
      },
      { threshold: 0.25 }
    ).observe(visit);
  }

  /* ---------- mobile menu ---------- */
  const menu = $("[data-menu]");
  const menuBtn = $("[data-menu-btn]");
  const setMenu = (open) => {
    menu.hidden = false;
    requestAnimationFrame(() => menu.classList.toggle("is-open", open));
    document.body.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  menuBtn.addEventListener("click", () =>
    setMenu(!document.body.classList.contains("menu-open"))
  );
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) setMenu(false);
  });

  /* ---------- reveal on scroll ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );
  $$(".reveal").forEach((el, i) => {
    el.style.setProperty("--d", `${(i % 4) * 0.08}s`);
    revealObserver.observe(el);
  });

  /* ---------- manifesto scroll-fill ---------- */
  const fillLines = $$(".fill-line");
  if (fillLines.length && motionOK) {
    let fillTicking = false;
    const paintFill = () => {
      const vh = window.innerHeight;
      fillLines.forEach((line) => {
        const r = line.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (vh * 0.82 - r.top) / (vh * 0.55)));
        line.style.setProperty("--fill", `${(progress * 100).toFixed(1)}%`);
      });
      fillTicking = false;
    };
    window.addEventListener("scroll", () => {
      if (!fillTicking) {
        fillTicking = true;
        requestAnimationFrame(paintFill);
      }
    }, { passive: true });
    paintFill();
  }

  /* ---------- counters ---------- */
  const runCounter = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const suffix = el.dataset.suffix || "";
    const dur = 900;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    if (motionOK) requestAnimationFrame(tick);
    else el.textContent = target.toFixed(decimals) + suffix;
  };
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          $$("[data-count]", entry.target).forEach(runCounter);
          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  const stats = $("[data-stats]");
  if (stats) statObserver.observe(stats);

  /* ---------- rails: progress bars ---------- */
  $$("[data-rail]").forEach((rail) => {
    const bar = rail.parentElement.querySelector("[data-rail-bar]") ||
      rail.closest("section")?.querySelector("[data-rail-bar]");
    if (!bar) return;
    const paint = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      const p = max > 0 ? rail.scrollLeft / max : 0;
      bar.style.setProperty("--p", `${(12 + p * 88).toFixed(1)}%`);
    };
    rail.addEventListener("scroll", paint, { passive: true });
    paint();
  });

  /* ---------- parallax floats ---------- */
  const floats = $$("[data-speed]");
  if (floats.length && motionOK) {
    let floatTicking = false;
    const paintFloats = () => {
      const vh = window.innerHeight;
      floats.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const offset = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.speed);
        el.style.transform = `translate3d(0, ${(-offset).toFixed(1)}px, 0)`;
      });
      floatTicking = false;
    };
    window.addEventListener("scroll", () => {
      if (!floatTicking) {
        floatTicking = true;
        requestAnimationFrame(paintFloats);
      }
    }, { passive: true });
    paintFloats();
  }

  /* ---------- schedule ---------- */
  const tabsHost = $("[data-day-tabs]");
  const panelHost = $("[data-day-panels]");
  if (tabsHost && panelHost) {
    const days = Object.keys(SCHEDULE);
    const today = days[(new Date().getDay() + 6) % 7];

    const renderDay = (day) => {
      const rows = SCHEDULE[day];
      if (!rows.length) {
        panelHost.innerHTML =
          `<p class="schedule__empty">Sunday is rest day — the music comes back Monday morning.</p>`;
        return;
      }
      panelHost.innerHTML = rows
        .map(
          (r) => `
          <div class="schedule__row">
            <span class="schedule__time">${r.time}</span>
            <span class="schedule__what"><b>${r.name}</b><small>${r.note}</small></span>
            <a class="schedule__book"
               href="${waLink(`Hi! Is there space in the ${day} ${r.time} ${r.name} batch?`)}"
               ${hasWhatsApp ? "" : 'target="_blank" rel="noopener"'}>Book this batch →</a>
          </div>`
        )
        .join("");
    };

    days.forEach((day) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.role = "tab";
      btn.textContent = day;
      btn.setAttribute("aria-selected", String(day === today));
      btn.addEventListener("click", () => {
        $$("button", tabsHost).forEach((b) =>
          b.setAttribute("aria-selected", String(b === btn))
        );
        renderDay(day);
      });
      tabsHost.appendChild(btn);
    });
    renderDay(today);
  }

  /* ---------- magnetic buttons (fine pointers only) ---------- */
  if (motionOK && window.matchMedia("(pointer: fine)").matches) {
    $$(".btn--solid, .btn--wa, .btn--dark").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) * 0.14;
        const dy = (e.clientY - r.top - r.height / 2) * 0.22;
        btn.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
      });
      btn.addEventListener("pointerleave", () => {
        btn.style.transform = "";
      });
    });
  }

  /* ---------- footer year ---------- */
  const yearEl = $("[data-year]");
  if (yearEl) yearEl.textContent = `© ${new Date().getFullYear()}`;
})();
