import i18n from "./i18n";
import router from "./router";
import {
  ROUTE_NAMES
} from "Constants";
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

  // check if route enabled
  let routeEgnition = to.meta.egnition;
  if (routeEgnition) {
    next();
    return
  } else {
    next(router.push({
      name: ROUTE_NAMES.DASHBOARD,
      params: {
        lang: language
      }
    }));
  }
});
