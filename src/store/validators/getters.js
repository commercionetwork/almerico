export default {
  blocks: (state) => state.blocks,
  delegations: (state) => state.delegations,
  delegationsOffset: (state) => state.delegationsOffset,
  delegationsTotal: (state) => state.delegationsPagination.total,
  detail: (state) => state.detail,
  error: (state) => state.error,
  filter: (state) => state.filter,
  isLoading: (state) => state.isLoading,
  isLoadingBlocks: (state) => state.isLoadingBlocks,
  newHeight: (state) => state.newHeight,
  pool: (state) => state.pool,
};
