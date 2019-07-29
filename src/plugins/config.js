import config from "Assets/json/config.json";

export default {
  install(vueInstance) {
    vueInstance.prototype.$config = config;
  }
};
