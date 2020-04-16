import Vue from "vue";
import Vuex from "vuex";

import account from "./account";
import blocks from "./blocks";
import chain from "./chain";
import modals from "./modals";
import stake from "./stake";
import tendermint from "./tendermint";
import transactions from "./transactions";
import validators from "./validators";
import votings from "./votings";

Vue.use(Vuex);

const initialState = {
  account: account.initialState,
  blocks: blocks.initialState,
  chain: chain.initialState,
  modals: modals.initialState,
  stake: stake.initialState,
  transactions: transactions.initialState,
  validators: validators.initialState,
  votings: votings.initialState,
};

export default new Vuex.Store({
  modules: {
    account,
    blocks,
    chain,
    modals,
    stake,
    tendermint,
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
