/**
 * Blocks actions
 */

import api from "./api";

export default {
  /**
   * Action to fetch a list of most recent blocks
   * 
   * @param {Function} commit 
   * @param {Number} limit 
   */
  async fetchBlocks({
    commit,
    dispatch
  }, limit = 10) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      const response = await api.requestLastBlock();
      let height = parseInt(response.data.block.header.height);
      const min = height - limit;
      while (height > 0 && height > min) {
        dispatch("fetchBlock", height);
        height--;
      }
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
  },
  /**
   * Action to fetch a block by height
   * 
   * @param {Function} commit 
   * @param {Number} height
   */
  async fetchBlock({
    commit
  }, height) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      const response = await api.requestBlock(height);
      commit("addNewBlock", response.data.block);
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
