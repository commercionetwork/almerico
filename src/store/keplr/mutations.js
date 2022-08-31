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
  setInitialized(state, payload) {
    state.isInitialized = payload;
  },
  setHasKeplr(state, payload) {
    state.hasKeplr = payload;
  },
  setAccounts(state, payload) {
    state.accounts = payload;
  },
};
