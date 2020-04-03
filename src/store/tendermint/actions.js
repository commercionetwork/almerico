/**
 * Tendermint actions
 */

import api from "./api";
import { WS } from "Constants";

export default {
  /**
   * Action to subscribe new block web socket
   * 
   * @param {Function} commit
   */
  subscribeWebSocketEvent({ commit, dispatch }) {
    const client = new WebSocket(WS);

    client.onopen = function () {
      const msg = JSON.stringify({
        "jsonrpc": "2.0",
        "method": "subscribe",
        "id": 0,
        "params": {
          "query": "tm.event='NewBlock'"
        }
      });

      client.send(msg);
    };

    client.onmessage = function (evt) {
      let eventData = JSON.parse(evt.data);
      let result = eventData.result;
      let block = (result.data && result.data.value.block)
        ? result.data.value.block
        : null;

      if (block != null) {
        commit("blocks/setLastBlock", block, {
          root: true
        });
        dispatch("stake/fetchPool", null, {
          root: true
        });
        if (block.data.txs != null && parseInt(block.data.txs) > 0) {
          const tag = `tx.height=${block.header.height}`;
          dispatch("transactions/fetchTransactions", tag, {
            root: true
          });
        }
      }
    };

    client.onerror = function (evt) {
      throw evt.data;
    };
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
