/**
 * Blocks mutations
 */
export default {
  /**
   * Set blocks isFetching state to true
   *
   * @param {BlocksState} state
   */
  startLoading(state) {
    state.isFetching = true;
  },
  /**
   * Set blocks isFetching state to false
   *
   * @param {BlocksState} state
   */
  stopLoading(state) {
    state.isFetching = false;
  },
  /**
   * Set blocks data
   * 
   * @param {BlocksState} state 
   * @param {Object} data 
   */
  setBlocks(state, data) {
    state.all = data.result.block_metas;
  }
};
