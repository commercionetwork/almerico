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
  setBalances(state, payload) {
    state.balances = payload;
  },
  addCw20Contracts(state, payload) {
    state.cw20Contracts.push(...payload);
  },
  addSwapContract(state, payload) {
    state.swapContracts.push(payload);
  },
};
