export default {
  error: (state) => state.error,
  isLoading: (state) => state.isLoading,
  isUpdating: (state) => state.isUpdating,
  detail: (state) => state.detail,
  list: (state) => state.list,
  delegations: (state) => state.delegations,
  delegationsOffset: (state) => state.delegationsOffset,
  delegationsTotal: (state) => state.delegationsPagination.total,
  filter: (state) => state.filter,
  isLoadingWallet: (state) => state.isLoadingWallet,
  wallet: (state) => state.wallet,
  walletDelegationsNextKey: (state) =>
    state.walletDelegationsPagination?.next_key,
  walletUnbondingsNextKey: (state) =>
    state.walletUnbondingsPagination?.next_key,
};
