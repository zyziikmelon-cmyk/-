const TXT = {
  ru: { home: "Главная", series: "Сериалы", movies: "Фильмы", favorites: "Любимое", search: "Поиск", settings: "Настройки", kicker: "Сейчас в кинотеатре", kSeries: "Сериал", kMovie: "Фильм", season: "Сезон", seasonsN: "сез.", ep: "серия", min: "мин", left: "Осталось", seen: "Просмотрено",
    cont: "Продолжить просмотр", favRow: "Любимое", topRow: "Топ", allRow: "Все по новизне", play: "Смотреть", resume: "Продолжить", more: "Подробнее", addFav: "В любимое", inFav: "В любимом", trailer: "Трейлер сезона", trailerOf: "Трейлер", seasons: "Сезоны и серии",
    noFav: "Здесь появятся сериалы и фильмы, которые ты отметишь сердечком.", noFind: "Ничего не найдено.", noList: "Пока здесь пусто.", added: "Добавлено в любимое", removed: "Убрано из любимого",
    sLang: "Язык", sQuality: "Качество по умолчанию", sQHint: "Если такого качества у видео нет, выберется ближайшее.", qMax: "Максимальное", sNext: "Автозапуск следующей серии", sSkip: "Пропускать заставку автоматически", sBackup: "Резервная копия", sBHint: "Любимое и прогресс хранятся в этом браузере. Скопируй код и вставь его на другом устройстве.", exp: "Копировать", imp: "Вставить", sReset: "История просмотра", reset: "Очистить", sure: "Очистить историю просмотра?", copied: "Код скопирован", copyThis: "Скопируй код:", pasteIt: "Вставь код:", done: "Готово", bad: "Код не подошёл",
    next: "Следующая серия", quality: "Качество", speed: "Скорость", normal: "Обычная", empty: "Видео пока не добавлено. Вставь ссылку в episodes.js или catalog.js.", skip: "Пропустить заставку", upnext: "Дальше", now: "Смотреть сейчас", cancel: "Отмена" },
  en: { home: "Home", series: "Series", movies: "Movies", favorites: "Favorites", search: "Search", settings: "Settings", kicker: "Now showing", kSeries: "Series", kMovie: "Movie", season: "Season", seasonsN: "seasons", ep: "episode", min: "min", left: "Left", seen: "Watched",
    cont: "Continue watching", favRow: "Favorites", topRow: "Top", allRow: "All by newest", play: "Watch", resume: "Continue", more: "Details", addFav: "Favorite", inFav: "In favorites", trailer: "Season trailer", trailerOf: "Trailer", seasons: "Seasons and episodes",
    noFav: "Series and movies you mark with a heart will appear here.", noFind: "Nothing found.", noList: "Nothing here yet.", added: "Added to favorites", removed: "Removed from favorites",
    sLang: "Language", sQuality: "Default quality", sQHint: "If a video lacks this quality, the closest one is used.", qMax: "Maximum", sNext: "Autoplay next episode", sSkip: "Skip intro automatically", sBackup: "Backup", sBHint: "Favorites and progress are stored in this browser. Copy the code and paste it on another device.", exp: "Copy", imp: "Paste", sReset: "Watch history", reset: "Clear", sure: "Clear watch history?", copied: "Code copied", copyThis: "Copy the code:", pasteIt: "Paste the code:", done: "Done", bad: "Invalid code",
    next: "Next episode", quality: "Quality", speed: "Speed", normal: "Normal", empty: "No video yet. Add a link in episodes.js or catalog.js.", skip: "Skip intro", upnext: "Up next", now: "Watch now", cancel: "Cancel" }
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
function h(tag, props, ...kids) {
  const e = document.createElement(tag);
  for (const k in (props || {})) {
    if (k === "class") e.className = props[k];
    else if (k.slice(0, 2) === "on") e[k] = props[k];
    else e.setAttribute(k, props[k]);
  }
  kids.flat(2).forEach(c => { if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(c)); });
  return e;
}

