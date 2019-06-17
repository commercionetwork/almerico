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
   * @param {Pool} data 
   */
  setPool(state, data) {
    state.pool = data;
  },
  /**
   * Set validators data
   * 
   * @param {StakeState} state 
   * @param {Array} data 
   */
  setValidators(state, data) {
    state.validators = data;
  },
  /**
   * Add validators data
   * 
   * @param {StakeState} state 
   * @param {Array} data 
   */
  addValidators(state, data) {
    state.validators.push(...data);
  },
};
