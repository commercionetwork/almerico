import { initState } from '../index';
import mutations from '../mutations';

describe('store/assetsList/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = initState();
  });

  test('mutations.reset', () => {
    state.error = new Error('error');
    state.isLoading = true;
    state.balances = { path_1: [{ id: 1 }] };
    state.list = [{ id: 1 }];
    state.supply = [{ id: 1 }];

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

  test('mutations.addBalancesProp', () => {
    state.balances = { path_1: [{ id: 1 }] };

    mutations.addBalancesProp(state, { path: 'path_2', value: [{ id: 2 }] });

    const expected = { path_1: [{ id: 1 }], path_2: [{ id: 2 }] };
    expect(state.balances).toStrictEqual(expected);
  });

  test('mutations.addContract', () => {
    const payload = { id: 1 };

    mutations.addContract(state, payload);

    expect(state.list).toStrictEqual([payload]);
  });

  test('mutations.setSupply', () => {
    const payload = [{ id: 1 }];

    mutations.setSupply(state, payload);

    expect(state.supply).toStrictEqual(payload);
  });
});
