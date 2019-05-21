import Vue from "vue";
import App from "./App.vue";
import router from "Setup/router";
import store from "Setup/store";
import "bootstrap";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
