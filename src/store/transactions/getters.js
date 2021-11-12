export default {
  detail: (state) => state.detail,
  isAddingTxs: (state) => state.isAddingTxs,
  isLoading: (state) => state.isLoading,
  nextKey: (state) => state.pagination.next_key,
  pagination: (state) => state.pagination,
  transactions: (state) => state.transactions,
};
