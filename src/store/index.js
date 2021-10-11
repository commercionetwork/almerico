import Vue from 'vue';
import Vuex from 'vuex';

import account from './account';
import blocks from './blocks';
import dashboard from './dashboard';
import overview from './overview';
import spreadsheet from './spreadsheet';
import starting from './starting';
import transactions from './transactions';
import validators from './validators';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
  },
  getters: {
    error: (state) => state.error,
  },
  mutations: {
    /**
     * @param {Object} state
     * @param {Object} error
     */
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    handleError({ commit }, error) {
      commit('setError', error);
    },
  },
  modules: {
    account,
    blocks,
    dashboard,
    overview,
    spreadsheet,
    starting,
    transactions,
    validators,
  },
});
