/**
 * Tendermint actions
 */

import api from "./api";

export default {
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
   * @param {number} blocks
   */
  async fetchBlocks({
    commit
  }, blocks) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      const response = await api.requestLastBlock();
      const height = response.data.block.header.height;
      let min = (blocks && blocks < 19) ?
        height - blocks :
        height - 19;
      let max = height;
      const res = await api.requestBlockChain(min, max);
      commit("setBlocks", res.data.result.block_metas);
    } catch (error) {
      if (error.response !== undefined) {
        commit("setMessage", error.response);
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
        commit("setMessage", error.response);
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
        commit("setMessage", error.response);
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
