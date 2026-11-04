// ===== ЭТОТ ФАЙЛ ТЫ РЕДАКТИРУЕШЬ САМ =====
// Название сайта:
const SITE_TITLE = "МОЙ СЕРИАЛ";

// Чтобы добавить серию: скопируй одну строку { ... }, поменяй название и ссылки на видео.
// "720" и "1080" - ссылки на файлы с GitHub Releases. Если есть только одно качество, оставь одно.
// poster - необязательная картинка-обложка серии (ссылка или имя файла в папке сайта).
const SEASONS = [
  {
    trailer: "",
    episodes: [
      { title: { ru: "Тюрьма", en: "Prison" }, desc: { ru: "Федор попадает за решётку.", en: "Fedor ends up behind bars." }, minutes: 12, poster: "", video: { "720": "", "1080": "" } },
      { title: { ru: "Выжить", en: "Survive" }, desc: { ru: "Первые дни в камере.", en: "The first days in the cell." }, minutes: 10, poster: "", video: { "720": "", "1080": "" } }
    ]
  },
  {
    trailer: "",
    episodes: [
      { title: { ru: "Вторая серия", en: "Episode two" }, desc: { ru: "Описание серии.", en: "Episode description." }, minutes: 11, poster: "", video: { "720": "", "1080": "" } }
    ]
  },
  {
    trailer: "",
    episodes: [
      { title: { ru: "Больница", en: "Hospital" }, desc: { ru: "Егор везёт брата в больницу.", en: "Egor drives his brother to the hospital." }, minutes: 14, poster: "", video: { "720": "", "1080": "" } }
    ]
  }
];
