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
