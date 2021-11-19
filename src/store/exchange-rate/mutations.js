export default {
  setError(state, error) {
    state.error = error;
  },
  setLoading(state, payload) {
    state.isLoading = payload;
  },
  setAbrTokens(state, payload) {
    state.abrTokens = payload;
  },
  setAccounts(state, payload) {
    state.accounts = payload;
  },
  addAccount(state, payload) {
    state.accounts.push(payload);
  },
  setFreezedTokens(state, payload) {
    state.freezedTokens = payload;
  },
  setPool(state, payload) {
    state.pool = payload;
  },
  setSupply(state, payload) {
    state.supply = payload;
  },
  setVbrTokens(state, payload) {
    state.vbrTokens = payload;
  },
};
