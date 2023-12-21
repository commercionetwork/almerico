import { initState } from '../index';
import mutations from '../mutations';

describe('store/dex/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = initState();
  });

  test('mutations.reset', () => {
    state.error = 'error';
    state.isLoading = true;
    state.isFetching = true;
    state.isHandling = true;
    state.hasWallet = false;
    state.detail = { id: 1 };
    state.list = [{ id: 1 }];

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

  test('mutations.setFetching', () => {
    mutations.setFetching(state, true);

    expect(state.isFetching).toBe(true);
  });

  test('mutations.setHandling', () => {
    mutations.setHandling(state, true);

    expect(state.isHandling).toBe(true);
  });

  test('mutations.setHasWallet', () => {
    mutations.setHasWallet(state, false);

    expect(state.hasWallet).toBe(false);
  });

  test('mutations.addContract', () => {
    const payload = { id: 1 };

    mutations.addContract(state, payload);

    expect(state.list).toStrictEqual([payload]);
  });

  test('mutations.setContracts', () => {
    const payload = [{ id: 1 }];

    mutations.setContracts(state, payload);

    expect(state.list).toStrictEqual(payload);
  });

  test('mutations.setContractProp', () => {
    state.detail = { id: 1 };

    mutations.setContractProp(state, { path: 'prop', value: 'prop' });

    const expected = { id: 1, prop: 'prop' };
    expect(state.detail).toStrictEqual(expected);
  });
});
