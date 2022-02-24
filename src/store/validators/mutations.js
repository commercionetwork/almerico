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
  setLoadingBlocks(state, payload) {
    state.isLoadingBlocks = payload;
  },
  setBlocks(state, payload) {
    state.blocks = payload;
  },
  addBlock(state, payload) {
    state.blocks.push(payload);
  },
  setNewHeight(state, payload) {
    state.newHeight = payload;
  },
  setFilter(state, payload) {
    state.filter = payload;
  },
  setPool(state, payload) {
    state.pool = payload;
  },
  setDetail(state, payload) {
    state.detail = payload;
  },
  setDelegations(state, payload) {
    state.delegations = payload;
  },
  addDelegations(state, payload) {
    state.delegations.push(...payload);
  },
  setDelegationsOffset(state, payload) {
    state.delegationsOffset = payload;
  },
  sumDelegationsOffset(state, payload) {
    state.delegationsOffset += payload;
  },
  setDelegationsPagination(state, payload) {
    state.delegationsPagination = payload;
  },
};
