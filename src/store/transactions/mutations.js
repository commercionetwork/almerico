/**
 * TRANSACTIONS MUTATIONS
 */

export default {
  /**
   * Set isLoading state to true
   *
   * @param {TransactionsState} state
   */
  startLoading(state) {
    state.error = '';
    state.isLoading = true;
  },
  /**
   * Set isLoading state to false
   *
   * @param {TransactionsState} state
   */
  stopLoading(state) {
    state.isLoading = false;
  },
  /**
   * Set error message
   *
   * @param {TransactionsState} state
   * @param {String} error
   */
  setError(state, error) {
    state.error = error;
  },
  /**
   * Set error message
   *
   * @param {TransactionsState} state
   * @param {String} filter
   */
  setFilter(state, filter) {
    state.filter = filter;
  },
  /**
   * Update transactions page
   *
   * @param {TransactionsState} state
   * @param {Number} page
   */
  changePage(state, page) {
    state.currentPage = page;
  },
  /**
   * Set hasNext state
   *
   * @param {TransactionsState} state
   * @param {Number} page
   */
  setHasNext(state, page) {
    state.hasNext = page > 1;
  },
  /**
   * Add transactions
   *
   * @param {TransactionsState} state
   * @param {Array.<Object>} data
   */
  addTransactions(state, data) {
    state.transactions.push.apply(state.transactions, data);
  },
  /**
   * Remove all transactions
   *
   * @param {TransactionsState} state
   */
  clearAllTransactions(state) {
    state.transactions = [];
  },
  /**
   * Add single transaction to the beginning of the stored transactions
   *
   * @param {TransactionsState} state
   * @param {Object} data
   */
  addSingleTransaction(state, data) {
    state.transactions.unshift(data);
  },
  /**
   * Set transaction details
   *
   * @param {TransactionsState} state
   * @param {Object} data
   */
  setTransactionDetails(state, data) {
    state.details = {
      ...data,
    };
  },
  /**
   * Set anchestor version
   *
   * @param {TransactionsState} state
   * @param {String} version
   */
  setVersion(state, version) {
    state.version = version;
  },
};
