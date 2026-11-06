// ===== ЭТОТ ФАЙЛ ТЫ РЕДАКТИРУЕШЬ САМ =====
// Название кинотеатра (вверху сайта):
const SITE_TITLE = "FIDORIUM";

// Название и описание сериала на главной (ru - по-русски, en - по-английски):
const SERIES_TITLE = { ru: "Тюряга", en: "Jail" };
// Обложка сериала для главной (необязательно). Если пусто - берётся кадр из первой серии. Пример: "cover.jpg" (загрузи картинку в репозиторий).
const SERIES_POSTER = "";
const SERIES_DESC = { ru: "Короткое описание сериала. Его видно на главной странице.", en: "A short description of the series shown on the home page." };

// Чтобы добавить серию: скопируй одну строку { ... }, поменяй название, описание и ссылки.
// "720" и "1080" - ссылки на видео (archive.org, вида https://archive.org/download/.../файл.mp4). Если качество одно, оставь другое пустым.
// intro: { start: 10, end: 40 } - секунды заставки (кнопка "Пропустить заставку"). credits: { start: 300 } - секунда, с которой идут титры.
// poster: "ep2.jpg" - своя обложка серии (загрузи картинку в репозиторий). Без неё берётся обложка сериала.
// poster - картинка-обложка серии (необязательно). Длительность сайт определит сам после первого просмотра.
// trailer - ссылка на трейлер сезона (необязательно).
const SEASONS = [
  {
    trailer: "",
    episodes: [
      { title: { ru: "Начало", en: "The beginning" }, desc: { ru: "Главный герой оказывается в тюрьме, где с помощью пронесенного ножа и отобранного оружия устраивает массовую резню и перестрелку с охранниками и заключенными. Весь этот хаос заканчивается тем, что в рукопашной драке героя избивает и вырубает робот-манекен.", en: "The main character ends up in prison, where he uses a smuggled knife and stolen weapons to trigger a massive massacre and shootout with both guards and inmates. The chaos ultimately ends when a mannequin robot beats him up and knocks him out in a fistfight." }, minutes: 5.35, poster: "", video: { "720": "", "1080": "https://archive.org/download/1_20261104_20261104_2221/1.mp4" } },
      { title: { ru: "Безумный двор", en: "The Bizarre Yard" }, desc: { ru: "Главный герой бродит по сюрреалистичной тюрьме, где встречает гигантскую акулу и болтает со своим другом-заключенным. Выйдя во двор, он общается со странной бандой «крутых зеков», избивает случайного заключенного, который сам напросился на драку, и в итоге возвращается в свою камеру отдыхать..", en: "The protagonist wanders through the surreal prison, encountering a giant shark and chatting with his imprisoned friend. Upon entering the yard, he interacts with a strange gang of cool inmates, beats up a random prisoner who provoked him, and eventually returns to his cell to rest." }, poster: "", video: { "720": "", "1080": "https://archive.org/download/2_20261104_20261104_2244/2%20%D1%81%D0%B5%D1%80%D0%B8%D1%8F.mp4" } }
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