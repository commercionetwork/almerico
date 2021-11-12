export default {
  setLoading(state, payload) {
    state.isLoading = payload;
  },
  setConversionRate(state, payload) {
    state.conversionRate = parseFloat(payload);
  },
  setRateUpdates(state, payload) {
    state.rateUpdates = payload;
  },
  addRateUpdates(state, payload) {
    state.rateUpdates.push(...payload);
  },
  setRateUpdatesPagination(state, payload) {
    state.rateUpdatesPagination = payload;
  },
  setStartingDate(state, payload) {
    state.startingDate = payload;
  },
  setAbrTokens(state, payload) {
    state.abrTokens = payload;
  },
  setVbrTokens(state, payload) {
    state.vbrTokens = payload;
  },
  setPool(state, payload) {
    state.pool = payload;
  },
  setSupply(state, payload) {
    state.supply = payload;
  },
  setTransactions(state, payload) {
    state.transactions = payload;
  },
  addTransactions(state, payload) {
    state.transactions.push(...payload);
  },
  setAddingTx(state, payload) {
    state.isAddingTx = payload;
  },
  setTxEventHeight(state, payload) {
    state.txEventHeight = payload;
  },
};