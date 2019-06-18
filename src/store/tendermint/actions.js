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
      commit("addNewBlock", event.block);
      commit("setLastBlock", event.block);
      dispatch("stake/fetchPool", null, {
        root: true
      });
    });
  },
  /**
   * Action to get the blocks list
   * 
   * @param {Function} dispatch 
   * @param {number} blocks
   */
  getBlocks({
    dispatch
  }, blocks) {
    dispatch("fetchBlocks", blocks);
  },
  /**
   * Action to fetch a blocks list
   * 
   * @param {Function} commit 
   * @param {Function} dispatch 
   * @param {number} blocks
   */
  async fetchBlocks({
    commit
  }, limit) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      const response = await api.requestLastBlock();
      const height = response.data.block.header.height > 19 ? response.data.block.header.height : 20;
      let min = (limit > 0 && limit < 19) ?
        height - limit :
        height - 19;
      const blocks = [];
      for (let index = height; index > min; index--) {
        const res = await api.requestBlock(index);
        blocks.push(res.data.block);
      }
      commit("setBlocks", blocks);
    } catch (error) {
      if (error.response !== undefined) {
        commit("setMessage", error.response.data.error);
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
   * 
   * @param {Function} dispatch 
   * @param {Object} filters // tag, page, limit
   */
  getTransactions({
    dispatch
  }, filters) {
    dispatch("fetchTransactions", filters);
  },
  /**
   * 
   * @param {Function} commit 
   * @param {Object} filters // tag, page, limit
   */
  async fetchTransactions({
    commit
  }, filters) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      const response = await api.requestTransactions(filters);
      commit("setTransactions", response.data);
    } catch (error) {
      if (error.response !== undefined) {
        commit("setMessage", error.response.data.error);
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
   * 
   * @param {Function} commit 
   * @param {Object} filters // tag, page, limit
   */
  async updateTransactions({
    commit
  }, filters) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      const response = await api.requestTransactions(filters);
      commit("addTransactions", response.data);
    } catch (error) {
      if (error.response !== undefined) {
        commit("setMessage", error.response.data.error);
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
