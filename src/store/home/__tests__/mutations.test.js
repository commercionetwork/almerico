import mutations from '../mutations';
import store from '../index';

describe('store/home/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = {
      ...store.initialState,
    };
  });

  test('mutations.setLoading', () => {
    mutations.setLoading(state, true);

    expect(state.isLoading).toBe(true);
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

  test('mutations.setAddingTx', () => {
    mutations.setAddingTx(state, true);

    expect(state.isAddingTx).toBe(true);
  });

  test('mutations.setTxEventHeight', () => {
    const payload = '1';
    mutations.setTxEventHeight(state, payload);

    expect(state.txEventHeight).toBe(payload);
  });
});
