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
  setHandling(state, payload) {
    state.isHandling = payload;
  },
  setHasWallet(state, payload) {
    state.hasWallet = payload;
  },
  addContract(state, payload) {
    state.contracts.push(payload);
  },
  setBankTokens(state, payload) {
    state.bankTokens = payload;
  },
  setContracts(state, payload) {
    state.contracts = payload;
  },
  setWasmsTokens(state, payload) {
    state.wasmsTokens = payload;
  },
  setDex(state, payload) {
    state.dex = payload;
  },
};
