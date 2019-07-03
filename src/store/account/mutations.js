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
    state.message = "";
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
  /**
   * Set account message
   *
   * @param {AccountState} state
   * @param {String} message
   */
  setMessage(state, message) {
    state.message = message;
  },
  /**
   * Set account balances
   * 
   * @param {AccountState} state 
   * @param {Array.<Balance>} data 
   */
  setBalances(state, data) {
    state.all = data;
  }
};
