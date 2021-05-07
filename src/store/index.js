import Vue from 'vue';
import Vuex from 'vuex';

import account from './account';
import blocks from './blocks';
import dashboard from './dashboard';
import overview from './overview';
import starting from './starting';
import transactions from './transactions';
import validators from './validators';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    serverReachability: true,
  },
  getters: {
    getServerReachability: (state) => state.serverReachability,
  },
  mutations: {
    /**
     *
     * @param {Object} state
     * @param {Boolean} payload
     */
    setServerReachability(state, payload) {
      state.serverReachability = payload;
    },
  },
  modules: {
    account,
    blocks,
    dashboard,
    overview,
    starting,
    transactions,
    validators,
  },
});
