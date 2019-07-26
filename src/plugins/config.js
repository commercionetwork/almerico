import Config from "Assets/json/config.json";

export default {
  install(Vue) {
    Vue.prototype.$config = Config;
  }
};