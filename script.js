const TXT = {
  ru: { kicker: "Сейчас в кинотеатре", seasons: "Сезоны и серии", season: "Сезон", ep: "серия", min: "мин", left: "Осталось", cont: "Продолжить просмотр", start: "Смотреть с начала", trailer: "Трейлер сезона", trailerOf: "Трейлер", next: "Следующая серия", quality: "Качество", speed: "Скорость", normal: "Обычная", empty: "Видео пока не добавлено. Вставь ссылку в episodes.js.", seen: "Просмотрено", skip: "Пропустить заставку", upnext: "Дальше", now: "Смотреть сейчас", cancel: "Отмена" },
  en: { kicker: "Now showing", seasons: "Seasons and episodes", season: "Season", ep: "episode", min: "min", left: "Left", cont: "Continue watching", start: "Watch from start", trailer: "Season trailer", trailerOf: "Trailer", next: "Next episode", quality: "Quality", speed: "Speed", normal: "Normal", empty: "No video yet. Add a link in episodes.js.", seen: "Watched", skip: "Skip intro", upnext: "Up next", now: "Watch now", cancel: "Cancel" }
};
const IC = {
  play: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
  pause: '<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>',
  vol: '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4z"/></svg>',
  mute: '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9zm12.6 3l2.7-2.7-1.4-1.4-2.7 2.7-2.7-2.7-1.4 1.4 2.7 2.7-2.7 2.7 1.4 1.4 2.7-2.7 2.7 2.7 1.4-1.4z"/></svg>',
  gear: '<svg viewBox="0 0 24 24"><path d="M19.4 13a7.6 7.6 0 0 0 0-2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-1.7-1L15 3h-4l-.4 3a7 7 0 0 0-1.7 1l-2.4-1-2 3.4L6.6 11a7.6 7.6 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 1.7 1l.4 3h4l.4-3a7 7 0 0 0 1.7-1l2.4 1 2-3.4zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"/></svg>',
  fs: '<svg viewBox="0 0 24 24"><path d="M4 9V4h5v2H6v3zm10-5h5v5h-2V6h-3zM6 15v3h3v2H4v-5zm13 0v5h-5v-2h3v-3z"/></svg>'
};
const $ = id => document.getElementById(id);
const v = $("video");
const store = {
  get(k, d) { try { const x = localStorage.getItem(k); return x ? JSON.parse(x) : d; } catch (e) { return d; } },
  set(k, x) { try { localStorage.setItem(k, JSON.stringify(x)); } catch (e) {} }
};
let lang = store.get("lang", "ru") === "en" ? "en" : "ru";
let season = 0, active = null, lastSave = 0, upRaf = 0, hideT = 0, menuOpen = false, rate = 1, dragging = false, wasIdle = false;
let UP_MS = 8000;
let prog = store.get("progress", {});
const L = () => TXT[lang];
const tr = o => (typeof o === "string" ? o : (o && (o[lang] || o.ru)) || "");
const id = (s, i) => s + "-" + i;
const watched = p => !!(p && p.d && p.t / p.d > 0.95);
const started = p => !!(p && p.d && p.t > 5);
const fmt = s => { s = Math.max(0, Math.floor(s || 0)); const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), r = s % 60; return (h ? h + ":" + String(m).padStart(2, "0") : m) + ":" + String(r).padStart(2, "0"); };
const leftText = p => (p && p.d ? L().left + " " + Math.max(1, Math.ceil((p.d - p.t) / 60)) + " " + L().min : "");

function nextOf(s, i) {
  if (SEASONS[s].episodes[i + 1]) return { s, i: i + 1 };
  for (let k = s + 1; k < SEASONS.length; k++) if (SEASONS[k].episodes.length) return { s: k, i: 0 };
  return null;
}
function sourcesOf(video) {
  const seen = new Set(), out = [];
  Object.entries(video || {}).filter(([, u]) => u).sort((a, b) => b[0] - a[0]).forEach(([k, u]) => { if (!seen.has(u)) { seen.add(u); out.push([k, u]); } });
  return out;
}
function resumeTarget() {
  const l = store.get("last", null);
  if (!l || !SEASONS[l.s] || !SEASONS[l.s].episodes[l.i]) return { s: 0, i: 0, fresh: true, p: null };
  const p = prog[id(l.s, l.i)];
  if (watched(p)) {
    const n = nextOf(l.s, l.i);
    if (n) return { s: n.s, i: n.i, fresh: false, p: prog[id(n.s, n.i)] };
  }
  return { s: l.s, i: l.i, fresh: false, p };
}

