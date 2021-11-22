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
    state.abrTokens = [{ id: 1 }];
    state.pool = { id: 1 };

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

  test('mutations.setAbrTokens', () => {
    const payload = [{ denom: 'ucommercio', amount: '1' }];

    mutations.setAbrTokens(state, payload);

    expect(state.abrTokens).toStrictEqual(payload);
  });

  test('mutations.setAccounts', () => {
    const payload = [{ id: 1 }];

    mutations.setAccounts(state, payload);

    expect(state.accounts).toStrictEqual(payload);
  });

  test('mutations.addAccount', () => {
    state.accounts = [{ id: 1 }];
    const payload = { id: 2 };
    const expected = [{ id: 1 }, { id: 2 }];

    mutations.addAccount(state, payload);

    expect(state.accounts).toStrictEqual(expected);
  });

  test('mutations.setFreezedTokens', () => {
    const payload = { id: 1 };

    mutations.setFreezedTokens(state, payload);

    expect(state.freezedTokens).toStrictEqual(payload);
  });

  test('mutations.setPool', () => {
    const payload = { id: 1 };

    mutations.setPool(state, payload);

    expect(state.pool).toStrictEqual(payload);
  });

  test('mutations.setSupply', () => {
    const payload = [{ denom: 'ucommercio', amount: '1' }];

    mutations.setSupply(state, payload);

    expect(state.supply).toStrictEqual(payload);
  });

  test('mutations.setVbrTokens', () => {
    const payload = [{ denom: 'ucommercio', amount: '1' }];

    mutations.setVbrTokens(state, payload);

    expect(state.vbrTokens).toStrictEqual(payload);
  });
});
