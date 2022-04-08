export default {
  error: (state) => state.error,
  isLoading: (state) => state.isLoading,
  list: (state) => state.list,
  isAdding: (state) => state.isAdding,
  total: (state) => state.pagination.total,
  offset: (state) => state.offset,
  detail: (state) => state.detail,
};
