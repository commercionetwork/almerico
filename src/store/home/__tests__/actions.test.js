import {
  mockBalances,
  mockBlock,
  mockConversionRate,
  mockErrors,
  mockPagination,
  mockPool,
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

  test('if "initHome" reset store, set loading state, dispatch "fetchAbrTokens", "fetchAllTokens", "fetchConversionRate", "fetchPool", "fetchRateUpdates", "fetchStartingDate", "fetchVbrTokens" and "fetchTransactions"', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.initHome({ commit, dispatch });

    expect(dispatch).toHaveBeenCalledWith('resetHome');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchAbrTokens');
    expect(dispatch).toHaveBeenCalledWith('fetchAllTokens');
    expect(dispatch).toHaveBeenCalledWith('fetchConversionRate');
    expect(dispatch).toHaveBeenCalledWith('fetchPool');
    expect(dispatch).toHaveBeenCalledWith('fetchRateUpdates');
    expect(dispatch).toHaveBeenCalledWith('fetchStartingDate');
    expect(dispatch).toHaveBeenCalledWith('fetchVbrTokens');
    expect(dispatch).toHaveBeenCalledWith('fetchTransactions');
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "fetchConversionRate" action commit "setConversionRate" mutation, and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.fetchConversionRate({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith(
      'setConversionRate',
      mockResponse.data.rate,
    );

    mockError = true;

    await actions.fetchConversionRate({ commit, dispatch });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test('if "fetchRateUpdates" dispatch "addRateUpdates"', async () => {
    const dispatch = jest.fn();
    const getters = jest.fn();

    await actions.fetchRateUpdates({ dispatch, getters });

    expect(dispatch).toHaveBeenCalledWith('addRateUpdates');
  });

  test('if "addRateUpdates" action commit "addRateUpdates", "setRateUpdatesPagination" and "sumRateUpdatesOffset" mutations, and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const offset = 10;

    await actions.addRateUpdates({ commit, dispatch }, offset);

    expect(commit).toHaveBeenCalledWith(
      'addRateUpdates',
      mockResponse.data.tx_responses,
    );
    expect(commit).toHaveBeenCalledWith(
      'setRateUpdatesPagination',
      mockResponse.data.pagination,
    );
    expect(commit).toHaveBeenCalledWith(
      'sumRateUpdatesOffset',
      mockResponse.data.tx_responses.length,
    );

    mockError = true;

    await actions.addRateUpdates({ commit, dispatch }, offset);

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test('if "fetchStartingDate" action commit "setStartingDate", and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.fetchStartingDate({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith(
      'setStartingDate',
      mockResponse.data.block.header.time,
    );

    mockError = true;

    await actions.fetchStartingDate({ commit, dispatch });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test('if "fetchAbrTokens" action commit "setAbrTokens", and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.fetchAbrTokens({
      commit,
      dispatch,
    });

    expect(commit).toHaveBeenCalledWith(
      'setAbrTokens',
      mockResponse.data.result,
    );

    mockError = true;

    await actions.fetchAbrTokens({
      commit,
      dispatch,
    });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test('if "fetchVbrTokens" action commit "setVbrTokens", and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.fetchVbrTokens({
      commit,
      dispatch,
    });

    expect(commit).toHaveBeenCalledWith(
      'setVbrTokens',
      mockResponse.data.funds,
    );

    mockError = true;

    await actions.fetchVbrTokens({
      commit,
      dispatch,
    });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test('if "fetchAllTokens" action commit "setSupply", and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.fetchAllTokens({
      commit,
      dispatch,
    });

    expect(commit).toHaveBeenCalledWith('setSupply', mockResponse.data.supply);

    mockError = true;

    await actions.fetchAllTokens({
      commit,
      dispatch,
    });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test('if "fetchPool" action commit "setPool", and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.fetchPool({
      commit,
      dispatch,
    });

    expect(commit).toHaveBeenCalledWith('setPool', mockResponse.data.pool);

    mockError = true;

    await actions.fetchPool({
      commit,
      dispatch,
    });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test('if "fetchTransactions" commit "addTransactions", and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.fetchTransactions({ commit, dispatch });

    commit('addTransactions', mockResponse.data.tx_responses);

    mockError = true;

    await actions.fetchTransactions({ commit, dispatch });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test('if "refreshTransactions" reset txs, set loading state, dispatch "getTransactionsAtHeight" and finally reset event height', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.refreshTransactions({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith('setTransactions', []);
    expect(commit).toHaveBeenCalledWith('setRefreshing', true);
    expect(dispatch).toHaveBeenCalledWith('fetchTransactions');
    expect(commit).toHaveBeenCalledWith('setRefreshing', false);
    expect(commit).toHaveBeenCalledWith('setTxEventHeight', '');
  });

  test('if "handleError" set error', () => {
    const commit = jest.fn();
    const error = new Error('message');

    actions.handleError({ commit }, error);

    expect(commit).toHaveBeenCalledWith('setError', error);
  });

  test('if "resetHome" reset error, rate updates, rate updates offset and transactions', () => {
    const commit = jest.fn();

    actions.resetHome({ commit });

    expect(commit).toHaveBeenCalledWith('setError', null);
    expect(commit).toHaveBeenCalledWith('setRateUpdates', []);
    expect(commit).toHaveBeenCalledWith('setRateUpdatesOffset', 0);
    expect(commit).toHaveBeenCalledWith('setTransactions', []);
  });
});

jest.mock('../../../apis/http/bank.js', () => ({
  requestSupply: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            supply: mockBalances(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));

jest.mock('../../../apis/http/commercio.js', () => ({
  requestAbrTokens: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            height: '0',
            result: mockBalances(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestConversionRate: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            rate: mockConversionRate(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestVbrTokens: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            funds: mockBalances(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));

jest.mock('../../../apis/http/staking.js', () => ({
  requestPool: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            pool: mockPool(),
          },
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
