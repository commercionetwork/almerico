import {
  mockBalances,
  mockBlock,
  mockErrors,
  mockPagination,
  mockParams,
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

  test('if "initHome" reset store, set loading state, dispatch "fetchAbrTokens", "fetchAllTokens", "fetchFreezedTokens", "fetchParams", "fetchPool", "fetchParamsUpdates", "fetchStartingDate", "fetchVbrTokens" and "fetchTransactions"', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.initHome({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchAbrTokens');
    expect(dispatch).toHaveBeenCalledWith('fetchAllTokens');
    expect(dispatch).toHaveBeenCalledWith('fetchFreezedTokens');
    expect(dispatch).toHaveBeenCalledWith('fetchParams');
    expect(dispatch).toHaveBeenCalledWith('fetchParamsUpdates');
    expect(dispatch).toHaveBeenCalledWith('fetchPool');
    expect(dispatch).toHaveBeenCalledWith('fetchStartingDate');
    expect(dispatch).toHaveBeenCalledWith('fetchVbrTokens');
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

  test('if "fetchAbrTokens" action commit "setAbrTokens", and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchAbrTokens({ commit });

    expect(commit).toHaveBeenCalledWith(
      'setAbrTokens',
      mockResponse.data.result
    );

    mockError = true;

    await actions.fetchAbrTokens({ commit });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchVbrTokens" action commit "setVbrTokens", and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchVbrTokens({ commit });

    expect(commit).toHaveBeenCalledWith(
      'setVbrTokens',
      mockResponse.data.funds
    );

    mockError = true;

    await actions.fetchVbrTokens({ commit });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchFreezedTokens" commit "setFreezedTokens", and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchFreezedTokens({ commit });

    commit('setFreezedTokens', mockResponse.data.result);

    mockError = true;

    await actions.fetchFreezedTokens({ commit });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchAllTokens" action commit "setSupply", and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchAllTokens({ commit });

    expect(commit).toHaveBeenCalledWith('setSupply', mockResponse.data.supply);

    mockError = true;

    await actions.fetchAllTokens({ commit });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchPool" action commit "setPool", and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchPool({ commit });

    expect(commit).toHaveBeenCalledWith('setPool', mockResponse.data.pool);

    mockError = true;

    await actions.fetchPool({ commit });

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

jest.mock('../../../apis/http/bank.js', () => ({
  requestBalancesLegacy: () => {
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
