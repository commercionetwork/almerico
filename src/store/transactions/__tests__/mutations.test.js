import mutations from '../mutations';
import { initState } from '../index';

describe('store/transactions/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = initState();
  });

  test('mutations.reset', () => {
    state.error = new Error('error');
    state.isLoading = true;
    state.transactions = [{ id: 1 }];
    state.offset = 10;
    state.pagination = {
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

  test('mutations.setAddingTxs', () => {
    mutations.setAddingTxs(state, true);

    expect(state.isAddingTxs).toBe(true);
  });

  test('mutations.setTransactions', () => {
    const payload = [{ id: 1 }];
    mutations.setTransactions(state, payload);

    expect(state.transactions).toStrictEqual(payload);
  });

  test('mutations.addTransactions', () => {
    state.transactions = [{ id: 1 }];
    const payload = [{ id: 2 }];
    const expected = [{ id: 1 }, { id: 2 }];
    mutations.addTransactions(state, payload);

    expect(state.transactions).toStrictEqual(expected);
  });

  test('mutations.setPagination', () => {
    const payload = { next_key: 'next_key', total: 'total' };
    mutations.setPagination(state, payload);

    expect(state.pagination).toStrictEqual(payload);
  });

  test('mutations.setOffset', () => {
    const payload = 10;
    mutations.setOffset(state, payload);

    expect(state.offset).toBe(payload);
  });

  test('mutations.sumOffset', () => {
    const payload = 10;
    mutations.sumOffset(state, payload);

    expect(state.offset).toBe(payload);

    mutations.sumOffset(state, payload);

    expect(state.offset).toBe(payload + payload);
  });

  test('mutations.setDetail', () => {
    const payload = { id: 1 };
    mutations.setDetail(state, payload);

    expect(state.detail).toStrictEqual(payload);
  });
});
