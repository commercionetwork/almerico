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
  addContract(state, payload) {
    state.list.push(payload);
  },
  setDetail(state, payload) {
    state.detail = payload;
  },
};
