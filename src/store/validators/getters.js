export default {
  error: (state) => state.error,
  isLoading: (state) => state.isLoading,
  isUpdating: (state) => state.isUpdating,
  detail: (state) => state.detail,
  list: (state) => state.list,
  newBlock: (state) => state.newBlock,
  delegations: (state) => state.delegations,
  delegationsOffset: (state) => state.delegationsOffset,
  delegationsTotal: (state) => state.delegationsPagination.total,
  filter: (state) => state.filter,
};
