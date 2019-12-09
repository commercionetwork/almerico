import { LOCALES } from "Assets/translations";

/**
 * Function to localize the URL
 * 
 * @param {string} route 
 * @param {string} locale 
 */
const localizedRoute = (route, locale = LOCALES.EN) => {
  return {
    name: route,
    params: { lang: locale }
  }
};

export default localizedRoute;