/* ---------- каталог ---------- */
const META = typeof MAIN_META !== "undefined" ? MAIN_META : {};
const EXTRA = typeof EXTRA_TITLES !== "undefined" ? EXTRA_TITLES : [];
const firstPoster = ss => { for (const s of ss) for (const e of s.episodes) if (e.poster) return e.poster; return ""; };
const TITLES = [Object.assign({ id: "main", kind: "series", title: SERIES_TITLE, desc: SERIES_DESC, genre: { ru: "Сериал", en: "Series" }, year: 2026, added: "2026-11-04", poster: firstPoster(SEASONS), seasons: SEASONS }, META)]
  .concat(EXTRA.map(t => {
    const x = Object.assign({ genre: "", year: "", added: "2000-01-01" }, t);
    if (t.video) { x.kind = "movie"; x.seasons = [{ trailer: t.trailer || "", episodes: [{ title: t.title, desc: t.desc, video: t.video, intro: t.intro, poster: t.poster, minutes: t.minutes }] }]; }
    else x.kind = "series";
    if (!x.poster) x.poster = firstPoster(x.seasons);
    return x;
  }));
const T = id => TITLES.find(t => t.id === id);

/* ---------- состояние ---------- */
let lang = store.get("lang", "ru") === "en" ? "en" : "ru";
let fav = store.get("fav", []);
let prog = store.get("progress", {});
let lasts = store.get("lasts", null);
if (!lasts) { lasts = {}; const l = store.get("last", null); if (l) lasts.main = { s: l.s, i: l.i, ts: Date.now() }; }
let cfg = Object.assign({ quality: "max", autonext: true, autoskip: false }, store.get("cfg", {}));
let active = null, lastSave = 0, upRaf = 0, hideT = 0, menuOpen = false, rate = 1, dragging = false, wasIdle = false, tSeason = 0, lastTitle = "";
let UP_MS = 8000;
const saveAll = () => { store.set("fav", fav); store.set("progress", prog); store.set("lasts", lasts); store.set("cfg", cfg); };
const L = () => TXT[lang];
const tr = o => (typeof o === "string" ? o : (o && (o[lang] || o.ru)) || "");
const pk = (tid, s, i) => (tid === "main" ? "" : tid + ":") + s + "-" + i;
const watched = p => !!(p && p.d && p.t / p.d > 0.95);
const started = p => !!(p && p.d && p.t > 5);
const fmt = s => { s = Math.max(0, Math.floor(s || 0)); const hh = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), r = s % 60; return (hh ? hh + ":" + String(m).padStart(2, "0") : m) + ":" + String(r).padStart(2, "0"); };
const leftText = p => (p && p.d ? L().left + " " + Math.max(1, Math.ceil((p.d - p.t) / 60)) + " " + L().min : "");
function toast(m) { const t = $("toast"); t.textContent = m; t.classList.add("show"); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 2200); }

function nextOf(t, s, i) {
  if (t.seasons[s].episodes[i + 1]) return { s, i: i + 1 };
  for (let k = s + 1; k < t.seasons.length; k++) if (t.seasons[k].episodes.length) return { s: k, i: 0 };
  return null;
}
function sourcesOf(video) {
  const seen = new Set(), out = [];
  Object.entries(video || {}).filter(([, u]) => u).sort((a, b) => b[0] - a[0]).forEach(([k, u]) => { if (!seen.has(u)) { seen.add(u); out.push([k, u]); } });
  return out;
}
function pickSrc(srcs) {
  if (cfg.quality === "max" || srcs.length < 2) return srcs[0][1];
  const f = srcs.find(([k]) => +k <= +cfg.quality);
  return (f || srcs[srcs.length - 1])[1];
}
function resumeFor(tid) {
  const t = T(tid), l = lasts[tid];
  if (!l || !t.seasons[l.s] || !t.seasons[l.s].episodes[l.i]) return { s: 0, i: 0, fresh: true, p: null };
  const p = prog[pk(tid, l.s, l.i)];
  if (watched(p)) {
    const n = nextOf(t, l.s, l.i);
    if (n) return { s: n.s, i: n.i, fresh: false, p: prog[pk(tid, n.s, n.i)] };
    return { s: 0, i: 0, fresh: true, p: null };
  }
  return { s: l.s, i: l.i, fresh: false, p };
}
function resumeLine(t) {
  const r = resumeFor(t.id);
  const where = t.kind === "movie" ? "" : L().season + " " + (r.s + 1) + " · " + (r.i + 1) + " " + L().ep;
  return [where, started(r.p) ? leftText(r.p) : ""].filter(Boolean).join(" · ");
}
function toggleFav(id) {
  const k = fav.indexOf(id);
  if (k < 0) fav.push(id); else fav.splice(k, 1);
  saveAll();
  toast(k < 0 ? L().added : L().removed);
}