function render() {
  document.documentElement.lang = lang;
  document.title = SITE_TITLE;
  $("logo").textContent = SITE_TITLE;
  $("lang").textContent = lang === "ru" ? "EN" : "RU";
  $("kicker").textContent = L().kicker;
  $("heroTitle").textContent = tr(SERIES_TITLE);
  $("heroText").textContent = tr(SERIES_DESC);
  $("seasonsHead").textContent = L().seasons;
  $("trailerBtn").textContent = L().trailer;
  $("trailerBtn").hidden = !SEASONS[season].trailer;
  $("next").textContent = L().next;
  $("empty").textContent = L().empty;
  $("skip").textContent = L().skip;
  $("unLabel").textContent = L().upnext;
  $("unNow").textContent = L().now;
  $("unCancel").textContent = L().cancel;

  const r = resumeTarget();
  const label = r.fresh ? L().start : L().cont;
  const info = r.fresh ? "" : L().season + " " + (r.s + 1) + " · " + (r.i + 1) + " " + L().ep + (started(r.p) ? " · " + leftText(r.p) : "");
  $("continueBtn").textContent = label;
  $("dockBtn").textContent = label;
  $("resumeInfo").textContent = info;
  $("dockInfo").textContent = info;
  $("rbar").hidden = !started(r.p);
  if (started(r.p)) $("rbar").firstChild.style.width = Math.min(100, r.p.t / r.p.d * 100) + "%";

  $("seasons").replaceChildren(...SEASONS.map((s, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = L().season + " " + (i + 1);
    b.setAttribute("aria-pressed", i === season);
    b.onclick = () => { season = i; render(); };
    return b;
  }));

  $("grid").replaceChildren(...SEASONS[season].episodes.map((e, i) => {
    const p = prog[id(season, i)];
    const c = document.createElement("div");
    c.className = "card";
    c.tabIndex = 0;
    c.style.animationDelay = i * 60 + "ms";
    const th = document.createElement("div");
    th.className = "thumb";
    if (e.poster) th.style.backgroundImage = 'url("' + e.poster + '")';
    const num = document.createElement("span");
    num.className = "num";
    num.textContent = i + 1;
    const meta = document.createElement("span");
    meta.className = "meta";
    const mins = p && p.d ? Math.ceil(p.d / 60) : Math.ceil(e.minutes || 0);
    meta.textContent = watched(p) ? L().seen : started(p) ? leftText(p) : (mins ? mins + " " + L().min : "");
    th.append(num, meta);
    if (started(p)) {
      const bar = document.createElement("div");
      bar.className = "bar";
      const fill = document.createElement("i");
      fill.style.width = Math.min(100, p.t / p.d * 100) + "%";
      bar.append(fill);
      th.append(bar);
    }
    const h = document.createElement("h3");
    h.textContent = (i + 1) + " " + L().ep + ": " + tr(e.title);
    const d = document.createElement("p");
    d.textContent = tr(e.desc);
    c.append(th, h, d);
    const go = () => playEpisode(season, i);
    c.onclick = go;
    c.onkeydown = ev => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); go(); } };
    return c;
  }));
}

function openPlayer(o) {
  if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  saveProgress(true);
  hideUpNext();
  closeMenu();
  active = o;
  o.ready = false;
  rate = 1;
  document.body.style.overflow = "hidden";
  $("player").hidden = false;
  $("pTitle").textContent = o.title;
  o.srcs = sourcesOf(o.sources);
  $("empty").hidden = o.srcs.length > 0;
  $("next").hidden = !o.next;
  $("skip").hidden = true;
  v.pause();
  if (!o.srcs.length) { v.removeAttribute("src"); v.load(); updateUI(); poke(); return; }
  o.cur = o.srcs[0][1];
  const sv = o.id && prog[o.id];
  o.resumeAt = sv && sv.d && sv.t > 2 && sv.t < sv.d - 5 ? sv.t : 0;
  v.src = o.cur;
  v.play().catch(() => {});
  poke();
}

function playEpisode(s, i) {
  const e = SEASONS[s].episodes[i];
  const n = nextOf(s, i);
  season = s;
  store.set("last", { s, i });
  openPlayer({
    id: id(s, i),
    title: L().season + " " + (s + 1) + ": " + (i + 1) + " " + L().ep,
    sources: e.video,
    intro: e.intro || SEASONS[s].intro || null,
    nextInfo: n,
    next: n ? () => playEpisode(n.s, n.i) : null
  });
}

function playTrailer() {
  const t = SEASONS[season].trailer;
  openPlayer({ title: L().trailerOf + ": " + L().season + " " + (season + 1), sources: typeof t === "string" ? { auto: t } : t });
}

