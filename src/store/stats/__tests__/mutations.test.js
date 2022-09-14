import { initState } from '../index';
import mutations from '../mutations';

describe('store/stats/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = initState();
  });

  test('mutations.reset', () => {
    state.error = 'error';
    state.isLoading = true;
    state.wallets = [{ id: 1 }];

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

  test('mutations.addWallet', () => {
    state.wallets = [{ id: 1 }];
    const payload = { id: 2 };
    const expectedValue = [{ id: 1 }, { id: 2 }];

    mutations.addWallet(state, payload);

    expect(state.wallets).toStrictEqual(expectedValue);
  });
});
