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
  setFetching(state, payload) {
    state.isFetching = payload;
  },
  setHandling(state, payload) {
    state.isHandling = payload;
  },
  setHasWallet(state, payload) {
    state.hasWallet = payload;
  },
  addContract(state, payload) {
    state.list.push(payload);
  },
  setContracts(state, payload) {
    state.list = payload;
  },
  setContractProp(state, payload) {
    const obj = { ...state.detail };
    set(obj, payload.path, payload.value);
    state.detail = { ...obj };
  },
};
