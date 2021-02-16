/**
 * BLOCKS MUTATIONS
 */

export default {
  /**
   * Set isLoading state to true
   *
   * @param {BlocksState} state
   */
  startLoading(state) {
    state.error = null;
    state.isLoading = true;
  },
  /**
   * Set isLoading state to false
   *
   * @param {BlocksState} state
   */
  stopLoading(state) {
    state.isLoading = false;
  },
  /**
   * Set error message
   *
   * @param {BlocksState} state
   * @param {Object} error
   */
  setError(state, error) {
    state.error = { ...error };
  },
  /**
   * Update blocks height
   *
   * @param {BlocksState} state
   * @param {Number} height
   */
  changeHeight(state, height) {
    state.currentHeight = height;
  },
  /**
   * Add blocks
   *
   * @param {BlocksState} state
   * @param {Array.<Object>} data
   */
  addBlocks(state, data) {
    state.blocks.push.apply(state.blocks, data);
  },
  /**
   * Remove all blocks
   *
   * @param {BlocksState} state
   */
  clearAllBlocks(state) {
    state.blocks = [];
  },
  /**
   * Add single block to the beginning of the stored blocks
   *
   * @param {BlocksState} state
   * @param {Object} data
   */
  addSingleBlock(state, data) {
    state.blocks.unshift(data);
  },
  /**
   * Set block details
   *
   * @param {BlocksState} state
   * @param {Object} data
   */
  setBlockDetails(state, data) {
    state.details = null;
    state.details = {
      ...data,
    };
  },
  /**
   * Set latest block
   *
   * @param {BlocksState} state
   * @param {Object} data
   */
  setLatestBlock(state, data) {
    state.latest = {
      ...data,
    };
    state.blocks.unshift(data);
  },
};
