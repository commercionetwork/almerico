/**
 * Chain mutations
 */

export default {
  /**
   * Set chain isFetching state to true
   *
   * @param {ChainState} state
   */
  startLoading(state) {
    state.message = "";
    state.isFetching = true;
  },
  /**
   * Set chain isFetching state to false
   *
   * @param {ChainState} state
   */
  stopLoading(state) {
    state.isFetching = false;
  },
  /**
   * Set chain message
   *
   * @param {ChainState} state
   * @param {String} message
   */
  setMessage(state, message) {
    state.message = message;
  },
  /**
   * Set node info
   * 
   * @param {ChainState} state 
   * @param {Object} info 
   */
  setNodeInfo(state, info) {
    state.nodeInfo = info;
  },
};
