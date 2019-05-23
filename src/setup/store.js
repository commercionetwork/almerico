import Vue from "vue";
import Vuex from "vuex";

import blocks from "Store/blocks";
import transactions from "Store/transactions";
import validators from "Store/validators";
import votings from "Store/votings";

Vue.use(Vuex);

const initialState = {
  blocks: blocks.initialState,
  transactions: transactions.initialState,
  validators: validators.initialState,
  votings: votings.initialState,
};

export default new Vuex.Store({
  modules: {
    blocks,
    transactions,
    validators,
    votings
  },
  state: {
    serverReachability: true
  },
  getters: {
    getServerReachability: state => state.serverReachability
  },
  mutations: {
    /**
     * Reset all the store
     * 
     * @param {state} state 
     */
    reset(state) {
      Object.keys(state).forEach(key => {
        Object.assign(state[key], initialState[key]);
      });
    },
    /**
     * Set the server reachability
     * 
     * @param {state} state 
     * @param {boolean} payload 
     */
    setServerReachability(state, payload) {
      state.serverReachability = payload;
    }
  }
});
