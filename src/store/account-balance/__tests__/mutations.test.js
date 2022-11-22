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
    state.balances = [{ id: 1 }];
    state.cw20Contracts = [{ id: 1 }];
    state.swapContracts = [{ id: 1 }];

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

  test('mutations.setBalances', () => {
    const balances = [{ id: 1 }];

    mutations.setBalances(state, balances);

    expect(state.balances).toStrictEqual(balances);
  });

  test('mutations.addCw20Contracts', () => {
    state.cw20Contracts = [{ id: 1 }];
    const contracts = [{ id: 2 }];
    const expected = [{ id: 1 }, { id: 2 }];

    mutations.addCw20Contracts(state, contracts);

    expect(state.cw20Contracts).toStrictEqual(expected);
  });

  test('mutations.addSwapContract', () => {
    state.swapContracts = [{ id: 1 }];
    const contract = { id: 2 };
    const expected = [{ id: 1 }, { id: 2 }];

    mutations.addSwapContract(state, contract);

    expect(state.swapContracts).toStrictEqual(expected);
  });
});
