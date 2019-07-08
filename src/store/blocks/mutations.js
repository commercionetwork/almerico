/**
 * Blocks mutations
 */

export default {
  /**
   * Set Blocks isFetching state to true
   *
   * @param {BlocksState} state
   */
  startLoading(state) {
    state.message = "";
    state.isFetching = true;
  },
  /**
   * Set Blocks isFetching state to false
   *
   * @param {BlocksState} state
   */
  stopLoading(state) {
    state.isFetching = false;
  },
  /**
   * Set Blocks message
   *
   * @param {BlocksState} state
   * @param {String} message
   */
  setMessage(state, message) {
    state.message = message;
  },
  /**
   * Add block to blocks list
   * 
   * @param {BlocksState} state 
   * @param {Block} data 
   */
  addNewBlock(state, data) {
    state.all.push(data);
  },
  /**
   * Set last block
   * 
   * @param {BlocksState} state 
   * @param {Block} data 
   */
  setLastBlock(state, data) {
    state.last = data;
  }
};
