import { initState } from '../index';
import mutations from '../mutations';

describe('store/home/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = initState();
  });

  test('mutations.reset', () => {
    state.abrTokens = [{ id: 1 }];
    state.error = new Error('error');
    state.freezedTokens = [{ id: 1 }];
    state.isLoading = true;
    state.isLoadingTxs = true;
    state.params = { id: 1 };
    state.paramsUpdates = [{ id: 1 }];
    state.paramsUpdatesOffset = 10;
    state.paramsUpdatesPagination = {
      next_key: 'string',
      total: 'string',
    };
    state.pool = { id: 1 };
    state.startingDate = 'startingDate';
    state.supply = [{ id: 1 }];
    state.transactions = [{ id: 1 }];
    state.txEventHeight = 'txEventHeight';
    state.vbrTokens = [{ id: 1 }];

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

  test('mutations.setLoadingTxs', () => {
    mutations.setLoadingTxs(state, true);

    expect(state.isLoadingTxs).toBe(true);
  });

  test('mutations.setParamsUpdates', () => {
    const txs = [{ id: 1 }];

    mutations.setParamsUpdates(state, txs);

    expect(state.paramsUpdates).toStrictEqual(txs);
  });

  test('mutations.addParamsUpdates', () => {
    state.paramsUpdates = [{ id: 1 }];
    const payload = [{ id: 2 }];
    const expected = [{ id: 1 }, { id: 2 }];

    mutations.addParamsUpdates(state, payload);

    expect(state.paramsUpdates).toStrictEqual(expected);
  });

  test('mutations.setParamsUpdatesOffset', () => {
    const payload = 10;
    mutations.setParamsUpdatesOffset(state, payload);

    expect(state.paramsUpdatesOffset).toBe(payload);
  });

  test('mutations.sumParamsUpdatesOffset', () => {
    const payload = 10;
    mutations.sumParamsUpdatesOffset(state, payload);

    expect(state.paramsUpdatesOffset).toBe(payload);

    mutations.sumParamsUpdatesOffset(state, payload);

    expect(state.paramsUpdatesOffset).toBe(payload + payload);
  });

  test('mutations.setParamsUpdatesPagination', () => {
    const pagination = {
      next_key: 'string',
      total: 'string',
    };

    mutations.setParamsUpdatesPagination(state, pagination);

    expect(state.paramsUpdatesPagination).toStrictEqual(pagination);
  });

  test('mutations.setStartingDate', () => {
    const date = '2021-02-11T15:58:02.264848898Z';

    mutations.setStartingDate(state, date);

    expect(state.startingDate).toBe(date);
  });

  test('mutations.setAbrTokens', () => {
    const abrTokens = [{ id: 1 }];

    mutations.setAbrTokens(state, abrTokens);

    expect(state.abrTokens).toStrictEqual(abrTokens);
  });

  test('mutations.setVbrTokens', () => {
    const vbrTokens = [{ id: 1 }];

    mutations.setVbrTokens(state, vbrTokens);

    expect(state.vbrTokens).toStrictEqual(vbrTokens);
  });

  test('mutations.setFreezedTokens', () => {
    const payload = [{ id: 1 }];

    mutations.setFreezedTokens(state, payload);

    expect(state.freezedTokens).toStrictEqual(payload);
  });

  test('mutations.setParams', () => {
    const params = { id: 1 };

    mutations.setParams(state, params);

    expect(state.params).toStrictEqual(params);
  });

  test('mutations.setPool', () => {
    const pool = { id: 1 };

    mutations.setPool(state, pool);

    expect(state.pool).toStrictEqual(pool);
  });

  test('mutations.setSupply', () => {
    const supply = [
      {
        denom: 'ucommercio',
        amount: '59999952300200',
      },
    ];

    mutations.setSupply(state, supply);

    expect(state.supply).toStrictEqual(supply);
  });

  test('mutations.setTransactions', () => {
    const txs = [{ id: 1 }];

    mutations.setTransactions(state, txs);

    expect(state.transactions).toStrictEqual(txs);
  });

  test('mutations.addTransactions', () => {
    state.transactions = [{ id: 1 }];
    const txs = [{ id: 2 }];
    const expected = [{ id: 1 }, { id: 2 }];

    mutations.addTransactions(state, txs);

    expect(state.transactions).toStrictEqual(expected);
  });

  test('mutations.setTxEventHeight', () => {
    const payload = '1';
    mutations.setTxEventHeight(state, payload);

    expect(state.txEventHeight).toBe(payload);
  });
});
