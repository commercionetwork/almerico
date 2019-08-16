/**
 * Tendermint store
 */

import {
  RpcClient
} from "tendermint";
import {
  WS
} from "Constants";

const client = RpcClient(WS);

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    /**
     * Action to subscribe new block web socket
     * 
     * @param {Function} commit
     */
    subNewClient({
      commit,
      dispatch
    }) {
      client.subscribe({
        query: "tm.event = 'NewBlock'"
      }, event => {
        let block = event.block;
        commit("blocks/setLastBlock", block, {
          root: true
        });
        dispatch("stake/fetchPool", null, {
          root: true
        });
        if (parseInt(block.header.num_txs) > 0) {
          const tag = `tx.height=${block.header.height}`;
          dispatch("transactions/fetchTransactions", tag, {
            root: true
          });
        }
      });
    },
  }
};
