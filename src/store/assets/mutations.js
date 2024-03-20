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
  setFetching(state, payload) {
    state.isFetching = payload;
  },
  setHandling(state, payload) {
    state.isHandling = payload;
  },
  setConnection(state, payload) {
    state.connection = payload;
  },
  addConnectionProp(state, payload) {
    const obj = { ...state.connection };
    set(obj, payload.path, payload.value);
    state.connection = { ...obj };
  },
  setSupply(state, payload) {
    state.supply = payload;
  },
  addBalancesProp(state, payload) {
    const obj = { ...state.balances };
    set(obj, payload.path, payload.value);
    state.balances = { ...obj };
  },
  addContract(state, payload) {
    state.list.push(payload);
  },
  setModal(state, payload) {
    state.modal = payload;
  },
  setDetail(state, payload) {
    state.detail = payload;
  },
  addPropToNewCW20(state, payload) {
    const cw20 = Object.assign({}, state.newCW20, payload);
    state.newCW20 = cw20;
  },
  setIsInvalid(state, payload) {
    state.isInvalid = payload;
  },
  setGovernment(state, payload) {
    state.government = payload;
  },
};
