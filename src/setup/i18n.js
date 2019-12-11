import Vue from "vue";
import VueI18n from "vue-i18n";
import messages, { LOCALES } from "Assets/translations";

const dateTimeFormats = {
  [LOCALES.EN]: {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric"
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric"
    }
  },
  [LOCALES.IT]: {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric"
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric"
    }
  }
};

const numberFormats = {
  [LOCALES.EN]: {
    currency: {
      style: "currency",
      currency: "EUR",
      currencyDisplay: "symbol"
    }
  },
  [LOCALES.IT]: {
    currency: {
      style: "currency",
      currency: "EUR",
      currencyDisplay: "symbol"
    }
  }
};

Vue.use(VueI18n);

// Create VueI18n instance with options
export default new VueI18n({
  numberFormats,
  dateTimeFormats,
  fallbackLocale: LOCALES.EN,
  locale: LOCALES.EN, // set locale
  messages // set locale messages
});
