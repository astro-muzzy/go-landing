
"use strict";

// 1. Current year in footer.
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

// 2. Compact mobile navigation.
const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
function closeMenu() {
  if (!menuToggle || !mobileNav) return;
  mobileNav.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Otwórz menu");
}
if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const nextOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    mobileNav.hidden = !nextOpen;
    menuToggle.setAttribute("aria-expanded", String(nextOpen));
    menuToggle.setAttribute("aria-label", nextOpen ? "Zamknij menu" : "Otwórz menu");
  });
  mobileNav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  window.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
  window.addEventListener("resize", () => { if (window.innerWidth > 760) closeMenu(); });
}

// 3. Demonstration only. No network requests and NO real participation in events.
const events = {
  coffee: { emoji: "☕", type: "KAWA", name: "Kawa bez okazji", meta: "Dziś · 17:30", address: "Centrum · 1,6 km", count: "2/4" },
  bike: { emoji: "🚲", type: "ROWER", name: "Runda po pracy", meta: "Dziś · 18:00", address: "Park · 2,4 km", count: "3/6" },
  run: { emoji: "🏃", type: "BIEGANIE", name: "Spokojne 5 km", meta: "Jutro · 9:00", address: "Nad Odrą · 3,1 km", count: "2/5" },
  games: { emoji: "🎲", type: "PLANSZÓWKI", name: "Ekipa na planszówki", meta: "Sobota · 16:00", address: "Centrum · 1,9 km", count: "3/5" }
};
const stage = document.getElementById("hero-stage");
const categoryChips = Array.from(document.querySelectorAll(".category-chip"));
const eventEmoji = document.getElementById("event-emoji");
const eventType = document.getElementById("event-type");
const eventName = document.getElementById("event-name");
const eventMeta = document.getElementById("event-meta");
const eventAddress = document.getElementById("event-address");
const eventCount = document.getElementById("event-count");
const eventJoin = document.getElementById("demo-join");
const storyStatus = document.getElementById("story-status");
const replay = document.getElementById("story-replay");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let timerId = null;
let phase = "browse";
let currentCategory = "coffee";

function showEvent(category, highlight = true) {
  const data = events[category];
  if (!data) return;
  currentCategory = category;
  eventEmoji.textContent = data.emoji;
  eventType.textContent = data.type;
  eventName.textContent = data.name;
  eventMeta.textContent = data.meta;
  eventAddress.textContent = data.address;
  eventCount.textContent = data.count;
  categoryChips.forEach(chip => {
    const selected = highlight && chip.dataset.category === category;
    chip.classList.toggle("active", selected);
    chip.setAttribute("aria-pressed", String(selected));
  });
}
function setPhase(next) {
  if (!stage) return;
  phase = next;
  stage.classList.remove("phase-browse", "phase-pick", "phase-go");
  stage.classList.add(`phase-${next}`);
  if (next === "browse") {
    showEvent("coffee", false);
    eventJoin.innerHTML = 'Zobacz szczegóły <span aria-hidden="true">→</span>';
    storyStatus.textContent = "1/3   Zobacz, co się dzieje";
  } else if (next === "pick") {
    showEvent("coffee", true);
    eventJoin.innerHTML = 'Dołącz do akcji <span aria-hidden="true">→</span>';
    storyStatus.textContent = "2/3   Wybierz swoją akcję";
  } else if (next === "go") {
    showEvent("coffee", true);
    eventJoin.innerHTML = 'GO! ✓';
    storyStatus.textContent = "3/3   Spotkajcie się naprawdę";
  }
}
function stopAnimation() {
  if (timerId !== null) {
    window.clearTimeout(timerId);
    timerId = null;
  }
}
function playAnimation() {
  stopAnimation();
  setPhase("browse");
  // In automatic demo mode, each chip lights up briefly before GO! chooses coffee.
  // These are illustrative events only: no API or real enrollment is involved.
  if (prefersReducedMotion.matches) {
    setPhase("pick");
    return;
  }
  const browseOrder = ["run", "bike", "games"];
  const showNext = index => {
    if (index < browseOrder.length) {
      showEvent(browseOrder[index], true);
      timerId = window.setTimeout(() => showNext(index + 1), 700);
      return;
    }
    setPhase("pick");
    timerId = window.setTimeout(() => {
      setPhase("go");
      timerId = window.setTimeout(playAnimation, 3900);
    }, 2500);
  };
  timerId = window.setTimeout(() => showNext(0), 650);
}
categoryChips.forEach(chip => {
  chip.addEventListener("click", () => {
    stopAnimation();
    setPhase("pick");
    showEvent(chip.dataset.category, true);
  });
});
if (eventJoin) {
  eventJoin.addEventListener("click", () => {
    stopAnimation();
    const chosenCategory = currentCategory;
    setPhase("go");
    showEvent(chosenCategory, true);
    eventJoin.textContent = "GO! ✓";
  });
}
if (replay) replay.addEventListener("click", playAnimation);
if (stage) playAnimation();
prefersReducedMotion.addEventListener?.("change", playAnimation);

// 4. External-test link becomes visible only after configuring a valid HTTPS URL.
// All config values are public by design: do NOT store tokens/passwords here.
const settings = window.GO_CONFIG || {};
const joinTests = document.getElementById("join-tests");
const testStatus = document.getElementById("test-status");
const testInfo = document.getElementById("test-info");
let safeTestUrl = null;
try {
  const url = new URL(settings.testUrl);
  if (url.protocol === "https:" && url.hostname) safeTestUrl = url.href;
} catch (_) {
  // Empty URL is expected while tests are closed.
}
if (settings.testsOpen === true && safeTestUrl && joinTests) {
  joinTests.href = safeTestUrl;
  joinTests.target = "_blank";
  joinTests.rel = "noopener noreferrer";
  joinTests.hidden = false;
  if (testStatus) testStatus.textContent = "Testy otwarte";
  if (testInfo) testInfo.textContent = "Aplikacja na Androida. Otwórz link i postępuj zgodnie z instrukcją dołączenia.";
}