/* ---------- элементы ---------- */
function mkThumb(o) {
  const th = h("div", { class: "thumb" });
  if (o.poster) th.style.backgroundImage = 'url("' + o.poster + '")';
  if (o.badge) th.append(h("span", { class: "num" }, o.badge));
  if (o.rank) th.append(h("span", { class: "rank" }, o.rank));
  if (o.meta) th.append(h("span", { class: "meta" }, o.meta));
  if (started(o.p)) th.append(h("div", { class: "bar" }, h("i", { style: "width:" + Math.min(100, o.p.t / o.p.d * 100) + "%" })));
  return th;
}
function card(th, title, sub, fn, delay) {
  const c = h("div", { class: "card", tabindex: 0, onclick: fn, onkeydown: e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(); } } }, th, h("h3", null, title), sub ? h("p", null, sub) : null);
  c.style.animationDelay = (delay || 0) + "ms";
  return c;
}
const kindLabel = t => (t.kind === "movie" ? L().kMovie : L().kSeries);
const titleCard = (t, o = {}) => card(mkThumb({ poster: t.poster, badge: kindLabel(t), rank: o.rank }), tr(t.title), [t.year, tr(t.genre)].filter(Boolean).join(" · "), () => go("title-" + t.id));
function contCard(t) {
  const r = resumeFor(t.id);
  return card(mkThumb({ poster: t.poster, badge: kindLabel(t), p: r.p, meta: started(r.p) ? leftText(r.p) : "" }), tr(t.title), resumeLine(t), () => playResume(t.id));
}
function epCard(t, si, i) {
  const e = t.seasons[si].episodes[i], p = prog[pk(t.id, si, i)];
  const mins = p && p.d ? Math.ceil(p.d / 60) : Math.ceil(e.minutes || 0);
  const meta = watched(p) ? L().seen : started(p) ? leftText(p) : (mins ? mins + " " + L().min : "");
  return card(mkThumb({ poster: e.poster || t.poster, badge: i + 1, p, meta }), (i + 1) + " " + L().ep + ": " + tr(e.title), tr(e.desc), () => playEpisode(t.id, si, i), i * 60);
}
const row = (title, cards, cls) => (cards.length ? h("section", { class: "row " + (cls || "") }, h("h2", null, title), h("div", { class: "scroller" }, cards)) : null);
const grid = list => h("div", { class: "grid" }, list);
const favBtn = t => { const on = fav.includes(t.id); return h("button", { class: "btn fav" + (on ? " on" : ""), type: "button", onclick: () => { toggleFav(t.id); render(); } }, (on ? "♥ " : "♡ ") + (on ? L().inFav : L().addFav)); };
function hero(t, detail) {
  const r = resumeFor(t.id), bg = h("div", { class: "hero-bg" });
  if (t.poster) bg.style.backgroundImage = 'url("' + t.poster + '")';
  const tr1 = detail && t.seasons[tSeason] && t.seasons[tSeason].trailer;
  return h("section", { class: "hero" }, bg, h("div", { class: "hero-in" },
    h("p", { class: "kicker" }, detail ? [kindLabel(t), t.year, tr(t.genre), t.kind === "series" ? t.seasons.length + " " + L().seasonsN : ""].filter(Boolean).join(" · ") : L().kicker),
    h("h1", null, tr(t.title)), h("p", { class: "lead" }, tr(t.desc)),
    h("div", { class: "actions" },
      h("button", { class: "btn main", type: "button", onclick: () => playResume(t.id) }, r.fresh ? L().play : L().resume),
      detail ? null : h("button", { class: "btn", type: "button", onclick: () => go("title-" + t.id) }, L().more),
      tr1 ? h("button", { class: "btn", type: "button", onclick: () => playTrailer(t.id) }, L().trailer) : null,
      favBtn(t)),
    r.fresh ? null : h("p", { class: "rinfo" }, resumeLine(t))));
}

