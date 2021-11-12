export default {
  blockTxs: (state) => state.blockTxs,
  blockTxsNextKey: (state) => state.blockTxsPagination.next_key,
  blockTxsPagination: (state) => state.blockTxsPagination,
  blockValidatorSets: (state) => state.blockValidatorSets,
  blocks: (state) => state.blocks,
  currentHeight: (state) => state.currentHeight,
  detail: (state) => state.detail,
  isLoading: (state) => state.isLoading,
  isAddingBlocks: (state) => state.isAddingBlocks,
};
