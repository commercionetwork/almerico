import { initState } from './index';

export default {
  reset(state) {
    Object.assign(state, initState());
  },
  setError(state, error) {
    state.error = error;
  },
  setLoading(state, payload) {
    state.isLoading = payload;
  },
  setBlocks(state, payload) {
    state.blocks = payload;
  },
  setCurrentHeight(state, payload) {
    state.currentHeight = payload;
  },
  setNewHeight(state, payload) {
    state.newHeight = payload;
  },
  setAddingBlocks(state, payload) {
    state.isAddingBlocks = payload;
  },
  setSearching(state, payload) {
    state.isSearching = payload;
  },
  addBlock(state, payload) {
    state.blocks.push(payload);
  },
  setDetail(state, payload) {
    state.detail = payload;
  },
  setTransactions(state, payload) {
    state.blockTxs = payload;
  },
  addTransactions(state, payload) {
    state.blockTxs.push(...payload);
  },
  setBlockTxsOffset(state, payload) {
    state.blockTxsOffset = payload;
  },
  sumBlockTxsOffset(state, payload) {
    state.blockTxsOffset += payload;
  },
  setBlockTxsPagination(state, payload) {
    state.blockTxsPagination = payload;
  },
  setValidatorSets(state, payload) {
    state.blockValidatorSets = payload;
  },
  setSupposedTime(state, payload) {
    state.supposedTime = payload;
  },
};