/* ---------- страницы ---------- */
const byNew = list => [...list].sort((a, b) => String(b.added).localeCompare(String(a.added)));
function viewHome() {
  const tops = TITLES.filter(t => t.top).sort((a, b) => a.top - b.top);
  const feat = tops[0] || byNew(TITLES)[0];
  const cont = Object.keys(lasts).map(T).filter(t => t && !resumeFor(t.id).fresh).sort((a, b) => lasts[b.id].ts - lasts[a.id].ts);
  return [hero(feat), row(L().cont, cont.map(contCard)), row(L().favRow, fav.map(T).filter(Boolean).map(t => titleCard(t))),
    row(L().topRow, tops.map((t, i) => titleCard(t, { rank: i + 1 })), "top"),
    h("section", { class: "row" }, h("h2", null, L().allRow), grid(byNew(TITLES).map(t => titleCard(t))))];
}
function viewList(kind) {
  const list = byNew(TITLES.filter(t => t.kind === kind));
  return h("section", { class: "page" }, h("h2", null, kind === "movie" ? L().movies : L().series), list.length ? grid(list.map(t => titleCard(t))) : h("p", { class: "none" }, L().noList));
}
function viewFav() {
  const list = fav.map(T).filter(Boolean);
  return h("section", { class: "page" }, h("h2", null, L().favorites), list.length ? grid(list.map(t => titleCard(t))) : h("p", { class: "none" }, L().noFav));
}
function viewSearch() {
  const q = $("q").value.trim().toLowerCase();
  const res = TITLES.filter(t => [tr(t.title), tr(t.desc), tr(t.genre), t.year, kindLabel(t)].join(" ").toLowerCase().includes(q));
  return h("section", { class: "page" }, h("h2", null, L().search + ": " + $("q").value.trim()), res.length ? grid(res.map(t => titleCard(t))) : h("p", { class: "none" }, L().noFind));
}
function viewTitle(id) {
  const t = T(id);
  if (!t) return h("section", { class: "page" }, h("p", { class: "none" }, L().noList));
  if (lastTitle !== id) { tSeason = resumeFor(id).s; lastTitle = id; }
  if (!t.seasons[tSeason]) tSeason = 0;
  const out = [hero(t, true)];
  if (t.kind === "series") {
    out.push(h("section", { class: "page", style: "padding-top:0" }, h("h2", null, L().seasons),
      h("div", { class: "seasons" }, t.seasons.map((s, i) => h("button", { type: "button", "aria-pressed": i === tSeason, onclick: () => { tSeason = i; render(); } }, L().season + " " + (i + 1)))),
      grid(t.seasons[tSeason].episodes.map((e, i) => epCard(t, tSeason, i)))));
  }
  return out;
}
function viewSettings() {
  const sel = (opts, val, fn) => { const s = h("select", { onchange: () => fn(s.value) }, opts.map(([x, l]) => h("option", { value: x }, l))); s.value = val; return s; };
  const sw = k => { const b = h("button", { class: "sw", type: "button", role: "switch", "aria-checked": cfg[k], onclick: () => { cfg[k] = !cfg[k]; saveAll(); b.setAttribute("aria-checked", cfg[k]); } }, h("i")); return b; };
  const r = (l, sub, ctl) => h("div", { class: "srow" }, h("div", null, h("b", null, l), sub ? h("small", null, sub) : null), ctl);
  return h("section", { class: "page settings" }, h("h1", null, L().settings),
    r(L().sLang, null, sel([["ru", "Русский"], ["en", "English"]], lang, x => { lang = x; store.set("lang", lang); render(); })),
    r(L().sQuality, L().sQHint, sel([["max", L().qMax], ["720", "720p"], ["480", "480p"]], cfg.quality, x => { cfg.quality = x; saveAll(); })),
    r(L().sNext, null, sw("autonext")), r(L().sSkip, null, sw("autoskip")),
    r(L().sBackup, L().sBHint, h("div", { class: "btns" }, h("button", { class: "btn", type: "button", onclick: exportData }, L().exp), h("button", { class: "btn", type: "button", onclick: importData }, L().imp))),
    r(L().sReset, null, h("button", { class: "btn", type: "button", onclick: resetAll }, L().reset)));
}
function exportData() {
  const s = JSON.stringify({ fav, prog, lasts, cfg });
  (navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(s) : Promise.reject()).then(() => toast(L().copied), () => prompt(L().copyThis, s));
}
function importData() {
  const s = prompt(L().pasteIt);
  if (!s) return;
  try { const d = JSON.parse(s); fav = d.fav || []; prog = d.prog || {}; lasts = d.lasts || {}; Object.assign(cfg, d.cfg || {}); saveAll(); toast(L().done); render(); } catch (e) { toast(L().bad); }
}
function resetAll() { if (!confirm(L().sure)) return; prog = {}; lasts = {}; saveAll(); toast(L().done); render(); }

