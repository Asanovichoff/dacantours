export type Locale = "en" | "ru";

/**
 * All user-facing copy lives here so adding a locale is a data change,
 * not a component change. When the full site lands this moves to
 * next-intl message catalogues under /messages.
 */
export const content = {
  en: {
    label: "English",
    eyebrow: "Kyrgyzstan · Tien Shan",
    badge: "Launching soon",
    headline: ["Kyrgyzstan,", "on your terms."],
    lede:
      "Custom journeys through the Tien Shan — alpine lakes, high passes, horseback trekking, and nights in a yurt. You choose the days, the pace, and who you travel with.",
    cards: [
      {
        title: "Build your own trip",
        body:
          "No fixed packages. Choose your length, your route, and whether you travel privately or in a small group.",
      },
      {
        title: "Lakes above 3,000 m",
        body:
          "Song-Kul, Kel-Suu, Ala-Kul — high water, open valleys, and skies with nothing in the way.",
      },
      {
        title: "Horseback & yurt life",
        body:
          "Ride the routes herders still use, and sleep where they sleep. Eagle hunters, kymyz, and the long summer light.",
      },
    ],
    contactHeading: "Already planning something?",
    contactBody:
      "Tell us roughly what you have in mind — dates, days, the kind of trip. We read every message and reply personally.",
    emailCta: "Email us",
    whatsappCta: "WhatsApp",
    footerNote: "Full site coming soon.",
  },
  ru: {
    label: "Русский",
    eyebrow: "Кыргызстан · Тянь-Шань",
    badge: "Скоро открытие",
    headline: ["Кыргызстан", "на ваших условиях."],
    lede:
      "Индивидуальные маршруты по Тянь-Шаню — высокогорные озёра, перевалы, конные походы и ночи в юрте. Вы выбираете сроки, темп и компанию.",
    cards: [
      {
        title: "Соберите свой маршрут",
        body:
          "Никаких готовых пакетов. Выбирайте длительность, маршрут и формат — индивидуально или малой группой.",
      },
      {
        title: "Озёра выше 3000 м",
        body:
          "Сон-Куль, Кель-Суу, Ала-Куль — высокая вода, открытые долины и небо без помех.",
      },
      {
        title: "Кони и жизнь в юрте",
        body:
          "Тропами, которыми до сих пор ходят чабаны. Беркутчи, кымыз и долгий летний свет.",
      },
    ],
    contactHeading: "Уже планируете поездку?",
    contactBody:
      "Напишите, что примерно вы хотите — даты, количество дней, формат. Мы читаем каждое сообщение и отвечаем лично.",
    emailCta: "Написать нам",
    whatsappCta: "WhatsApp",
    footerNote: "Полная версия сайта скоро.",
  },
} satisfies Record<Locale, unknown>;
