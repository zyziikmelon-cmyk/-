// ===== КАТАЛОГ: здесь ты добавляешь новые сериалы и фильмы =====
// Описание твоего главного сериала (сам сериал и серии остаются в episodes.js).
// top: 1 - место в «Топе» (убери строку top, если не нужен).
const MAIN_META = { genre: { ru: "Сериал", en: "Series" }, year: 2026, added: "2026-11-04", top: 1, age: "18+",
  tagline: { ru: "Один день здесь длиннее, чем целая жизнь снаружи.", en: "One day in here is longer than a whole life outside." },
  story: { ru: "Здесь у каждого своя игра, у каждой улыбки своя цена, а двор, на который выходят окна камер, хранит больше тайн, чем кажется. Сериал снят в Newton Playground на VR: мрачный юмор, неожиданные повороты и герои, которых невозможно забыть.", en: "Everyone here plays their own game, every smile has its price, and the yard under the cell windows keeps more secrets than it seems. Shot in Newton Playground in VR: dark humour, unexpected turns and heroes you cannot forget." },
  tags: [{ ru: "Тюрьма", en: "Prison" }, { ru: "Чёрный юмор", en: "Dark humour" }, { ru: "Интрига", en: "Intrigue" }, { ru: "VR-кино", en: "VR cinema" }],
  made: { ru: "Newton Playground (VR)", en: "Newton Playground (VR)" }, cast: { ru: "Федор", en: "Fyodor" } };
// age - возраст (например "18+"), country - страна: country: { ru: "Россия", en: "Russia" }. Оба необязательные, можно удалить.

// Новые сериалы и фильмы добавляй сюда: скопируй пример, раскомментируй (убери //) и поменяй.
// Для красивой страницы можно добавить: tagline (слоган), story (длинное описание), tags (теги), made (где снято), cast (герой). Если не добавить, теги и факты подставятся сами.
// id - только латинские буквы, цифры и дефис. added - дата добавления (по ней сортировка «по новизне»).
const EXTRA_TITLES = [
  { id: "golda", title: { ru: "Голда", en: "Golda" }, desc: { ru: "Короткий мультфильм про золотую монету, за которой охотятся все вокруг. Каждому она нужна по своей причине.", en: "A short cartoon about a golden coin that everyone around wants. Everyone has their own reason." }, genre: { ru: "Мультфильм", en: "Cartoon" }, year: 2026, added: "2026-11-07", top: 2, age: "12+", tagline: { ru: "Одна монета. Тысяча желаний.", en: "One coin. A thousand wishes." },
    story: { ru: "Золото меняет всех, кто к нему прикасается. Забавная и немного грустная история о том, как далеко люди готовы зайти ради блестящей монеты.", en: "Gold changes everyone who touches it. A funny and slightly sad story about how far people will go for a shiny coin." },
    tags: [{ ru: "Мультфильм", en: "Cartoon" }, { ru: "Короткометражка", en: "Short film" }, { ru: "Притча", en: "Parable" }], made: { ru: "Newton Playground (VR)", en: "Newton Playground (VR)" }, poster: "golda-poster.jpg", video: { "720": "golda.mp4" } },
  // Пример фильма:
  // { id: "film-1", title: { ru: "Название", en: "Title" }, desc: { ru: "Описание", en: "Description" }, genre: { ru: "Комедия", en: "Comedy" }, year: 2026, added: "2026-12-01", poster: "", video: { "1080": "ссылка-на-видео" } },
  // Пример сериала:
  // { id: "serial-2", title: { ru: "Название", en: "Title" }, desc: { ru: "Описание", en: "Description" }, genre: { ru: "Драма", en: "Drama" }, year: 2026, added: "2026-12-02", poster: "",
  //   seasons: [ { episodes: [ { title: { ru: "Серия 1", en: "Episode 1" }, desc: { ru: "Описание", en: "Description" }, video: { "1080": "ссылка-на-видео" } } ] } ] },
];

// ===== КОММЕНТАРИИ (через Giscus, бесплатно) =====
// Включатся, когда в categoryId появится значение. Инструкция - у Claude в чате.
const GISCUS = { repo: "zyziikmelon-cmyk/-", repoId: "R_kgDOViz89g", category: "General", categoryId: "DIC_kwDOViz89s4DKm7K" };
