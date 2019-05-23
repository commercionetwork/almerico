/**
 * Validators mutations
 */
export default {
  /**
   * Set validators isFetching state to true
   *
   * @param {ValidatorsState} state
   */
  startLoading(state) {
    state.isFetching = true;
  },
  /**
   * Set validators isFetching state to false
   *
   * @param {ValidatorsState} state
   */
  stopLoading(state) {
    state.isFetching = false;
  },
};
