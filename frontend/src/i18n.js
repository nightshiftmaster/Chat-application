import i18n from "i18next";

import { initReactI18next } from "react-i18next";
import ru from "./locales/index";

i18n.use(initReactI18next).init({
  fallbackLng: "ru",
  resources: {
    ru,
  },
});

export default i18n;
