import { initState } from '../index';
import mutations from '../mutations';

describe('store/account-balance/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = initState();
  });

  test('mutations.reset', () => {
    state.error = new Error('error');
    state.isLoading = true;
    state.isHandling = true;
    state.balances = [{ id: 1 }];
    state.cw20 = { id: 1 };

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

  test('mutations.setHandling', () => {
    mutations.setHandling(state, true);

    expect(state.isHandling).toBe(true);
  });

  test('mutations.setBalances', () => {
    const balances = [{ id: 1 }];

    mutations.setBalances(state, balances);

    expect(state.balances).toStrictEqual(balances);
  });

  test('mutations.setCW20', () => {
    const cw20 = { id: 1 };

    mutations.setCW20(state, cw20);

    expect(state.cw20).toStrictEqual(cw20);
  });
});
