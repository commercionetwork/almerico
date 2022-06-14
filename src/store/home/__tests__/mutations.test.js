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
    state.isLoadingParams = true;
    state.isLoadingTxs = true;
    state.params = { id: 1 };
    state.paramsUpdates = [{ id: 1 }];
    state.paramsUpdatesOffset = 10;
    state.paramsUpdatesPagination = {
      next_key: 'string',
      total: 'string',
    };
    state.setParamsEventHeight = 'setParamsEventHeight';
    state.startingDate = 'startingDate';
    state.tokensChart = { id: 1 };
    state.transactions = [{ id: 1 }];
    state.txEventHeight = 'txEventHeight';

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

  test('mutations.setLoadingParams', () => {
    mutations.setLoadingParams(state, true);

    expect(state.isLoadingParams).toBe(true);
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

  test('mutations.setParams', () => {
    const params = { id: 1 };

    mutations.setParams(state, params);

    expect(state.params).toStrictEqual(params);
  });

  test('mutations.setTokensChart', () => {
    const chart = { id: 1 };

    mutations.setTokensChart(state, chart);

    expect(state.tokensChart).toStrictEqual(chart);
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

  test('mutations.setSetParamsEventHeight', () => {
    const payload = '1';
    mutations.setSetParamsEventHeight(state, payload);

    expect(state.setParamsEventHeight).toBe(payload);
  });
});