function saveProgress(force) {
  if (!active || !active.id || !active.ready || !v.duration || !isFinite(v.duration)) return;
  const now = Date.now();
  if (!force && now - lastSave < 2500) return;
  lastSave = now;
  prog[active.id] = { t: v.currentTime, d: v.duration };
  store.set("progress", prog);
}

function closePlayer() {
  saveProgress(true);
  hideUpNext();
  closeMenu();
  v.pause();
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  v.removeAttribute("src");
  v.load();
  $("player").hidden = true;
  document.body.style.overflow = "";
  active = null;
  render();
}

function showUpNext(n) {
  const e = SEASONS[n.s].episodes[n.i];
  $("unTitle").textContent = L().season + " " + (n.s + 1) + " · " + (n.i + 1) + " " + L().ep + ": " + tr(e.title);
  $("unBar").style.width = "0";
  $("upnext").hidden = false;
  $("skip").hidden = true;
  const t0 = performance.now();
  const tick = now => {
    const k = Math.min(1, (now - t0) / UP_MS);
    $("unBar").style.width = k * 100 + "%";
    if (k >= 1) { $("upnext").hidden = true; playEpisode(n.s, n.i); }
    else upRaf = requestAnimationFrame(tick);
  };
  upRaf = requestAnimationFrame(tick);
}
function hideUpNext() { cancelAnimationFrame(upRaf); $("upnext").hidden = true; }

function updateUI() {
  const d = v.duration || 0, t = v.currentTime || 0, k = d ? t / d : 0;
  $("fill").style.width = k * 100 + "%";
  $("knob").style.left = k * 100 + "%";
  $("time").textContent = fmt(t) + " / " + fmt(d);
  let b = 0;
  try { for (let i = 0; i < v.buffered.length; i++) if (v.buffered.start(i) <= t && t <= v.buffered.end(i) + 0.5) b = v.buffered.end(i); } catch (e) {}
  $("buf").style.width = d ? b / d * 100 + "%" : "0";
}
function checkSkip() {
  const a = active;
  if (!a || !a.intro || !$("upnext").hidden) { $("skip").hidden = true; return; }
  const t = v.currentTime;
  $("skip").hidden = !(t >= (a.intro.start || 0) && t < a.intro.end - 0.3);
}
function syncPP() {
  $("pp").innerHTML = v.paused ? IC.play : IC.pause;
  $("pp").setAttribute("aria-label", v.paused ? "Play" : "Pause");
}
function syncVol() {
  $("mute").innerHTML = v.muted || v.volume === 0 ? IC.mute : IC.vol;
  $("vol").value = v.muted ? 0 : v.volume;
}
function poke() {
  const p = $("player");
  p.classList.remove("idle");
  clearTimeout(hideT);
  if (!v.paused && !menuOpen) hideT = setTimeout(() => p.classList.add("idle"), 2800);
}
const toggle = () => { if (v.paused) v.play().catch(() => {}); else v.pause(); };
const skipBy = s => { if (v.duration) v.currentTime = Math.min(v.duration, Math.max(0, v.currentTime + s)); updateUI(); };
function toggleFS() {
  const p = $("player");
  if (document.fullscreenElement || document.webkitFullscreenElement) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
  else if (p.requestFullscreen) p.requestFullscreen().catch(() => {});
  else if (p.webkitRequestFullscreen) p.webkitRequestFullscreen();
  else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
}
function switchSrc(u) {
  if (!active) return;
  const t = v.currentTime, was = !v.paused;
  active.cur = u; active.resumeAt = t; active.ready = false;
  v.src = u;
  if (was) v.play().catch(() => {});
}
function closeMenu() { $("qmenu").hidden = true; menuOpen = false; }
function openMenu() {
  const m = $("qmenu"), a = active;
  m.replaceChildren();
  const add = (title, items) => {
    const h = document.createElement("div");
    h.className = "mh";
    h.textContent = title;
    m.append(h);
    items.forEach(([label, on, fn]) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = label;
      if (on) b.className = "on";
      b.onclick = () => { fn(); closeMenu(); poke(); };
      m.append(b);
    });
  };
  if (a && a.srcs && a.srcs.length > 1) add(L().quality, a.srcs.map(([k, u]) => [isNaN(k) ? k : k + "p", u === a.cur, () => switchSrc(u)]));
  add(L().speed, [0.75, 1, 1.25, 1.5].map(r => [r === 1 ? L().normal : r + "x", rate === r, () => { rate = r; v.playbackRate = r; }]));
  m.hidden = false;
  menuOpen = true;
  poke();
}

