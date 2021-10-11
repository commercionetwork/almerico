export default {
  /**
   *
   * @param {TransactionsState} state
   */
  startLoading(state) {
    state.error = null;
    state.isLoading = true;
  },
  /**
   *
   * @param {TransactionsState} state
   */
  stopLoading(state) {
    state.isLoading = false;
  },
  /**
   *
   * @param {TransactionsState} state
   * @param {String} filter
   */
  setFilter(state, filter) {
    state.filter = filter;
  },
  /**
   *
   * @param {TransactionsState} state
   * @param {Number} page
   */
  changePage(state, page) {
    state.currentPage = page;
  },
  /**
   *
   * @param {TransactionsState} state
   * @param {Number} page
   */
  setHasNext(state, page) {
    state.hasNext = page > 1;
  },
  /**
   *
   * @param {TransactionsState} state
   * @param {Array.<Object>} data
   */
  addTransactions(state, data) {
    state.transactions.push.apply(state.transactions, data);
  },
  /**
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
   *
   * @param {TransactionsState} state
   * @param {Object} data
   */
  setTransactionDetails(state, data) {
    state.details = {
      ...data,
    };
  },
};
