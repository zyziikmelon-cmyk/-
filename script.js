const TXT = {
  ru: { seasons: "Сезоны и серии", season: "Сезон", ep: "серия", min: "мин", cont: "Продолжить просмотр", start: "Смотреть с начала", trailer: "Трейлер сезона", next: "Следующая серия", quality: "Качество", empty: "Видео пока не добавлено. Вставь ссылку в episodes.js.", hero: "Сериал, снятый своими руками", heroText: "Все сезоны в одном месте. Выбери сезон и начни смотреть." },
  en: { seasons: "Seasons and episodes", season: "Season", ep: "Episode", min: "min", cont: "Continue watching", start: "Watch from start", trailer: "Season trailer", next: "Next episode", quality: "Quality", empty: "No video yet. Add a link in episodes.js.", hero: "A series made by hand", heroText: "All seasons in one place. Pick a season and press play." }
};
const $ = id => document.getElementById(id);
let lang = localStorage.getItem("lang") || "ru", season = 0, cur = null;
const t = o => (typeof o === "string" ? o : (o[lang] || o.ru || ""));
const saved = () => { try { return JSON.parse(localStorage.getItem("last")); } catch (e) { return null; } };

function render() {
  const L = TXT[lang];
  document.documentElement.lang = lang;
  document.title = SITE_TITLE;
  $("logo").textContent = SITE_TITLE;
  $("lang").textContent = lang === "ru" ? "EN" : "RU";
  $("heroTitle").textContent = L.hero;
  $("heroText").textContent = L.heroText;
  $("seasonsHead").textContent = L.seasons;
  $("continueBtn").textContent = saved() ? L.cont : L.start;
  $("trailerBtn").textContent = L.trailer;
  $("next").textContent = L.next;
  $("qLabel").textContent = L.quality;
  $("empty").textContent = L.empty;
  $("seasons").innerHTML = "";
  SEASONS.forEach((s, i) => {
    const b = document.createElement("button");
    b.textContent = L.season + " " + (i + 1);
    b.className = i === season ? "on" : "";
    b.onclick = () => { season = i; render(); };
    $("seasons").appendChild(b);
  });
  $("grid").innerHTML = "";
  SEASONS[season].episodes.forEach((e, i) => {
    const c = document.createElement("div");
    c.className = "card";
    c.style.animationDelay = i * 60 + "ms";
    const img = e.poster ? `background-image:url('${e.poster}')` : "";
    c.innerHTML = `<div class="thumb" style="${img}"><b>${i + 1}</b><span>${e.minutes || ""} ${e.minutes ? L.min : ""}</span></div><h3></h3><p></p>`;
    c.querySelector("h3").textContent = i + 1 + " " + L.ep.toLowerCase() + ": " + t(e.title);
    c.querySelector("p").textContent = t(e.desc);
    c.onclick = () => play(season, i);
    $("grid").appendChild(c);
  });
}

function play(s, i, url) {
  const e = SEASONS[s].episodes[i];
  cur = { s, i };
  if (!url) localStorage.setItem("last", JSON.stringify(cur));
  $("player").hidden = false;
  $("pTitle").textContent = TXT[lang].season + " " + (s + 1) + ": " + (i + 1) + " " + TXT[lang].ep.toLowerCase();
  const sources = url ? { "": url } : Object.fromEntries(Object.entries(e.video || {}).filter(([, v]) => v));
  const q = $("quality");
  q.innerHTML = "";
  Object.keys(sources).sort((a, b) => b - a).forEach(k => q.add(new Option(k ? k + "p" : "Auto", k)));
  q.parentElement.style.display = q.options.length > 1 ? "" : "none";
  q.onchange = () => { const tm = $("video").currentTime; $("video").src = sources[q.value]; $("video").currentTime = tm; $("video").play(); };
  const has = q.options.length > 0;
  $("empty").style.display = has ? "none" : "flex";
  $("video").style.visibility = has ? "visible" : "hidden";
  if (has) { $("video").src = sources[q.value]; $("video").play().catch(() => {}); } else $("video").removeAttribute("src");
  $("next").style.display = !url && SEASONS[s].episodes[i + 1] ? "" : "none";
}

function closePlayer() { $("video").pause(); $("player").hidden = true; render(); }
$("back").onclick = closePlayer;
document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("player").hidden) closePlayer(); });
$("next").onclick = () => play(cur.s, cur.i + 1);
$("lang").onclick = () => { lang = lang === "ru" ? "en" : "ru"; localStorage.setItem("lang", lang); render(); };
$("continueBtn").onclick = () => { const l = saved() || { s: 0, i: 0 }; season = l.s; play(l.s, l.i); };
$("trailerBtn").onclick = () => { const tr = SEASONS[season].trailer; play(season, 0, tr || " "); if (!tr) { $("empty").style.display = "flex"; $("video").style.visibility = "hidden"; $("next").style.display = "none"; } };
$("video").addEventListener("ended", () => { if (cur && $("next").style.display !== "none") $("next").click(); });
render();
