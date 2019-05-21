import Vue from "vue";
import App from "./App.vue";
import router from "Setup/router";
import store from "Setup/store";
import i18n from "Setup/i18n";
import "bootstrap";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
