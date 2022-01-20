import { APIS, SETTINGS } from '@/constants';
import {
  mockErrors,
  mockPagination,
  mockTransaction,
  mockTransactionLegacy,
  mockTransactions,
} from '@/__mocks__';
import actions from '../actions.js';

const mockErrorResponse = mockErrors(400);
const mockErrorResponseNotFound = mockErrors(404);
let mockError = false;
let mockErrorNotFound = false;
let mockResponse = null;

describe('store/transactions/actions', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    mockError = false;
    mockErrorNotFound = false;
    mockResponse = null;
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.env = OLD_ENV;
  });

  test('if "initTransactionsList" reset store, set loading state and dispatch "fetchTransactions"', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.initTransactionsList({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchTransactions', {
      query: 'tx.height >= 1',
      offset: 0,
    });
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "searchTransactions" reset store, set loading state, and dispatch "fetchTransactions"', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const query = 'query';
    const offset = '10';

    await actions.searchTransactions({ commit, dispatch }, { query, offset });

    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(commit).toHaveBeenCalledWith('setTransactions', []);
    expect(dispatch).toHaveBeenCalledWith('fetchTransactions', {
      query,
      offset,
    });
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "fetchTransactions" commit "addTransactions", "setPagination" and "sumOffset", and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchTransactions({ commit }, { query: 'query', offset: 0 });

    expect(commit).toHaveBeenCalledWith(
      'addTransactions',
      mockResponse.data.tx_responses,
    );
    expect(commit).toHaveBeenCalledWith(
      'setPagination',
      mockResponse.data.pagination,
    );
    expect(commit).toHaveBeenCalledWith(
      'sumOffset',
      mockResponse.data.tx_responses.length,
    );

    mockError = true;

    await actions.fetchTransactions({ commit }, { query: 'query', offset: 0 });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "addTransactions" set loading state and dispatch "fetchTransactions"', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const query = 'query';
    const offset = '10';

    await actions.addTransactions({ commit, dispatch }, { query, offset });

    expect(commit).toHaveBeenCalledWith('setAddingTxs', true);
    expect(dispatch).toHaveBeenCalledWith('fetchTransactions', {
      query,
      offset,
    });
    expect(commit).toHaveBeenCalledWith('setAddingTxs', false);
  });

  test('if "refreshTransactions" reset txs, set loading state and dispatch "fetchTransactions"', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.refreshTransactions({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith('setTransactions', []);
    expect(commit).toHaveBeenCalledWith('setRefreshing', true);
    expect(dispatch).toHaveBeenCalledWith('fetchTransactions', {
      query: 'tx.height >= 1',
      offset: 0,
    });
    expect(commit).toHaveBeenCalledWith('setRefreshing', false);
  });

  test('if "initTransactionsDetail" reset store, set loading state and dispatch "fetchTransactionByHash"', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const hash = 'hash';

    await actions.initTransactionsDetail({ commit, dispatch }, hash);

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchTransactionByHash', hash);
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "fetchTransactionByHash" action commit "setDetail", dispatch "fetchAncestorsTransaction" if an error occurs and ancestors are set, set the error if it is caught and there is not ancestors', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const hash = 'hash';

    await actions.fetchTransactionByHash({ commit, dispatch }, hash);

    expect(commit).toHaveBeenCalledWith('setDetail', {
      data: mockResponse.data,
      ledger: APIS.HTTP.LCD,
      version: '',
    });

    mockError = true;
    const ancestors = JSON.parse(process.env.VUE_APP_ANCESTORS);

    await actions.fetchTransactionByHash({ commit, dispatch }, hash);

    expect(dispatch).toHaveBeenCalledWith('fetchAncestorsTransaction', {
      hash,
      ancestors,
    });

    process.env.VUE_APP_ANCESTORS = '[]';

    await actions.fetchTransactionByHash({ commit, dispatch }, hash);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchAncestorsTransaction" action commit "setDetail",  and set the error if it is caught', async () => {
    const commit = jest.fn();
    const hash = 'hash';
    const ancestors = JSON.parse(process.env.VUE_APP_ANCESTORS);

    await actions.fetchAncestorsTransaction({ commit }, { hash, ancestors });

    for (const ancestor of ancestors) {
      expect(commit).toHaveBeenCalledWith('setDetail', {
        data: mockResponse.data,
        ledger: ancestor.lcd_ledger,
        version: ancestor.ver,
      });
    }

    mockError = true;

    await actions.fetchAncestorsTransaction({ commit }, { hash, ancestors });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });
});

jest.mock('../../../apis/http/tx.js', () => ({
  requestTxsList: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            tx: {},
            tx_responses: mockTransactions(),
            pagination: mockPagination(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestTxByHash: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockErrorNotFound) {
          reject(mockErrorResponseNotFound);
        }
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            tx: {},
            tx_response: mockTransaction(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestTxByHashLegacy: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockErrorNotFound) {
          reject(mockErrorResponseNotFound);
        }
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            tx: {},
            tx_response: mockTransactionLegacy(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