v.addEventListener("loadedmetadata", () => {
  if (!active) return;
  if (active.resumeAt) { try { v.currentTime = active.resumeAt; } catch (e) {} active.resumeAt = 0; }
  v.playbackRate = rate;
  active.ready = true;
  updateUI();
});
v.addEventListener("timeupdate", () => { saveProgress(false); updateUI(); checkSkip(); });
v.addEventListener("progress", updateUI);
v.addEventListener("durationchange", updateUI);
v.addEventListener("play", () => { syncPP(); poke(); });
v.addEventListener("pause", () => { saveProgress(true); syncPP(); poke(); });
v.addEventListener("volumechange", syncVol);
v.addEventListener("ended", () => {
  if (!active) return;
  if (active.id && active.ready) { prog[active.id] = { t: v.duration, d: v.duration }; store.set("progress", prog); }
  $("player").classList.remove("idle");
  if (active.nextInfo) showUpNext(active.nextInfo);
});
v.addEventListener("click", () => { if (wasIdle && matchMedia("(pointer:coarse)").matches) return; toggle(); });
v.addEventListener("dblclick", toggleFS);

const pl = $("player");
pl.addEventListener("pointerdown", () => { wasIdle = pl.classList.contains("idle"); }, true);
["mousemove", "pointerdown", "touchstart"].forEach(ev => pl.addEventListener(ev, poke, { passive: true }));
$("ctrl").addEventListener("mousedown", e => { if (e.target.closest("button")) e.preventDefault(); });

const seek = $("seek");
function seekAt(ev) {
  const r = seek.getBoundingClientRect();
  const k = Math.min(1, Math.max(0, (ev.clientX - r.left) / r.width));
  if (v.duration) v.currentTime = k * v.duration;
  updateUI();
}
seek.addEventListener("pointerdown", ev => { dragging = true; seek.classList.add("drag"); seek.setPointerCapture(ev.pointerId); seekAt(ev); });
seek.addEventListener("pointermove", ev => {
  if (dragging) seekAt(ev);
  const r = seek.getBoundingClientRect();
  const k = Math.min(1, Math.max(0, (ev.clientX - r.left) / r.width));
  $("tip").hidden = !v.duration;
  $("tip").style.left = k * 100 + "%";
  $("tip").textContent = fmt(k * (v.duration || 0));
});
seek.addEventListener("pointerup", () => { dragging = false; seek.classList.remove("drag"); });
seek.addEventListener("pointerleave", () => { $("tip").hidden = true; });

$("pp").onclick = toggle;
$("b10").onclick = () => skipBy(-10);
$("f10").onclick = () => skipBy(10);
$("mute").onclick = () => { v.muted = !v.muted; };
$("vol").oninput = () => { v.volume = +$("vol").value; v.muted = v.volume === 0; };
$("fs").onclick = toggleFS;
$("gear").onclick = () => { if (menuOpen) { closeMenu(); poke(); } else openMenu(); };
$("next").onclick = () => active && active.next && active.next();
$("skip").onclick = () => { if (active && active.intro) { v.currentTime = active.intro.end; $("skip").hidden = true; } };
$("unNow").onclick = () => { const n = active && active.nextInfo; if (n) playEpisode(n.s, n.i); };
$("unCancel").onclick = hideUpNext;
$("back").onclick = closePlayer;

document.addEventListener("keydown", e => {
  if ($("player").hidden) return;
  const k = e.key;
  if (k === "Escape") { if (menuOpen) closeMenu(); else if (!$("upnext").hidden) hideUpNext(); else closePlayer(); return; }
  if (e.target.tagName === "INPUT" || (e.target.tagName === "BUTTON" && e.target.closest("#player") && (k === " " || k === "Enter"))) return;
  if (k === " " || k === "k") { e.preventDefault(); toggle(); }
  else if (k === "ArrowRight") { e.preventDefault(); skipBy(10); }
  else if (k === "ArrowLeft") { e.preventDefault(); skipBy(-10); }
  else if (k === "f") toggleFS();
  else if (k === "m") v.muted = !v.muted;
  poke();
});
window.addEventListener("pagehide", () => saveProgress(true));
document.addEventListener("visibilitychange", () => { if (document.hidden) saveProgress(true); });

$("lang").onclick = () => { lang = lang === "ru" ? "en" : "ru"; store.set("lang", lang); render(); };
const cont = () => { const r = resumeTarget(); playEpisode(r.s, r.i); };
$("continueBtn").onclick = cont;
$("dockBtn").onclick = cont;
$("trailerBtn").onclick = playTrailer;
if ("IntersectionObserver" in window) new IntersectionObserver(([en]) => $("dock").classList.toggle("show", !en.isIntersecting), { threshold: 0 }).observe($("heroActions"));
$("pp").innerHTML = IC.play; $("gear").innerHTML = IC.gear; $("fs").innerHTML = IC.fs; syncVol();
render();
