// ===== ЭТОТ ФАЙЛ ТЫ РЕДАКТИРУЕШЬ САМ =====
// Название кинотеатра (вверху сайта):
const SITE_TITLE = "КИНОТЕАТР ФЕДОР";

// Название и описание сериала на главной (ru - по-русски, en - по-английски):
const SERIES_TITLE = { ru: "Название сериала", en: "Series title" };
const SERIES_DESC = { ru: "Короткое описание сериала. Его видно на главной странице.", en: "A short description of the series shown on the home page." };

// Чтобы добавить серию: скопируй одну строку { ... }, поменяй название, описание и ссылки.
// "720" и "1080" - ссылки на видео (из GitHub Releases). Если качество одно, оставь вторую пустой.
// poster - картинка-обложка серии (необязательно). Длительность сайт определит сам после первого просмотра.
// trailer - ссылка на трейлер сезона (необязательно).
const SEASONS = [
  {
    trailer: "",
    episodes: [
      { title: { ru: "Тюрьма", en: "Prison" }, desc: { ru: "Федор попадает за решётку.", en: "Fedor ends up behind bars." }, poster: "", video: { "720": "", "1080": "" } },
      { title: { ru: "Выжить", en: "Survive" }, desc: { ru: "Первые дни в камере.", en: "The first days in the cell." }, poster: "", video: { "720": "", "1080": "" } }
    ]
  },
  {
    trailer: "",
    episodes: [
      { title: { ru: "Вторая серия", en: "Episode two" }, desc: { ru: "Описание серии.", en: "Episode description." }, poster: "", video: { "720": "", "1080": "" } }
    ]
  },
  {
    trailer: "",
    episodes: [
      { title: { ru: "Больница", en: "Hospital" }, desc: { ru: "Егор везёт брата в больницу.", en: "Egor drives his brother to the hospital." }, poster: "", video: { "720": "", "1080": "" } }
    ]
  }
];
