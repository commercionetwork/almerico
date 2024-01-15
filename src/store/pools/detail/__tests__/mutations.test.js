import { initState } from '../index';
import mutations from '../mutations';

describe('store/poolsDetail/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = initState();
  });

  test('mutations.reset', () => {
    state.error = 'error';
    state.isLoading = true;
    state.isHandling = true;
    state.hasWallet = false;
    state.contract = { id: 1 };

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

  test('mutations.setHandling', () => {
    mutations.setHandling(state, true);

    expect(state.isHandling).toBe(true);
  });

  test('mutations.setHasWallet', () => {
    mutations.setHasWallet(state, false);

    expect(state.hasWallet).toBe(false);
  });

  test('mutations.setContractProp', () => {
    state.contract = { id: 1 };

    mutations.setContractProp(state, { path: 'prop', value: 'prop' });

    const expected = { id: 1, prop: 'prop' };
    expect(state.contract).toStrictEqual(expected);
  });
});
