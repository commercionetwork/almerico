import actions from '../actions.js';
import { mockTx, mockTxs } from '../__mocks__/txs';
import { API, CHAIN, CUSTOMIZATION } from '@/constants';

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
    const dispatch = jest.fn();
    const commit = jest.fn();

    await actions.fetchTransaction({ dispatch, commit }, 1);

    expect(commit).toHaveBeenCalledWith('setTransactionDetails', null);
    expect(commit).toHaveBeenCalledWith('setTransactionDetails', {
      data: mockResponse.data,
      ledger: API.LCD,
      version: '',
    });
  });

  test("Check if 'actions.fetchTransaction' search tx details from ancestors", async () => {
    const dispatch = jest.fn();
    const commit = jest.fn();
    const ancestors = JSON.parse(CHAIN.ANCESTORS);

    mockErrorNotFound = true;

    await actions.fetchTransaction({ dispatch, commit }, 1);

    expect(commit).toHaveBeenCalledWith('setTransactionDetails', {
      data: mockResponse.data,
      ledger: ancestors[0].lcd_ledger,
      version: ancestors[0].ver,
    });
  });

  test("Check if 'actions.getLastPage' set last page and has next page", async () => {
    const commit = jest.fn();

    await actions.getLastPage({ commit }, { limit: 10, query: '' });

    expect(commit).toHaveBeenCalledWith('changePage', 1);
    expect(commit).toHaveBeenCalledWith('setHasNext', 1);
  });

  test("Check if 'actions.getTransactions' add txs", async () => {
    const commit = jest.fn();

    await actions.getTransactions(
      { commit },
      {
        page: 1,
        limit: 1,
        query: '',
      }
    );

    expect(commit).toHaveBeenCalledWith(
      'addTransactions',
      mockResponse.data.txs
    );
  });

  test("Check if 'actions.fetchTransactionsDescendingOrder' clear outdated txs, last page and has next page, and get last page and updated txs", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const state = {};

    await actions.fetchTransactionsDescendingOrder({ commit, dispatch, state });

    expect(commit).toHaveBeenCalledWith('clearAllTransactions');
    expect(commit).toHaveBeenCalledWith('changePage', 1);
    expect(commit).toHaveBeenCalledWith('setHasNext', 1);
    expect(dispatch).toHaveBeenCalledWith('getLastPage', {
      limit: CUSTOMIZATION.TXS.TABLE_ITEMS,
      query: 'tx.minheight=1',
    });
    expect(dispatch).toHaveBeenCalledWith('getTransactions', {
      page: state.currentPage,
      limit: CUSTOMIZATION.TXS.TABLE_ITEMS,
      query: 'tx.minheight=1',
    });
  });

  test("Check if 'actions.changePage' get transactions", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const state = {
      currentPage: 2,
      hasNext: true,
    };

    const diff = 1;
    const currentPage = state.currentPage - diff;

    await actions.changePage({ commit, dispatch, state }, { diff: diff });

    expect(dispatch).toHaveBeenCalledWith('getTransactions', {
      page: currentPage,
      limit: CUSTOMIZATION.TXS.TABLE_ITEMS,
      query: 'tx.minheight=1',
    });
    expect(commit).toHaveBeenCalledWith('changePage', currentPage);
    expect(commit).toHaveBeenCalledWith('setHasNext', currentPage);
  });

  test("Check if 'actions.fetchBlockTransactions' get block transactions", async () => {
    const dispatch = jest.fn();
    const commit = jest.fn();

    await actions.fetchBlockTransactions({ dispatch, commit }, 1);

    expect(commit).toHaveBeenCalledWith(
      'addSingleTransaction',
      mockResponse.data.txs[0]
    );
  });

  test("Check if 'actions.setTransactionsFilter' set filter", () => {
    const commit = jest.fn();
    const filter = {};

    actions.setTransactionsFilter({ commit }, filter);

    expect(commit).toHaveBeenCalledWith('setFilter', filter);
  });
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
