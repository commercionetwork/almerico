/**
 * Tendermint mutations
 */

export default {
  /**
   * Set Tendermint isFetching state to true
   *
   * @param {TendermintState} state
   */
  startLoading(state) {
    state.message = "";
    state.isFetching = true;
  },
  /**
   * Set Tendermint isFetching state to false
   *
   * @param {TendermintState} state
   */
  stopLoading(state) {
    state.isFetching = false;
  },
  /**
   * Set Tendermint message
   *
   * @param {TendermintState} state
   * @param {String} message
   */
  setMessage(state, message) {
    state.message = message;
  },
  /**
   * Add transactions data
   *
   * @param {TendermintState} state
   * @param {Array.<Transaction>} data
   */
  addTransactions(state, data) {
    state.transactions.push(...data);
  }
};
