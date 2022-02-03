import Vue from 'vue';
import Vuex from 'vuex';

import account from './account';
import blocks from './blocks';
import exchangeRate from './exchange-rate';
import home from './home';
import application from './application';
import transactions from './transactions';
import validators from './validators';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    account,
    blocks,
    exchangeRate,
    home,
    application,
    transactions,
    validators,
  },
});
