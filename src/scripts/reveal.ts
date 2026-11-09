// Adds .is-visible to [data-reveal] elements (headings and waterlines) as they enter the viewport.
// Content must never depend on the observer: without JS, with reduced motion, in a background tab,
// after an anchor jump, in automated/full-page captures, or if the observer simply does not fire,
// everything is shown. The hidden state exists only under html.js (see global.css).
const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const show = (el: Element) => el.classList.add("is-visible");
const showAll = () => items.forEach(show);
const automated = navigator.webdriver === true;

if (reduce || automated || document.visibilityState !== "visible" || !("IntersectionObserver" in window)) {
  showAll();
} else {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
    }
  }, { rootMargin: "0px", threshold: 0 });
  items.forEach((el) => io.observe(el));

  // Backup check on scroll: anything whose top is above the bottom of the screen is shown.
  let ticking = false;
  const check = () => {
    ticking = false;
    const h = window.innerHeight;
    for (const el of items) if (!el.classList.contains("is-visible") && el.getBoundingClientRect().top < h) show(el);
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(check); } };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  check();

  // Anchor navigation (menu, #hash in the address): show the target section at once.
  const revealHash = () => {
    const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
    target?.querySelectorAll("[data-reveal]").forEach(show);
  };
  revealHash();
  window.addEventListener("hashchange", revealHash);
  document.addEventListener("click", (e) => {
    const a = (e.target as Element | null)?.closest?.('a[href^="#"]');
    const id = a?.getAttribute("href")?.slice(1);
    if (id) document.getElementById(id)?.querySelectorAll("[data-reveal]").forEach(show);
  });

  // Tab goes to the background, printing, or the observer never fires: show everything.
  document.addEventListener("visibilitychange", () => { if (document.visibilityState !== "visible") showAll(); });
  window.addEventListener("beforeprint", showAll);
  window.setTimeout(showAll, 2500);
}
