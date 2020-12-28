/**
 * ACCOUNT MUTATIONS
 */

export default {
  /**
   * Set isLoading state to true
   *
   * @param {AccountState} state
   */
  startLoading(state) {
    state.error = "";
    state.isLoading = true;
  },
  /**
   * Set isLoading state to false
   *
   * @param {AccountState} state
   */
  stopLoading(state) {
    state.isLoading = false;
  },
  /**
   * Set error message
   *
   * @param {AccountState} state
   * @param {String} error
   */
  setError(state, error) {
    state.error = error;
  },
  /**
   * Set balances
   * 
   * @param {AccountState} state 
   * @param {Array.<Object>} data 
   */
  setBalances(state, data) {
    state.balances = data.map(obj => ({
      ...obj
    }));
  },
  /**
   * Set delegations
   * 
   * @param {AccountState} state 
   * @param {Array.<Object>} data 
   */
  setDelegations(state, data) {
    state.delegations = data.map(obj => ({
      ...obj
    }));
  },
  /**
   * Set unbondings delegations
   * 
   * @param {AccountState} state 
   * @param {Array.<Object>} data 
   */
  setUnbondings(state, data) {
    state.unbondings = data.map(obj => ({
      ...obj
    }));
  },
  /**
   * Set membership
   *
   * @param {AccountState} state
   * @param {Object} data
   */
  setMembership(state, data) {
    state.membership = {
      ...data
    };
  },
  /**
   * Set rewards
   *
   * @param {AccountState} state
   * @param {Object} data
   */
  setRewards(state, data) {
    state.rewards = {
      ...data
    };
  },
};