export default {
  blockTxs: (state) => state.blockTxs,
  blockTxsOffest: (state) => state.blockTxsOffest,
  blockTxsPagination: (state) => state.blockTxsPagination,
  blockTxsTotal: (state) => state.blockTxsPagination.total,
  blockValidatorSets: (state) => state.blockValidatorSets,
  blocks: (state) => state.blocks,
  currentHeight: (state) => state.currentHeight,
  detail: (state) => state.detail,
  isAddingBlocks: (state) => state.isAddingBlocks,
  isLoading: (state) => state.isLoading,
  newHeight: (state) => state.newHeight,
};
