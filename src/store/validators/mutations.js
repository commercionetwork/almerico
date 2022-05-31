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
  setUpdating(state, payload) {
    state.isUpdating = payload;
  },
  setDetail(state, payload) {
    state.detail = payload;
  },
  setList(state, payload) {
    state.list = payload;
  },
  setNewUpdate(state, payload) {
    state.newUpdate = payload;
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
  setFilter(state, payload) {
    state.filter = payload;
  },
};
