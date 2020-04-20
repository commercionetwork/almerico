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
   * @param {Array.<Object>} data 
   */
  setBalances(state, data) {
    state.balances = data;
  },
  /**
   * Set account delegations
   * 
   * @param {AccountState} state 
   * @param {Array.<Object>} data 
   */
  setDelegations(state, data) {
    state.delegations = data;
  },
  /**
   * Set account membership
   *
   * @param {AccountState} state
   * @param {Object} data
   */
  setMembership(state, data) {
    state.membership = data.membership_type;
  },
  /**
   * Set account rewards
   * 
   * @param {AccountState} state 
   * @param {Object} data 
   */
  setRewards(state, data) {
    state.rewards = data;
  },
  /**
   * Set account unbondingDelegations
   * 
   * @param {AccountState} state 
   * @param {Array.<Object>} data 
   */
  setUnbondingDelegations(state, data) {
    state.unbondingDelegations = data;
  },
};
