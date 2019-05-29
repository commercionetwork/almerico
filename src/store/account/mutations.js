/**
 * Account mutations
 */
export default {
  /**
   * Set account isFetching state to true
   *
   * @param {AccountState} state
   */
  startLoading(state) {
    state.isFetching = true;
  },
  /**
   * Set account isFetching state to false
   *
   * @param {AccountState} state
   */
  stopLoading(state) {
    state.isFetching = false;
  },
};