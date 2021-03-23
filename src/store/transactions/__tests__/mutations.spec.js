import mutations from '../mutations';
import { initialState } from '../index';

describe('store/transactions/mutations', () => {
  let state = {};

  beforeEach(() => {
    state = {
      ...initialState,
    };
  });

  test('mutations.startLoading', () => {
    state.error = { message: 'error', status: 400 };

    mutations.startLoading(state);

    expect(state.error).toBeNull;
    expect(state.isLoading).toBe(true);
  });

  test('mutations.stopLoading', () => {
    state.isLoading = true;

    mutations.stopLoading(state);

    expect(state.isLoading).toBe(false);
  });

  test('mutations.setError', () => {
    const error = { message: 'error', status: 400 };

    mutations.setError(state, error);

    expect(state.error).toStrictEqual(error);
  });

  test('mutations.setFilter', () => {
    const filter = 'type';

    mutations.setFilter(state, filter);

    expect(state.filter).toBe(filter);
  });

  test('mutations.changePage', () => {
    const page = 2;

    mutations.changePage(state, page);

    expect(state.currentPage).toBe(page);
  });

  test('mutations.setHasNext', () => {
    state.hasNext = false;

    mutations.setHasNext(state, 2);

    expect(state.hasNext).toBe(true);

    mutations.setHasNext(state, 1);

    expect(state.hasNext).toBe(false);
  });

  test('mutations.addTransactions', () => {
    const data = [
      {
        id: 1,
      },
    ];

    state.transactions = data.map((obj) => ({
      ...obj,
    }));

    const newData = [
      {
        id: 2,
      },
    ];

    mutations.addTransactions(state, newData);

    const expectedValue = [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ];

    expect(state.transactions).toStrictEqual(expectedValue);
  });

  test('Check mutations.clearAllTransactions', () => {
    mutations.clearAllTransactions(state);

    expect(state.transactions).toStrictEqual([]);
  });

  test('Check mutations.addSingleTransaction', () => {
    const data = {
      hasNext: true,
      records: [
        {
          id: 1,
        },
      ],
    };

    state.transactions = data.records.map((obj) => ({
      ...obj,
    }));

    const newTransaction = {
      id: 2,
    };

    mutations.addSingleTransaction(state, newTransaction);

    const expectedValue = [
      {
        id: 2,
      },
      {
        id: 1,
      },
    ];
    expect(state.transactions).toStrictEqual(expectedValue);
  });

  test('Check mutations.setTransactionDetails', () => {
    const transaction = {
      id: 1,
    };

    mutations.setTransactionDetails(state, transaction);

    expect(state.details).toStrictEqual(transaction);
  });
});
