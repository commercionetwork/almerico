import { LOCALES } from "Assets/translations";

const localeManager = {
  /**
   * Function that returns the long identification string of the localization 
   * 
   * @param {string} language 
   */
  getLongCode(language) {
    let locale = "";
    switch (language) {
      case LOCALES.EN:
        locale = "en-EN";
        break;
      case LOCALES.IT:
        locale = "it-IT";
        break;
      default:
        locale = "en-EN";
    }
    return locale;
  },
  /**
   * Function that returns the short identification string of the localization 
   * 
   * @param {string} language 
   */
  getShortCode(language) {
    let locale = "";
    switch (language) {
      case "en-EN":
        locale = LOCALES.EN;
        break;
      case "it-IT":
        locale = LOCALES.IT;
        break;
      default:
        locale = LOCALES.EN;
    }
    return locale;
  },
};

export default localeManager;
