import theme from "Assets/json/theme.json";

export default {
  install(vueInstance) {
    vueInstance.prototype.$theme = theme;
  }
};
