const TXT = {
  ru: { kicker: "Сейчас в кинотеатре", seasons: "Сезоны и серии", season: "Сезон", ep: "серия", min: "мин", cont: "Продолжить просмотр", start: "Смотреть с начала", trailer: "Трейлер сезона", trailerOf: "Трейлер", next: "Следующая серия", quality: "Качество", empty: "Видео пока не добавлено. Вставь ссылку в episodes.js.", seen: "Просмотрено" },
  en: { kicker: "Now showing", seasons: "Seasons and episodes", season: "Season", ep: "episode", min: "min", cont: "Continue watching", start: "Watch from start", trailer: "Season trailer", trailerOf: "Trailer", next: "Next episode", quality: "Quality", empty: "No video yet. Add a link in episodes.js.", seen: "Watched" }
};
const $ = id => document.getElementById(id);
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
let lang = store.get("lang", "ru") === "en" ? "en" : "ru";
let season = 0, active = null, lastSave = 0;
let prog = store.get("progress", {});
const L = () => TXT[lang];
const tr = o => (typeof o === "string" ? o : (o && (o[lang] || o.ru)) || "");
const id = (s, i) => s + "-" + i;
const watched = p => p && p.d && p.t / p.d > 0.95;

function render() {
  document.documentElement.lang = lang;
  document.title = SITE_TITLE;
  $("logo").textContent = SITE_TITLE;
  $("lang").textContent = lang === "ru" ? "EN" : "RU";
  $("kicker").textContent = L().kicker;
  $("heroTitle").textContent = tr(SERIES_TITLE);
  $("heroText").textContent = tr(SERIES_DESC);
  $("seasonsHead").textContent = L().seasons;
  $("continueBtn").textContent = store.get("last", null) ? L().cont : L().start;
  $("trailerBtn").textContent = L().trailer;
  $("trailerBtn").hidden = !SEASONS[season].trailer;
  $("next").textContent = L().next;
  $("qLabel").textContent = L().quality;
  $("empty").textContent = L().empty;

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
    const num = document.createElement("b");
    num.textContent = i + 1;
    const info = document.createElement("span");
    const mins = p && p.d ? Math.ceil(p.d / 60) : e.minutes;
    info.textContent = watched(p) ? L().seen : (mins ? mins + " " + L().min : "");
    th.append(num, info);
    if (p && p.d && p.t > 5) {
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
  const v = $("video"), q = $("quality");
  active = o;
  document.body.style.overflow = "hidden";
  $("player").hidden = false;
  $("pTitle").textContent = o.title;
  const srcs = Object.entries(o.sources || {}).filter(([, u]) => u).sort((a, b) => b[0] - a[0]);
  q.replaceChildren(...srcs.map(([k, u]) => new Option(isNaN(k) ? k : k + "p", u)));
  $("qWrap").hidden = srcs.length < 2;
  $("empty").hidden = srcs.length > 0;
  v.hidden = srcs.length === 0;
  $("next").hidden = !o.next;
  v.pause();
  if (!srcs.length) { v.removeAttribute("src"); return; }
  const saved = o.id && prog[o.id];
  o.resumeAt = saved && saved.d && saved.t < saved.d - 5 ? saved.t : 0;
  v.src = srcs[0][1];
  v.play().catch(() => {});
}

function playEpisode(s, i) {
  const e = SEASONS[s].episodes[i];
  const hasNext = SEASONS[s].episodes[i + 1];
  store.set("last", { s, i });
  openPlayer({
    id: id(s, i),
    title: L().season + " " + (s + 1) + ": " + (i + 1) + " " + L().ep,
    sources: e.video,
    next: hasNext ? () => playEpisode(s, i + 1) : null
  });
}

function playTrailer() {
  const t = SEASONS[season].trailer;
  openPlayer({ title: L().trailerOf + ": " + L().season + " " + (season + 1), sources: typeof t === "string" ? { auto: t } : t });
}

function saveProgress(force) {
  const v = $("video");
  if (!active || !active.id || !v.duration || isNaN(v.duration)) return;
  const now = Date.now();
  if (!force && now - lastSave < 3000) return;
  lastSave = now;
  prog[active.id] = { t: v.currentTime, d: v.duration };
  store.set("progress", prog);
}

function closePlayer() {
  saveProgress(true);
  $("video").pause();
  $("video").removeAttribute("src");
  $("video").load();
  $("player").hidden = true;
  document.body.style.overflow = "";
  active = null;
  render();
}

$("video").addEventListener("loadedmetadata", () => {
  const v = $("video");
  if (active && active.resumeAt) { v.currentTime = active.resumeAt; active.resumeAt = 0; }
  saveProgress(true);
});
$("video").addEventListener("timeupdate", () => saveProgress(false));
$("video").addEventListener("ended", () => {
  const v = $("video");
  if (active && active.id) { prog[active.id] = { t: v.duration, d: v.duration }; store.set("progress", prog); }
  if (active && active.next) active.next();
});
$("quality").onchange = () => {
  const v = $("video"), t = v.currentTime;
  if (active) active.resumeAt = t;
  v.src = $("quality").value;
  v.play().catch(() => {});
};
$("back").onclick = closePlayer;
$("next").onclick = () => active && active.next && active.next();
document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("player").hidden) closePlayer(); });
window.addEventListener("pagehide", () => saveProgress(true));
$("lang").onclick = () => { lang = lang === "ru" ? "en" : "ru"; store.set("lang", lang); render(); };
$("continueBtn").onclick = () => { const l = store.get("last", { s: 0, i: 0 }); season = SEASONS[l.s] ? l.s : 0; playEpisode(season, SEASONS[season].episodes[l.i] ? l.i : 0); };
$("trailerBtn").onclick = playTrailer;
render();
