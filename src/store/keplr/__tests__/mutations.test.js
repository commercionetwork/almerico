import { initState } from '../index';
import mutations from '../mutations';

describe('store/proposals/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = initState();
  });

  test('mutations.reset', () => {
    state.error = 'error';
    state.isLoading = true;
    state.isInitialized = true;
    state.hasKeplr = false;
    state.accounts = [{ id: 1 }];

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

  test('mutations.setIsInitialized', () => {
    mutations.setIsInitialized(state, true);

    expect(state.isInitialized).toBe(true);
  });

  test('mutations.setHasKeplr', () => {
    mutations.setHasKeplr(state, false);

    expect(state.hasKeplr).toBe(false);
  });

  test('mutations.setAccounts', () => {
    const payload = [{ id: 1 }];

    mutations.setAccounts(state, payload);

    expect(state.accounts).toStrictEqual(payload);
  });
});
