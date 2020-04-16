/**
 * Tendermint mutations
 */

export default {
  /**
   * Set tendermint isFetching state to true
   *
   * @param {TendermintState} state
   */
  startLoading(state) {
    state.message = "";
    state.isFetching = true;
  },
  /**
   * Set tendermint isFetching state to false
   *
   * @param {TendermintState} state
   */
  stopLoading(state) {
    state.isFetching = false;
  },
  /**
   * Set tendermint message
   *
   * @param {TendermintState} state
   * @param {String} message
   */
  setMessage(state, message) {
    state.message = message;
  },
  /**
   * Set tendermint genesis
   * 
   * @param {TendermintState} state 
   * @param {Object} data 
   */
  setGenesis(state, data) {
    state.genesis = data;
  },
  /**
   * Set node info
   * 
   * @param {TendermintState} state 
   * @param {Object} info 
   */
  setNodeInfo(state, info) {
    state.nodeInfo = info;
  },
};
