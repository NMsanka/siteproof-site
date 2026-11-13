// SiteProof public site: gentle motion and two small helpers. Every page works without it:
// the reveals only switch on once this script has run (the "js" class), and they're off for
// anyone whose device asks for reduced motion. Loaded at the end of <body>; loads nothing else.
(() => {
  const root = document.documentElement;
  root.classList.add("js");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wide = matchMedia("(min-width: 821px)").matches;

  // The header: a soft shadow once the page has scrolled.
  const header = document.querySelector("header");
  const onScroll = () => header && header.classList.toggle("scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Reveal on scroll. [selector, extra classes, stagger in ms between siblings]
  const groups = [
    [".trust-item", "", 90],
    [".section-head", "", 0],
    [".photos figure", "zoom", 90],
    [".roles .role", "", 70],
    [".cta", "zoom", 0],
    ["main .wrap > figure", "", 0],
    ["main .wrap > .card, main .wrap > .two, main .wrap > .note", "", 0],
  ];
  const targets = [];
  for (const [selector, extra, step] of groups) {
    document.querySelectorAll(selector).forEach((el) => {
      el.classList.add("reveal", ...extra.split(" ").filter(Boolean));
      if (step) {
        const siblings = [...el.parentElement.children].filter((c) => c.matches(selector));
        el.style.setProperty("--d", `${siblings.indexOf(el) * step}ms`);
      }
      targets.push(el);
    });
  }
  // Feature rows: the phone and the words come in from opposite sides on wide screens.
  document.querySelectorAll(".feature").forEach((row) => {
    const flip = row.classList.contains("flip");
    const media = row.querySelector(".feature-media");
    const text = row.querySelector(".feature-text");
    if (media) { media.classList.add("reveal", wide ? (flip ? "from-right" : "from-left") : "zoom"); targets.push(media); }
    if (text) { text.classList.add("reveal", ...(wide ? [flip ? "from-left" : "from-right"] : [])); text.style.setProperty("--d", "120ms"); targets.push(text); }
  });

  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0 }); // any part: a very tall card still shows
    targets.forEach((el) => io.observe(el));
  }

  // The film: a big play button over the poster; the player's own controls once it plays.
  document.querySelectorAll(".film").forEach((film) => {
    const video = film.querySelector("video");
    const button = film.querySelector(".play");
    if (!video || !button) return;
    video.controls = false;
    button.addEventListener("click", () => {
      film.classList.add("playing");
      video.controls = true;
      video.play().catch(() => {}); // if the browser blocks it, the controls are there to press play
    });
    video.addEventListener("ended", () => {
      film.classList.remove("playing");
      video.controls = false;
      video.load(); // back to the poster
    });
  });

  // The guides' "On this page": mark the section being read.
  // The current section is the last heading above 35% of the screen.
  const toc = document.querySelector(".toc");
  if (toc) {
    const links = [...toc.querySelectorAll('a[href^="#"]')];
    const pairs = links
      .map((a) => [a, document.getElementById(decodeURIComponent(a.hash.slice(1)))])
      .filter(([, h]) => h);
    let queued = false;
    const mark = () => {
      queued = false;
      const line = innerHeight * 0.35;
      let current = null;
      for (const [a, h] of pairs) if (h.getBoundingClientRect().top <= line) current = a;
      links.forEach((a) => a.classList.toggle("active", a === current));
    };
    const onMove = () => { if (!queued) { queued = true; requestAnimationFrame(mark); } };
    addEventListener("scroll", onMove, { passive: true });
    addEventListener("resize", onMove);
    addEventListener("hashchange", onMove);
    mark();
  }
})();
