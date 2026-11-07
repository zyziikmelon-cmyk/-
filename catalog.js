// ===== КАТАЛОГ: здесь ты добавляешь новые сериалы и фильмы =====
// Описание твоего главного сериала (сам сериал и серии остаются в episodes.js).
// top: 1 - место в «Топе» (убери строку top, если не нужен).
const MAIN_META = { genre: { ru: "Сериал", en: "Series" }, year: 2026, added: "2026-11-04", top: 1, age: "18+" };
// age - возраст (например "18+"), country - страна: country: { ru: "Россия", en: "Russia" }. Оба необязательные, можно удалить.

// Новые сериалы и фильмы добавляй сюда: скопируй пример, раскомментируй (убери //) и поменяй.
// id - только латинские буквы, цифры и дефис. added - дата добавления (по ней сортировка «по новизне»).
const EXTRA_TITLES = [
  { id: "golda", title: { ru: "Голда", en: "Golda" }, desc: { ru: "Короткий мультфильм про золотую монету, за которой охотятся все вокруг. Каждому она нужна по своей причине.", en: "A short cartoon about a golden coin that everyone around wants. Everyone has their own reason." }, genre: { ru: "Мультфильм", en: "Cartoon" }, year: 2026, added: "2026-11-07", top: 2, poster: "golda-poster.jpg", video: { "720": "golda.mp4" } },
  // Пример фильма:
  // { id: "film-1", title: { ru: "Название", en: "Title" }, desc: { ru: "Описание", en: "Description" }, genre: { ru: "Комедия", en: "Comedy" }, year: 2026, added: "2026-12-01", poster: "", video: { "1080": "ссылка-на-видео" } },
  // Пример сериала:
  // { id: "serial-2", title: { ru: "Название", en: "Title" }, desc: { ru: "Описание", en: "Description" }, genre: { ru: "Драма", en: "Drama" }, year: 2026, added: "2026-12-02", poster: "",
  //   seasons: [ { episodes: [ { title: { ru: "Серия 1", en: "Episode 1" }, desc: { ru: "Описание", en: "Description" }, video: { "1080": "ссылка-на-видео" } } ] } ] },
];

// ===== КОММЕНТАРИИ (через Giscus, бесплатно) =====
// Включатся, когда в categoryId появится значение. Инструкция - у Claude в чате.
const GISCUS = { repo: "zyziikmelon-cmyk/-", repoId: "R_kgDOViz89g", category: "General", categoryId: "" };
