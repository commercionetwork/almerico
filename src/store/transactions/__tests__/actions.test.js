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
  beforeEach(() => {
    mockError = false;
    mockErrorNotFound = false;
    mockResponse = null;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('if "initTransactionsList" set loading state, reset transactions, dispatch "fetchTransactionsList" action', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.initTransactionsList({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(commit).toHaveBeenCalledWith('setTransactions', []);
    expect(dispatch).toHaveBeenCalledWith('fetchTransactions');
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "fetchTransactions" commit "setTransactions" and "setPagination"', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.fetchTransactions({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith(
      'addTransactions',
      mockResponse.data.tx_responses,
    );
    expect(commit).toHaveBeenCalledWith(
      'setPagination',
      mockResponse.data.pagination,
    );
  });

  test('if "addTransactions" set loading state and dispatch action "fetchTransactions"', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const key = 'key';

    await actions.addTransactions({ commit, dispatch }, key);

    expect(commit).toHaveBeenCalledWith('setAddingTxs', true);
    expect(dispatch).toHaveBeenCalledWith('fetchTransactions', key);
    expect(commit).toHaveBeenCalledWith('setAddingTxs', false);
  });

  test('if "initTransactionsDetail" set loading state and dispatch "fetchTransactionByHash" action', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const hash = 'hash';

    await actions.initTransactionsDetail({ commit, dispatch }, hash);

    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchTransactionByHash', hash);
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "fetchTransactionByHash" action commit "setDetail", dispatch "fetchAncestorTransaction" if response status is equal to 404, and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const hash = 'hash';

    await actions.fetchTransactionByHash({ commit, dispatch }, hash);

    expect(commit).toHaveBeenCalledWith('setDetail', {
      data: mockResponse.data,
      ledger: APIS.HTTP.LCD,
      version: '',
    });

    mockErrorNotFound = true;

    await actions.fetchTransactionByHash({ commit, dispatch }, hash);

    expect(dispatch).toHaveBeenLastCalledWith('fetchAncestorTransaction', hash);

    mockErrorNotFound = false;
    mockError = true;

    await actions.fetchTransactionByHash({ commit, dispatch }, hash);

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse, {
      root: true,
    });
  });

  test('if "fetchAncestorTransaction" action commit "setDetail",  and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const hash = 'hash';

    await actions.fetchAncestorTransaction({ commit, dispatch }, hash);

    const ancestors = JSON.parse(SETTINGS.ANCESTORS);
    for (const ancestor of ancestors) {
      expect(commit).toHaveBeenCalledWith('setDetail', {
        data: mockResponse.data,
        ledger: ancestor.lcd_ledger,
        version: ancestor.ver,
      });
    }

    mockError = true;

    await actions.fetchTransactionByHash({ commit, dispatch }, hash);

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse, {
      root: true,
    });
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
            tx_response: mockTransactions(),
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