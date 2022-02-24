import { initState } from './index';

export default {
  reset(state) {
    Object.assign(state, initState());
  },
  setError(state, error) {
    state.error = error;
  },
  setRefreshing(state, payload) {
    state.isRefreshing = payload;
  },
  setLoading(state, payload) {
    state.isLoading = payload;
  },
  setAddingTxs(state, payload) {
    state.isAddingTxs = payload;
  },
  setTransactions(state, payload) {
    state.transactions = payload;
  },
  addTransactions(state, payload) {
    state.transactions.push(...payload);
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
  setTxEventHeight(state, payload) {
    state.txEventHeight = payload;
  },
  setDetail(state, payload) {
    state.detail = payload;
  },
};
