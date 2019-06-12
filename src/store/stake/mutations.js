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
