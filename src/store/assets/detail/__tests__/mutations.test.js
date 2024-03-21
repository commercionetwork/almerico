import { initState } from '../index';
import mutations from '../mutations';

describe('store/assetsDetail/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = initState();
  });

  test('mutations.reset', () => {
    state.error = new Error('error');
    state.isLoading = true;
    state.isHandling = true;
    state.detail = { id: 1 };

    const expected = initState();

    mutations.reset(state);

    expect(state).toStrictEqual(expected);
  });

  test('mutations.setError', () => {
    const payload = new Error('error');

    mutations.setError(state, payload);

    expect(state.error).toBe(payload);
  });

  test('mutations.setLoading', () => {
    mutations.setLoading(state, true);

    expect(state.isLoading).toBe(true);
  });

  test('mutations.setHandling', () => {
    mutations.setHandling(state, true);

    expect(state.isHandling).toBe(true);
  });

  test('mutations.setDetail', () => {
    const payload = { id: 1 };

    mutations.setDetail(state, payload);

    expect(state.detail).toStrictEqual(payload);
  });
});
