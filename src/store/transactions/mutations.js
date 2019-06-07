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
  /**
   * Set transactions data
   * 
   * @param {TransactionsState} state 
   * @param {Object} data 
   */
  setTransactions(state, data) {
    state.all = data;
  }
};