/* ---------- роутер ---------- */
const go = r => { location.hash = r; };
function route() { const x = location.hash.slice(1) || "home"; return x.indexOf("title-") === 0 ? ["title", x.slice(6)] : [x, null]; }
function render() {
  document.documentElement.lang = lang;
  document.title = SITE_TITLE;
  $("logo").textContent = SITE_TITLE;
  $("lang").textContent = lang === "ru" ? "EN" : "RU";
  $("q").placeholder = L().search;
  document.querySelectorAll("[data-k]").forEach(a => { a.textContent = L()[a.dataset.k]; });
  $("next").textContent = L().next; $("empty").textContent = L().empty; $("skip").textContent = L().skip;
  $("unLabel").textContent = L().upnext; $("unNow").textContent = L().now; $("unCancel").textContent = L().cancel;
  const [n, a] = route();
  const views = { home: viewHome, series: () => viewList("series"), movies: () => viewList("movie"), favorites: viewFav, settings: viewSettings, search: viewSearch, title: () => viewTitle(a) };
  $("app").replaceChildren(...[].concat((views[n] || viewHome)()).filter(Boolean));
  document.querySelectorAll("[data-r]").forEach(l => l.classList.toggle("on", l.dataset.r === n));
}

/* ---------- плеер ---------- */
function openPlayer(o) {
  if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  saveProgress(true);
  hideUpNext(); closeMenu();
  active = o; o.ready = false; rate = 1;
  document.body.style.overflow = "hidden";
  $("player").hidden = false;
  $("pTitle").textContent = o.title;
  o.srcs = sourcesOf(o.sources);
  $("empty").hidden = o.srcs.length > 0;
  $("next").hidden = !o.next;
  $("skip").hidden = true;
  v.pause();
  if (!o.srcs.length) { v.removeAttribute("src"); v.load(); updateUI(); poke(); return; }
  o.cur = pickSrc(o.srcs);
  const sv = o.id && prog[o.id];
  o.resumeAt = sv && sv.d && sv.t > 2 && sv.t < sv.d - 5 ? sv.t : 0;
  v.src = o.cur;
  v.play().catch(() => {});
  poke();
}
function playEpisode(tid, s, i) {
  const t = T(tid), e = t.seasons[s].episodes[i], n = nextOf(t, s, i);
  tSeason = s; lastTitle = tid;
  lasts[tid] = { s, i, ts: Date.now() };
  store.set("lasts", lasts);
  openPlayer({
    tid, id: pk(tid, s, i),
    title: tr(t.title) + (t.kind === "movie" ? "" : " · " + L().season + " " + (s + 1) + ": " + (i + 1) + " " + L().ep),
    sources: e.video,
    intro: e.intro || t.seasons[s].intro || null,
    nextInfo: n,
    next: n ? () => playEpisode(tid, n.s, n.i) : null
  });
}
function playResume(tid) { const r = resumeFor(tid); playEpisode(tid, r.s, r.i); }
function playTrailer(tid) {
  const t = T(tid), tl = t.seasons[tSeason].trailer;
  openPlayer({ tid, title: L().trailerOf + ": " + tr(t.title), sources: typeof tl === "string" ? { auto: tl } : tl });
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
  saveProgress(true); hideUpNext(); closeMenu(); v.pause();
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  v.removeAttribute("src"); v.load();
  $("player").hidden = true;
  document.body.style.overflow = "";
  active = null;
  render();
}
function showUpNext(n) {
  const t = T(active.tid), e = t.seasons[n.s].episodes[n.i];
  $("unTitle").textContent = L().season + " " + (n.s + 1) + " · " + (n.i + 1) + " " + L().ep + ": " + tr(e.title);
  $("unBar").style.width = "0";
  $("upnext").hidden = false; $("skip").hidden = true;
  const tid = active.tid, t0 = performance.now();
  const tick = now => {
    const k = Math.min(1, (now - t0) / UP_MS);
    $("unBar").style.width = k * 100 + "%";
    if (k >= 1) { $("upnext").hidden = true; playEpisode(tid, n.s, n.i); } else upRaf = requestAnimationFrame(tick);
  };
  upRaf = requestAnimationFrame(tick);
}
function hideUpNext() { cancelAnimationFrame(upRaf); $("upnext").hidden = true; }
function updateUI() {
  const d = v.duration || 0, t = v.currentTime || 0, k = d ? t / d : 0;
  $("fill").style.width = k * 100 + "%"; $("knob").style.left = k * 100 + "%";
  $("time").textContent = fmt(t) + " / " + fmt(d);
  let b = 0;
  try { for (let i = 0; i < v.buffered.length; i++) if (v.buffered.start(i) <= t && t <= v.buffered.end(i) + 0.5) b = v.buffered.end(i); } catch (e) {}
  $("buf").style.width = d ? b / d * 100 + "%" : "0";
}
function checkSkip() {
  const a = active;
  if (!a || !a.intro || !$("upnext").hidden) { $("skip").hidden = true; return; }
  const t = v.currentTime, inI = t >= (a.intro.start || 0) && t < a.intro.end - 0.3;
  if (inI && cfg.autoskip && !a.skipped) { a.skipped = true; v.currentTime = a.intro.end; $("skip").hidden = true; return; }
  $("skip").hidden = !inI;
}
function syncPP() { $("pp").innerHTML = v.paused ? IC.play : IC.pause; $("pp").setAttribute("aria-label", v.paused ? "Play" : "Pause"); }
function syncVol() { $("mute").innerHTML = v.muted || v.volume === 0 ? IC.mute : IC.vol; $("vol").value = v.muted ? 0 : v.volume; }
function poke() {
  const p = $("player");
  p.classList.remove("idle"); clearTimeout(hideT);
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
    m.append(h("div", { class: "mh" }, title));
    items.forEach(([label, on, fn]) => m.append(h("button", { type: "button", class: on ? "on" : "", onclick: () => { fn(); closeMenu(); poke(); } }, label)));
  };
  if (a && a.srcs && a.srcs.length > 1) add(L().quality, a.srcs.map(([k, u]) => [isNaN(k) ? k : k + "p", u === a.cur, () => switchSrc(u)]));
  add(L().speed, [0.75, 1, 1.25, 1.5].map(r => [r === 1 ? L().normal : r + "x", rate === r, () => { rate = r; v.playbackRate = r; }]));
  m.hidden = false; menuOpen = true; poke();
}

