import { set } from 'lodash';
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
  setBalances(state, payload) {
    state.balances = payload;
  },
  setContractProp(state, payload) {
    const obj = { ...state.contract };
    set(obj, payload.path, payload.value);
    state.contract = { ...obj };
  },
};
