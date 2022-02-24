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
  setLoadingParams(state, payload) {
    state.isLoadingParams = payload;
  },
  setLoadingTxs(state, payload) {
    state.isLoadingTxs = payload;
  },
  setParamsUpdates(state, payload) {
    state.paramsUpdates = payload;
  },
  addParamsUpdates(state, payload) {
    state.paramsUpdates.push(...payload);
  },
  setParamsUpdatesOffset(state, payload) {
    state.paramsUpdatesOffset = payload;
  },
  sumParamsUpdatesOffset(state, payload) {
    state.paramsUpdatesOffset += payload;
  },
  setParamsUpdatesPagination(state, payload) {
    state.paramsUpdatesPagination = payload;
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
  setFreezedTokens(state, payload) {
    state.freezedTokens = payload;
  },
  setParams(state, payload) {
    state.params = payload;
  },
  setSetParamsEventHeight(state, payload) {
    state.setParamsEventHeight = payload;
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