v.addEventListener("loadedmetadata", () => {
  if (!active) return;
  if (active.resumeAt) { try { v.currentTime = active.resumeAt; } catch (e) {} active.resumeAt = 0; }
  v.playbackRate = rate; active.ready = true; updateUI();
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
  if (active.nextInfo && cfg.autonext) showUpNext(active.nextInfo);
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
  const r = seek.getBoundingClientRect(), k = Math.min(1, Math.max(0, (ev.clientX - r.left) / r.width));
  $("tip").hidden = !v.duration; $("tip").style.left = k * 100 + "%"; $("tip").textContent = fmt(k * (v.duration || 0));
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
$("unNow").onclick = () => { const n = active && active.nextInfo; if (n) playEpisode(active.tid, n.s, n.i); };
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

/* ---------- запуск ---------- */
window.addEventListener("hashchange", () => { window.scrollTo(0, 0); if (!$("player").hidden) closePlayer(); else render(); });
$("lang").onclick = () => { lang = lang === "ru" ? "en" : "ru"; store.set("lang", lang); render(); };
$("q").addEventListener("input", () => {
  if ($("q").value.trim()) { if (route()[0] !== "search") go("search"); else render(); }
  else if (route()[0] === "search") go("home");
});
$("pp").innerHTML = IC.play; $("gear").innerHTML = IC.gear; $("fs").innerHTML = IC.fs; $("setBtn").innerHTML = IC.gear; syncVol();
render();
