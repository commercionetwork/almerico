export default {
  /**
   *
   * @param {BlocksState} state
   */
  startLoading(state) {
    state.error = null;
    state.isLoading = true;
  },
  /**
   *
   * @param {BlocksState} state
   */
  stopLoading(state) {
    state.isLoading = false;
  },
  /**
   *
   * @param {BlocksState} state
   * @param {Number} height
   */
  changeHeight(state, height) {
    state.currentHeight = height;
  },
  /**
   *
   * @param {BlocksState} state
   * @param {Array.<Object>} data
   */
  addBlocks(state, data) {
    state.blocks.push.apply(state.blocks, data);
  },
  /**
   *
   * @param {BlocksState} state
   */
  clearAllBlocks(state) {
    state.blocks = [];
  },
  /**
   *
   * @param {BlocksState} state
   * @param {Object} data
   */
  addSingleBlock(state, data) {
    state.blocks.unshift(data);
  },
  /**
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
