import { initState } from '../index';
import mutations from '../mutations';

describe('store/dexDetail/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = initState();
  });

  test('mutations.reset', () => {
    state.error = 'error';
    state.isLoading = true;

    const expected = initState();

    mutations.reset(state);

    expect(state).toStrictEqual(expected);
  });

  test('mutations.setError', () => {
    const payload = 'error';

    mutations.setError(state, payload);

    expect(state.error).toBe(payload);
  });

  test('mutations.setLoading', () => {
    mutations.setLoading(state, true);

    expect(state.isLoading).toBe(true);
  });
});
