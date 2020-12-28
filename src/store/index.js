import Vue from 'vue';
import Vuex from 'vuex';

import account from "./account";
import blocks from "./blocks";
import starting from "./starting";
import transactions from "./transactions";
import validators from "./validators";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    serverReachability: true
  },
  getters: {
    getServerReachability: state => state.serverReachability
  },
  mutations: {
    /**
     * Set the server reachability
     * 
     * @param {state} state 
     * @param {boolean} payload 
     */
    setServerReachability(state, payload) {
      state.serverReachability = payload;
    }
  },
  modules: {
    account,
    blocks,
    starting,
    transactions,
    validators,
  }
});