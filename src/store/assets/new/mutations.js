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
  setIsInvalid(state, payload) {
    state.isInvalid = payload;
  },
  setGovernment(state, payload) {
    state.government = payload;
  },
  addPropToNewCW20(state, payload) {
    const cw20 = Object.assign({}, state.newCW20, payload);
    state.newCW20 = cw20;
  },
};
