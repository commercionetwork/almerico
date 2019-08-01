import theme from "../config/theme.json";

export default {
  install(vueInstance) {
    vueInstance.prototype.$theme = theme;
  }
};
