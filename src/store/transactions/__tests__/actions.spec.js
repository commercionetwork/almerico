import actions from '../actions.js';
import { mockTx, mockTxs } from '../__mocks__/txs';
import { API, CHAIN } from '@/constants';

const mockErrorResponse = {
  request: {},
  response: {
    data: {
      error: 'error',
    },
    status: 400,
  },
};
const mockErrorResponseNotFound = {
  request: {},
  response: {
    data: {
      error: 'error',
    },
    status: 404,
  },
};
const mockErrorRequestResponse = {
  request: {},
  response: undefined,
};

let mockError = false;
let mockErrorNotFound = false;
let mockErrorRequest = false;
let mockErrorServer = false;
let mockResponse = null;

describe('store/transactions/actions', () => {
  beforeEach(() => {
    mockError = false;
    mockErrorNotFound = false;
    mockErrorRequest = false;
    mockErrorServer = false;
    mockResponse = null;
  });

  test("Check if 'actions.fetchTransaction' reset outdated tx details and set new tx", async () => {
    const commit = jest.fn();

    await actions.fetchTransaction({ commit }, 1);

    expect(commit).toHaveBeenCalledWith('setTransactionDetails', null);
    expect(commit).toHaveBeenCalledWith('setTransactionDetails', {
      data: mockResponse.data,
      ledger: API.LCD,
      version: '',
    });
  });

  // test("Check if 'actions.fetchTransaction' search tx details from ancestors", async () => {
  //   const commit = jest.fn();
  //   const ancestors = JSON.parse(CHAIN.ANCESTORS);

  //   mockErrorNotFound = true;

  //   await actions.fetchTransaction({ commit }, 1);

  //   expect(commit).toHaveBeenCalledWith('setTransactionDetails', {
  //     data: mockResponse.data,
  //     ledger: ancestors[0].lcd_ledger,
  //     version: ancestors[0].ver,
  //   });
  // });
});

jest.mock('./../api', () => ({
  requestTransaction: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockErrorNotFound) {
          reject(mockErrorResponseNotFound);
        }
        if (mockError) {
          reject(mockErrorResponse);
        }
        if (mockErrorRequest) {
          reject(mockErrorRequestResponse);
        }
        if (mockErrorServer) {
          reject({});
        }

        mockResponse = {
          data: mockTx(),
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestAncestorTransaction: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }
        if (mockErrorRequest) {
          reject(mockErrorRequestResponse);
        }
        if (mockErrorServer) {
          reject({});
        }

        mockResponse = {
          data: mockTx(),
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestSearchTransactions: (txs = 10) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }
        if (mockErrorRequest) {
          reject(mockErrorRequestResponse);
        }
        if (mockErrorServer) {
          reject({});
        }

        mockResponse = {
          data: {
            total_count: `${txs}`,
            count: `${txs}`,
            page_number: '1',
            page_total: '1',
            limit: `${txs}`,
            txs: mockTxs(txs),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestBlockTransactions: (txs = 1) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }
        if (mockErrorRequest) {
          reject(mockErrorRequestResponse);
        }
        if (mockErrorServer) {
          reject({});
        }

        mockResponse = {
          data: {
            total_count: `${txs}`,
            count: `${txs}`,
            page_number: '1',
            page_total: '1',
            limit: `${txs}`,
            txs: mockTxs(txs),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
