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
  setProposals(state, payload) {
    state.list = payload;
  },
  addProposals(state, payload) {
    state.list.push(...payload);
  },
  setAdding(state, payload) {
    state.isAdding = payload;
  },
  setPagination(state, payload) {
    state.pagination = payload;
  },
  setOffset(state, payload) {
    state.offset = payload;
  },
  sumOffset(state, payload) {
    state.offset += payload;
  },
  setDetail(state, payload) {
    state.detail = payload;
  },
};
