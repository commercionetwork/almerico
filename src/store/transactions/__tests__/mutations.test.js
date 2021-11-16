import mutations from '../mutations';
import store from '../index';

describe('store/transactions/mutations', () => {
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

    mutations.setOffset(state, payload);

    expect(state.offset).toBe(payload + payload);
  });

  test('mutations.setDetail', () => {
    const payload = { id: 1 };
    mutations.setDetail(state, payload);

    expect(state.detail).toStrictEqual(payload);
  });
});
