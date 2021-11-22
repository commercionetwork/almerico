export default {
  detail: (state) => state.detail,
  error: (state) => state.error,
  isAddingTxs: (state) => state.isAddingTxs,
  isLoading: (state) => state.isLoading,
  isRefreshing: (state) => state.isRefreshing,
  offset: (state) => state.offset,
  pagination: (state) => state.pagination,
  total: (state) => state.pagination.total,
  transactions: (state) => state.transactions,
  txEventHeight: (state) => state.txEventHeight,
};
