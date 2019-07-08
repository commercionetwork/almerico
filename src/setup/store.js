import Vue from "vue";
import Vuex from "vuex";

import account from "Store/account";
import blocks from "Store/blocks";
import modals from "Store/modals";
import stake from "Store/stake";
import tendermint from "Store/tendermint";
import transactions from "Store/transactions";
import validators from "Store/validators";
import votings from "Store/votings";

Vue.use(Vuex);

const initialState = {
  account: account.initialState,
  blocks: blocks.initialState,
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
