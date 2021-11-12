export default {
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
  setDetail(state, payload) {
    state.detail = payload;
  },
};
