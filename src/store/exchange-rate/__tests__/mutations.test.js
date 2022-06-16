import { initState } from '../index';
import mutations from '../mutations';

describe('store/exchange-rate/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = initState();
  });

  test('mutations.reset', () => {
    state.error = new Error('error');
    state.isLoading = true;
    state.chart = { id: 1 };
    state.overview = { id: 1 };

    const expected = initState();

    mutations.reset(state);

    expect(state).toStrictEqual(expected);
  });

  test('mutations.setError', () => {
    const payload = { message: 'error' };

    mutations.setError(state, payload);

    expect(state.error).toBe(payload);
  });

  test('mutations.setLoading', () => {
    mutations.setLoading(state, true);

    expect(state.isLoading).toBe(true);
  });

  test('mutations.setChart', () => {
    const payload = { id: 1 };

    mutations.setChart(state, payload);

    expect(state.chart).toStrictEqual(payload);
  });

  test('mutations.setOverview', () => {
    const payload = { id: 1 };

    mutations.setOverview(state, payload);

    expect(state.overview).toStrictEqual(payload);
  });
});
