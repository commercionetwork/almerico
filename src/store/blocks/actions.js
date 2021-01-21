/**
 * BLOCKS ACTIONS
 */


import api from "./api";

export default {
  /**
   * 
   * @param {Function} commit
   * @param {Number} height
   */
  async getBlock({
    commit
  }, height) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      const response = await api.requestBlock(height);
      commit("setBlockDetails", response.data);
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
  async fetchLatestBlock({
    commit
  }) {
    const response = await api.requestLatestBlock();
    commit("setLatestBlock", response.data.block);
  },
  /**
   * @param {Function} commit
   * @param {Number} height
   * @param {Number} items
   */
  async fetchBlocks({
    commit
  }, {
    height,
    items
  }) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      let maxHeight = parseInt(height);
      const minHeight = maxHeight - items > 0 ?
        maxHeight - items :
        0;
      let requests = [];
      while (maxHeight > minHeight) {
        requests.push(api.requestBlock(maxHeight));
        maxHeight--;
      }
      const responses = await Promise.all(requests);
      responses.forEach(response => commit("addSingleBlock", response.data.block));
      commit("changeHeight", minHeight);
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
   * @param {Function} dispatch
   * @param {Number} maxHeight
   * @param {Number} items
   */
  async getBlocks({
    commit,
    dispatch
  }, {
    maxHeight,
    items
  }) {
    commit("clearAllBlocks");
    await dispatch("fetchBlocks", {
      height: maxHeight,
      items
    });
  },
  /**
   * @param {Function} dispatch
   * @param {Number} currentHeight
   * @param {Number} items
   */
  async addBlocks({
    dispatch
  }, {
    currentHeight,
    items
  }) {
    await dispatch("fetchBlocks", {
      height: currentHeight,
      items
    });
  },
};