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
    commit
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
        let res = await api.requestBlock(height);
        commit("addNewBlock", res.data.block);
        height--;
      }
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
