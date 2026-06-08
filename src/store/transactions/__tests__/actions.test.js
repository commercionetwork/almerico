import { APIS } from '@/constants';
import {
  mockErrors,
  mockTransaction,
  mockTransactionLegacy,
  mockTransactions,
} from '@/__mocks__';
import actions from '../actions.js';

const mockErrorResponse = mockErrors(400);
const mockErrorResponseNotFound = mockErrors(404);
let mockError = false;
let mockErrorNotFound = false;
let mockArchiveNotFound = false;
let mockResponse = null;

describe('store/transactions/actions', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    mockError = false;
    mockErrorNotFound = false;
    mockArchiveNotFound = false;
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
    expect(dispatch).toHaveBeenCalledWith(
      'fetchTransactions',
      APIS.SORTING_ORDERS.DESC
    );
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "fetchTransactions" commit "setTransactions", and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchTransactions({ commit }, APIS.SORTING_ORDERS.DESC);

    expect(commit).toHaveBeenCalledWith(
      'setTransactions',
      mockResponse.data.txs
    );

    mockError = true;

    await actions.fetchTransactions({ commit }, APIS.SORTING_ORDERS.DESC);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "refreshTransactions" reset txs, set loading state and dispatch "fetchTransactions"', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.refreshTransactions({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith('setTransactions', []);
    expect(commit).toHaveBeenCalledWith('setRefreshing', true);
    expect(dispatch).toHaveBeenCalledWith(
      'fetchTransactions',
      APIS.SORTING_ORDERS.DESC
    );
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
    const ancestors = [
      {
        lcd_ledger: 'http://10.0.0.1:7000',
        lcd: 'https://lcd-test.commercio.network/9000',
        ver: '0.38',
      },
    ];
    process.env.VUE_APP_ANCESTORS = JSON.stringify(ancestors);

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
    const ancestors = [
      {
        lcd_ledger: 'http://10.0.0.2:7000',
        lcd: 'https://archive-test.commercio.network/9000',
        ver: '0.45',
      },
      {
        lcd_ledger: 'http://10.0.0.1:7000',
        lcd: 'https://lcd-test.commercio.network/9000',
        ver: '0.38',
      },
    ];

    await actions.fetchAncestorsTransaction({ commit }, { hash, ancestors });

    expect(commit).toHaveBeenCalledWith('setDetail', {
      data: mockResponse.data,
      ledger: ancestors[0].lcd_ledger,
      version: ancestors[0].ver,
    });

    mockError = true;

    await actions.fetchAncestorsTransaction({ commit }, { hash, ancestors });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchAncestorsTransaction" falls back to the next ancestor when the archive node responds with 404', async () => {
    const commit = jest.fn();
    const hash = 'hash';
    const ancestors = [
      {
        lcd_ledger: 'http://10.0.0.2:7000',
        lcd: 'https://archive-test.commercio.network/9000',
        ver: '0.45',
      },
      {
        lcd_ledger: 'http://10.0.0.1:7000',
        lcd: 'https://lcd-test.commercio.network/9000',
        ver: '0.38',
      },
    ];
    mockArchiveNotFound = true;

    await actions.fetchAncestorsTransaction({ commit }, { hash, ancestors });

    expect(commit).toHaveBeenCalledWith('setDetail', {
      data: mockResponse.data,
      ledger: ancestors[1].lcd_ledger,
      version: ancestors[1].ver,
    });
    expect(commit).not.toHaveBeenCalledWith(
      'setError',
      mockErrorResponseNotFound
    );
  });

  test('if "fetchAncestorsTransaction" sets the error when the archive node fails with a non-404 status', async () => {
    const commit = jest.fn();
    const hash = 'hash';
    const ancestors = [
      {
        lcd_ledger: 'http://10.0.0.2:7000',
        lcd: 'https://archive-test.commercio.network/9000',
        ver: '0.45',
      },
      {
        lcd_ledger: 'http://10.0.0.1:7000',
        lcd: 'https://lcd-test.commercio.network/9000',
        ver: '0.38',
      },
    ];
    mockError = true;

    await actions.fetchAncestorsTransaction({ commit }, { hash, ancestors });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
    expect(commit).not.toHaveBeenCalledWith('setDetail', expect.anything());
  });
});

jest.mock('../../../apis/http/tx-api.js', () => ({
  requestTxs: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            txs: mockTransactions(),
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
  requestTxByHashArchive: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockArchiveNotFound || mockErrorNotFound) {
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
}));
