/**
 * Tendermint actions
 */

import api from "./api";
import {
  RpcClient
} from "tendermint";
import {
  WS
} from "Constants";

const client = RpcClient(WS);

export default {
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
  /**
   * Action to fetch genesis data
   * 
   * @param {Function} commit 
   */
  async fetchGenesis({
    commit
  }) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      const response = await api.requestGenesis();
      commit("setGenesis", response.data.result);
    } catch (error) {
      if (error.response) {
        commit("setMessage", error.response.data.error);
      } else if (error.request) {
        commit("setMessage", "Request error");
      } else {
        commit("setServerReachability", false, {
          root: true
        });
      }
    } finally {
      commit("stopLoading");
    }
  }
};
