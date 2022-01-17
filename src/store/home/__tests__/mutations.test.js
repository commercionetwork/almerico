import { initState } from '../index';
import mutations from '../mutations';

describe('store/home/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = initState();
  });

  test('mutations.reset', () => {
    state.error = new Error('error');
    state.isLoading = true;
    state.rateUpdates = [{ id: 1 }];
    state.rateUpdatesOffset = 10;
    state.rateUpdatesPagination = {
      next_key: 'string',
      total: 'string',
    };

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

  test('mutations.setConversionRate', () => {
    const payload = '1.000000000000000000';
    mutations.setConversionRate(state, payload);

    expect(state.conversionRate).toBe(parseFloat(payload));
  });

  test('mutations.setRateUpdates', () => {
    const txs = [{ id: 1 }];

    mutations.setRateUpdates(state, txs);

    expect(state.rateUpdates).toStrictEqual(txs);
  });

  test('mutations.addRateUpdates', () => {
    state.rateUpdates = [{ id: 1 }];
    const payload = [{ id: 2 }];
    const expected = [{ id: 1 }, { id: 2 }];

    mutations.addRateUpdates(state, payload);

    expect(state.rateUpdates).toStrictEqual(expected);
  });

  test('mutations.setRateUpdatesOffset', () => {
    const payload = 10;
    mutations.setRateUpdatesOffset(state, payload);

    expect(state.rateUpdatesOffset).toBe(payload);
  });

  test('mutations.sumRateUpdatesOffset', () => {
    const payload = 10;
    mutations.sumRateUpdatesOffset(state, payload);

    expect(state.rateUpdatesOffset).toBe(payload);

    mutations.sumRateUpdatesOffset(state, payload);

    expect(state.rateUpdatesOffset).toBe(payload + payload);
  });

  test('mutations.setRateUpdatesPagination', () => {
    const pagination = {
      next_key: 'string',
      total: 'string',
    };

    mutations.setRateUpdatesPagination(state, pagination);

    expect(state.rateUpdatesPagination).toStrictEqual(pagination);
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
