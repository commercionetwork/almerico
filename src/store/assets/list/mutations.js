import { set } from 'lodash';
import { initState } from './index';

export default {
  reset(state) {
    Object.assign(state, initState());
  },
  setError(state, payload) {
    state.error = payload;
  },
  setLoading(state, payload) {
    state.isLoading = payload;
  },
  addBalancesProp(state, payload) {
    const obj = { ...state.balances };
    set(obj, payload.path, payload.value);
    state.balances = { ...obj };
  },
  addContract(state, payload) {
    state.list.push(payload);
  },
  setSupply(state, payload) {
    state.supply = payload;
  },
};
