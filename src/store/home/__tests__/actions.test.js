import {
  mockBlock,
  mockErrors,
  mockPagination,
  mockParams,
  mockTransactions,
} from '@/__mocks__';
import actions from '../actions.js';

const mockErrorResponse = mockErrors(400);
let mockError = false;
let mockResponse = null;

describe('store/home/actions', () => {
  beforeEach(() => {
    mockError = false;
    mockResponse = null;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('if "initHome" reset store, set loading state, dispatch "fetchParams", "fetchParamsUpdates", "fetchStartingDate", "fetchTokensChart" and "fetchTransactions"', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.initHome({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchParams');
    expect(dispatch).toHaveBeenCalledWith('fetchParamsUpdates');
    expect(dispatch).toHaveBeenCalledWith('fetchStartingDate');
    expect(dispatch).toHaveBeenCalledWith('fetchTokensChart');
    expect(commit).toHaveBeenCalledWith('setLoading', false);
    expect(dispatch).toHaveBeenCalledWith('fetchTransactions');
  });

  test('if "fetchParams" action commit "setParams" mutation, and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchParams({ commit });

    expect(commit).toHaveBeenCalledWith('setParams', mockResponse.data.params);

    mockError = true;

    await actions.fetchParams({ commit });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchParamsUpdates" dispatch "addParamsUpdates"', async () => {
    const dispatch = jest.fn();
    const getters = jest.fn();

    await actions.fetchParamsUpdates({ dispatch, getters });

    expect(dispatch).toHaveBeenCalledWith('addParamsUpdates');
  });

  test('if "addParamsUpdates" action commit "addParamsUpdates", "setParamsUpdatesPagination" and "sumParamsUpdatesOffset" mutations, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const offset = 10;

    await actions.addParamsUpdates({ commit }, offset);

    expect(commit).toHaveBeenCalledWith(
      'addParamsUpdates',
      mockResponse.data.tx_responses
    );
    expect(commit).toHaveBeenCalledWith(
      'setParamsUpdatesPagination',
      mockResponse.data.pagination
    );
    expect(commit).toHaveBeenCalledWith(
      'sumParamsUpdatesOffset',
      mockResponse.data.tx_responses.length
    );

    mockError = true;

    await actions.addParamsUpdates({ commit }, offset);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchStartingDate" action commit "setStartingDate", and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchStartingDate({ commit });

    expect(commit).toHaveBeenCalledWith(
      'setStartingDate',
      mockResponse.data.block.header.time
    );

    mockError = true;

    await actions.fetchStartingDate({ commit });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchTransactions" set loading state and commit "addTransactions", and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchTransactions({ commit });

    expect(commit).toHaveBeenCalledWith('setLoadingTxs', true);
    expect(commit).toHaveBeenCalledWith(
      'addTransactions',
      mockResponse.data.tx_responses
    );
    expect(commit).toHaveBeenCalledWith('setLoadingTxs', false);

    mockError = true;

    await actions.fetchTransactions({ commit });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "refreshTransactions" reset txs and dispatch "fetchTransactions"', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.refreshTransactions({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith('setTransactions', []);
    expect(dispatch).toHaveBeenCalledWith('fetchTransactions');
  });
});

jest.mock('../../../apis/http/commercio.js', () => ({
  requestParams: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: mockParams(),
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));

jest.mock('../../../apis/http/tendermintRpc.js', () => ({
  requestBlock: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: mockBlock(),
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));

jest.mock('../../../apis/http/tx.js', () => ({
  requestTxsList: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            txs: [],
            tx_responses: mockTransactions(),
            pagination: mockPagination(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
