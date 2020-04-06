/**
 * Tendermint actions
 */

import api from "./api";

export default {
  /**
   * Action to subscribe web socket for new block event 
   * 
   * @param {Function} commit
   * @param {Function} dispatch
   * @param {WebSocket} client
   * @param {Object} event
   */
  subscribeNewBlockEvent({ commit, dispatch }, { client, event }) {
    let connected = false;

    client.onopen = function () {
      if (!connected) {
        const msg = JSON.stringify(event);
        client.send(msg);
        connected = true;
      }
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
        if (block.data && block.data.txs && parseInt(block.data.txs) > 0) {
          const tag = `tx.height=${block.header.height}`;
          dispatch("transactions/fetchTransactions", tag, {
            root: true
          });
        }
      }
    };

    client.onerror = function (evt) {
      const message = (evt.error && evt.error.message) ? `WebSocket error: ${evt.error.message}` : "WebSocket error";
      commit("setMessage", message);
    };

    client.onclose = function () {
      connected = false;
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
