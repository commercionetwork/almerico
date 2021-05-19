export default {
  /**
   *
   * @param {AccountState} state
   */
  startLoading(state) {
    state.error = null;
    state.isLoading = true;
  },
  /**
   *
   * @param {AccountState} state
   */
  stopLoading(state) {
    state.isLoading = false;
  },
  /**
   *
   * @param {AccountState} state
   * @param {Object} error
   */
  setError(state, error) {
    state.error = { ...error };
  },
  /**
   *
   * @param {AccountState} state
   * @param {Array.<Object>} data
   */
  setBalances(state, data) {
    state.balances = data.map((obj) => ({
      ...obj,
    }));
  },
  /**
   *
   * @param {AccountState} state
   * @param {Array.<Object>} data
   */
  setDelegations(state, data) {
    state.delegations = data.map((obj) => ({
      ...obj,
    }));
  },
  /**
   *
   * @param {AccountState} state
   * @param {Array.<Object>} data
   */
  setUnbondings(state, data) {
    state.unbondings = data.map((obj) => ({
      ...obj,
    }));
  },
  /**
   *
   * @param {AccountState} state
   * @param {Object} data
   */
  setMembership(state, data) {
    state.membership = {
      ...data,
    };
  },
  /**
   *
   * @param {AccountState} state
   * @param {Object} data
   */
  setBuyMembershipTx(state, data) {
    state.buyMembershipTx = {
      ...data,
    };
  },
  /**
   *
   * @param {AccountState} state
   * @param {Object} data
   */
  setRewards(state, data) {
    state.rewards = {
      ...data,
    };
  },
};
