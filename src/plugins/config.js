import Config from "Assets/json/config.json";

export default {
  install(vue) {
    vue.prototype.$config = Config;
  }
};