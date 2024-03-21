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
  setConnection(state, payload) {
    state.connection = payload;
  },
  addConnectionProp(state, payload) {
    const obj = { ...state.connection };
    set(obj, payload.path, payload.value);
    state.connection = { ...obj };
  },
  setModal(state, payload) {
    state.modal = payload;
  },
};
