/**
 * Validators mutations
 */

export default {
  /**
   * Set Validators isFetching state to true
   *
   * @param {ValidatorsState} state
   */
  startLoading(state) {
    state.message = "";
    state.isFetching = true;
  },
  /**
   * Set Validators isFetching state to false
   *
   * @param {ValidatorsState} state
   */
  stopLoading(state) {
    state.isFetching = false;
  },
  /**
   * Set Validators message
   *
   * @param {ValidatorsState} state
   * @param {String} message
   */
  setMessage(state, message) {
    state.message = message;
  },
  /**
   * Set validators data
   * 
   * @param {ValidatorsState} state 
   * @param {Array} data 
   */
  setValidators(state, data) {
    state.all = data;
  },
  /**
   * Add validators data
   * 
   * @param {ValidatorsState} state 
   * @param {Array} data 
   */
  addValidators(state, data) {
    state.all.push(...data);
  },
  /**
   * Set validator set
   * 
   * @param {ValidatorsState} state 
   * @param {Array} data 
   */
  setValidatorSet(state, data) {
    state.set = data;
  }
};
