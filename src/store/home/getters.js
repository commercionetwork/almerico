export default {
  abrTokens: (state) => state.abrTokens,
  error: (state) => state.error,
  freezedTokens: (state) => state.freezedTokens,
  isLoading: (state) => state.isLoading,
  isLoadingTxs: (state) => state.isLoadingTxs,
  conversionRate: (state) =>
    state.params ? parseFloat(state.params.conversion_rate) : 1,
  pool: (state) => state.pool,
  rateUpdates: (state) => state.rateUpdates,
  rateUpdatesOffset: (state) => state.rateUpdatesOffset,
  rateUpdatesPagination: (state) => state.rateUpdatesPagination,
  rateUpdatesTotal: (state) => state.rateUpdatesPagination.total,
  startingDate: (state) => state.startingDate,
  supply: (state) => state.supply,
  transactions: (state) => state.transactions,
  txEventHeight: (state) => state.txEventHeight,
  vbrTokens: (state) => state.vbrTokens,
};
