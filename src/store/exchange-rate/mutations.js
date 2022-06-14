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
  setChart(state, payload) {
    state.chart = payload;
  },
  setOverview(state, payload) {
    state.overview = payload;
  },
};
