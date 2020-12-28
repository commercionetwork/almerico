/**
 * STARTING ACTIONS
 */

import api from "./api";
import {
  STATUS,
  WS
} from "@/constants";

export default {
  /**
   * @param {Function} dispatch 
   * @param {Function} commit 
   */
  async fetchInitData({
    dispatch,
    commit
  }) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      await dispatch("fetchGenesis");
      await dispatch("fetchNodeInfo");
      await dispatch("fetchPool");
      await dispatch("blocks/fetchLatestBlock", null, {
        root: true
      });
      await dispatch("validators/initValidators", {
        status: [
          STATUS.VALIDATOR.BONDED,
          STATUS.VALIDATOR.UNBONDED,
          STATUS.VALIDATOR.UNBONDING,
        ],
      }, {
        root: true
      })
      dispatch("subscribeWebSocket");
    } catch (error) {
      if (error.response) {
        commit("setError", JSON.stringify(error.response.data));
      } else if (error.request) {
        commit("setError", JSON.stringify(error));
      } else {
        commit("setServerReachability", false, {
          root: true
        });
      }
    } finally {
      commit("stopLoading");
    }
  },
  /**
   * @param {Function} commit 
   */
  async fetchGenesis({
    commit
  }) {
    const response = await api.requestGenesis();
    commit("setGenesis", response.data.result.genesis);
  },
  /**
   * @param {Function} commit 
   */
  async fetchNodeInfo({
    commit
  }) {
    const response = await api.requestNodeInfo();
    commit("setNodeInfo", response.data);
  },
  /**
   * @param {Function} commit 
   */
  async fetchPool({
    commit
  }) {
    const response = await api.requestPool();
    commit("setPool", response.data.result);
  },
  /**
   * @param {Function} dispatch 
   * @param {Function} commit 
   */
  subscribeWebSocket({
    dispatch,
    commit
  }) {
    const client = new WebSocket(WS.URL);
    let connected = false;

    client.onopen = function () {
      if (!connected) {
        Object.values(WS.EVENTS).forEach(event => {
          const msg = JSON.stringify({
            "jsonrpc": "2.0",
            "method": "subscribe",
            "id": 0,
            "params": {
              "query": `tm.event='${event}'`
            }
          });
          client.send(msg);
        });
        connected = true;
      }
    };

    client.onmessage = function (evt) {
      let eventData = JSON.parse(evt.data);
      let type = eventData.result.data != undefined ? eventData.result.data.type.replace('tendermint/event/', '') : null;
      switch (type) {
        case WS.EVENTS.NEW_BLOCK:
          commit("blocks/setLatestBlock", eventData.result.data.value.block, {
            root: true
          });
          break;
        case WS.EVENTS.TX:
          dispatch("transactions/fetchBlockTransactions", eventData.result.data.value.TxResult.height, {
            root: true
          })
          break;
        case WS.EVENTS.VALIDATOR_SET_UPDATES:
          commit("validators/updateValidatorsSets", eventData.result.data.value.validator_updates, {
            root: true
          });
          break;
        default:
          break;
      }
    };

    client.onerror = function (evt) {
      commit("setError", JSON.stringify(evt.error));
    };

    client.onclose = function () {
      connected = false;
    };
  },
};