/**
 * Transactions  mutations
 */
export default {
  /**
   * Set transactions isFetching state to true
   *
   * @param {TraansactionsState} state
   */
  startLoading(state) {
    state.isFetching = true;
  },
  /**
   * Set transactions isFetching state to false
   *
   * @param {TraansactionsState} state
   */
  stopLoading(state) {
    state.isFetching = false;
  },
};
