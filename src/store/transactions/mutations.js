/**
 * Transactions mutations
 */

export default {
  /**
   * Set transactions isFetching state to true
   *
   * @param {TransactionsState} state
   */
  startLoading(state) {
    state.message = "";
    state.isFetching = true;
  },
  /**
   * Set transactions isFetching state to false
   *
   * @param {TransactionsState} state
   */
  stopLoading(state) {
    state.isFetching = false;
  },
  /**
   * Set transactions message
   *
   * @param {TransactionsState} state
   * @param {String} message
   */
  setMessage(state, message) {
    state.message = message;
  },
  /**
   * Add transactions data
   *
   * @param {TransactionsState} state
   * @param {Array.<Transaction>} data
   */
  addTransactions(state, data) {
    state.all.push(...data);
  }
};
