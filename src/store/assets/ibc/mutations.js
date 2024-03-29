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
  setHandling(state, payload) {
    state.isHandling = payload;
  },
  setModal(state, payload) {
    state.modal = payload;
  },
  addModalProp(state, payload) {
    const obj = { ...state.modal };
    set(obj, payload.path, payload.value);
    state.modal = { ...obj };
  },
};
