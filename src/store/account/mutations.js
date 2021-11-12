export default {
  setLoading(state, payload) {
    state.isLoading = payload;
  },
  setBalances(state, payload) {
    state.balances = payload;
  },
  setDelegations(state, payload) {
    state.delegations = payload;
  },
  setRewards(state, payload) {
    state.rewards = payload;
  },
  setUnbondings(state, payload) {
    state.unbondings = payload;
  },
  addUnbondings(state, payload) {
    state.unbondings.push(...payload);
  },
  setUnbondingsPagination(state, payload) {
    state.unbondingsPagination = payload;
  },
  setMembership(state, payload) {
    state.membership = payload;
  },
  setMembershipTxs(state, payload) {
    state.membershipTxs = payload;
  },
  setAddingTxs(state, payload) {
    state.isAddingTxs = payload;
  },
  setTransactions(state, payload) {
    state.transactions = payload;
  },
  addTransactions(state, payload) {
    state.transactions.push(...payload);
  },
  setTransactionsPagination(state, payload) {
    state.transactionsPagination = payload;
  },
};
