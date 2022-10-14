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
  setList(state, payload) {
    state.list = payload;
  },
  setFilter(state, payload) {
    state.filter = payload;
  },
  setDetail(state, payload) {
    const detail = state.detail
      ? Object.assign(state.detail, payload)
      : Object.assign({}, payload);
    state.detail = detail;
  },
  setPool(state, payload) {
    state.pool = payload;
  },
  setTallyParams(state, payload) {
    state.tallyParams = payload;
  },
};
