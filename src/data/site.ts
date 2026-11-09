// Facts for the homepage. Source: veon/client.json (B-F005, B-F006, B-F008 to B-F012, B-F014, B-F015, socials).
// Prices are intentionally absent (unit unclear, B-F013 / U-R007). "2 заслужені лікарі" is not used (B-F011).

export interface Phone { display: string; tel: string; }

export const reception = {
  role: "Ресепшн",
  task: "Путівки й бронювання",
  hours: "щодня 8:00–20:00",
  phones: [
    { display: "044 290-20-96", tel: "+380442902096" },
    { display: "050 425-21-72", tel: "+380504252172" },
  ] as Phone[],
  email: "konchareception@ukr.net",
};

export const medManager = {
  role: "Медичний менеджер",
  task: "Питання про лікування",
  hours: "пн–пт 9:00–18:00",
  phone: { display: "044 259-24-50", tel: "+380442592450" } as Phone,
  email: "kz.sanatoriy@gmail.com",
};

export const generalEmail = "konchadus@ukr.net";

export const address = {
  postal: "03131",
  line: "Київ, Столичне шосе, 215",
  route: "Від метро «Видубичі»: автобус № 43, маршрутки № 311, 313, 314.",
  map: "https://www.google.com/maps/search/?api=1&query=%D0%9A%D0%B8%D1%97%D0%B2%2C%20%D0%A1%D1%82%D0%BE%D0%BB%D0%B8%D1%87%D0%BD%D0%B5%20%D1%88%D0%BE%D1%81%D0%B5%2C%20215",
};

export const socials = [
  { name: "Facebook", href: "https://www.facebook.com/konchazaspa.kiev/" },
  { name: "Instagram", href: "https://www.instagram.com/koncha_zaspa/" },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCBpJi9GcVw6S6BULx6JNsQg" },
];

export const nav = [
  { href: "#napryamy", label: "Напрями" },
  { href: "#terytoriya", label: "Територія" },
  { href: "#putivka", label: "Путівка і номери" },
  { href: "#komanda", label: "Команда" },
  { href: "#kontakty", label: "Контакти" },
];

export const FUTURE = "Розділ у розробці";
