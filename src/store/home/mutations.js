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
  setLoadingTxs(state, payload) {
    state.isLoadingTxs = payload;
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
  setRateUpdatesOffset(state, payload) {
    state.rateUpdatesOffset = payload;
  },
  sumRateUpdatesOffset(state, payload) {
    state.rateUpdatesOffset += payload;
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
  setTxEventHeight(state, payload) {
    state.txEventHeight = payload;
  },
};
