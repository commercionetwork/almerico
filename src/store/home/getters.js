export default {
  error: (state) => state.error,
  isLoading: (state) => state.isLoading,
  isLoadingParams: (state) => state.isLoadingParams,
  isLoadingTxs: (state) => state.isLoadingTxs,
  conversionRate: (state) =>
    state.params ? parseFloat(state.params.conversion_rate) : 1,
  paramsUpdates: (state) => state.paramsUpdates,
  paramsUpdatesOffset: (state) => state.paramsUpdatesOffset,
  paramsUpdatesPagination: (state) => state.paramsUpdatesPagination,
  paramsUpdatesTotal: (state) => state.paramsUpdatesPagination.total,
  setParamsEventHeight: (state) => state.setParamsEventHeight,
  startingDate: (state) => state.startingDate,
  tokensChart: (state) => state.tokensChart,
  transactions: (state) => state.transactions,
  txEventHeight: (state) => state.txEventHeight,
};
