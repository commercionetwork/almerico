import i18n from "./i18n";
import router from "./router";
import {
  localeManager
} from "Utils";

router.beforeEach(async (to, from, next) => {
  // get user language
  const language = localeManager.getShortCode(
    navigator.language || navigator.userLanguage
  );
  if (language !== null) {
    i18n.locale = language;
  }

  next();
});
