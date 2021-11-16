export default {
  balances: (state) => state.balances,
  delegations: (state) => state.delegations,
  isLoading: (state) => state.isLoading,
  isAddingTxs: (state) => state.isAddingTxs,
  membership: (state) => state.membership,
  membershipTxs: (state) => state.membershipTxs,
  rewards: (state) => state.rewards,
  transactions: (state) => state.transactions,
  transactionsOffset: (state) => state.transactionsOffset,
  transactionsTotal: (state) => state.transactionsPagination.total,
  unbondings: (state) => state.unbondings,
  unbondingsNextKey: (state) => state.unbondingsPagination.next_key,
};
