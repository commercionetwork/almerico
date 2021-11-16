export default {
  detail: (state) => state.detail,
  isAddingTxs: (state) => state.isAddingTxs,
  isLoading: (state) => state.isLoading,
  offset: (state) => state.offset,
  pagination: (state) => state.pagination,
  total: (state) => state.pagination.total,
  transactions: (state) => state.transactions,
};
