import api from "./api";

/**
 * Blocks actions
 */
export default {
  /**
   * Action to get the blocks list
   * 
   * @param {Function} dispatch 
   * @param {number} blocks
   */
  getBlocks({
    dispatch
  }, blocks = 19) {
    dispatch("fetchBlocksList", blocks);
  },
  /**
   * Action to fetch a blocks list
   * 
   * @param {Function} commit 
   * @param {number} blocks
   */
  async fetchBlocksList({
    commit
  }, blocks = 19) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      const response = await api.requestLastBlock();
      const height = response.data.block.header.height;
      const res = await api.requestBlockChain((height - blocks), height);
      commit("setBlocks", res.data);
    } catch (error) {
      if (error.response !== undefined) {
        console.log(error.response);
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
