import config from '../config/config.json';

export default {
  install(vueInstance) {
    vueInstance.prototype.$config = config;
  },
};
