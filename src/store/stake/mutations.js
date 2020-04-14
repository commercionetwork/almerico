/**
 * Stake mutations
 */

export default {
  /**
   * Set Stake isFetching state to true
   *
   * @param {StakeState} state
   */
  startLoading(state) {
    state.message = "";
    state.isFetching = true;
  },
  /**
   * Set Stake isFetching state to false
   *
   * @param {StakeState} state
   */
  stopLoading(state) {
    state.isFetching = false;
  },
  /**
   * Set Stake message
   *
   * @param {StakeState} state
   * @param {String} message
   */
  setMessage(state, message) {
    state.message = message;
  },
  /** Set pool data
   * 
   * @param {StakeState} state 
   * @param {Object} data 
   */
  setPool(state, data) {
    state.pool = data;
  },
};
