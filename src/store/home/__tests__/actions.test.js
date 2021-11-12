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

  test('if "initHome" set loading state, reset rate updates and transactions,z dispatch "fetchAbrTokens", "fetchAllTokens", "fetchConversionRate", "fetchPool", "fetchRateUpdates", "fetchStartingDate", "fetchVbrTokens and "transactions/fetchLastTransactions" actions', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.initHome({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(commit).toHaveBeenCalledWith('setRateUpdates', []);
    expect(commit).toHaveBeenCalledWith('setTransactions', []);
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

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse, {
      root: true,
    });
  });

  test('if "fetchRateUpdates" dispatch action "getRateUpdates"', async () => {
    const dispatch = jest.fn();
    const getters = jest.fn();

    await actions.fetchRateUpdates({ dispatch, getters });

    expect(dispatch).toHaveBeenCalledWith('getRateUpdates', {});
  });

  test('if "getRateUpdates" action commit "addRateUpdates" and "setRateUpdatesPagination" mutations, and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const pagination = { key: 'key' };

    await actions.getRateUpdates({ commit, dispatch }, pagination);

    expect(commit).toHaveBeenCalledWith(
      'addRateUpdates',
      mockResponse.data.txs,
    );
    expect(commit).toHaveBeenCalledWith(
      'setRateUpdatesPagination',
      mockResponse.data.pagination,
    );

    mockError = true;

    await actions.getRateUpdates({ commit, dispatch }, pagination);

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse, {
      root: true,
    });
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

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse, {
      root: true,
    });
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

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse, {
      root: true,
    });
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

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse, {
      root: true,
    });
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

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse, {
      root: true,
    });
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

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse, {
      root: true,
    });
  });

  test('if "fetchTransactions" commit "addTransactions", and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.fetchTransactions({ commit, dispatch });

    commit('addTransactions', mockResponse.data.tx_responses);

    mockError = true;

    await actions.fetchTransactions({ commit, dispatch });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse, {
      root: true,
    });
  });

  test('if "fetchNewTransactions" set loading state and dispatch "getTransactionsAtHeight"', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const height = '1';

    await actions.fetchNewTransactions({ commit, dispatch }, height);

    expect(commit).toHaveBeenCalledWith('setAddingTx', true);
    expect(dispatch).toHaveBeenCalledWith('getTransactionsAtHeight', height);
    expect(commit).toHaveBeenCalledWith('setAddingTx', false);
  });

  test('if "getTransactionsAtHeight" commit "addTransactions", dispatch "handleError" if error is caught, and finally reset tx event height', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const height = '1';

    await actions.getTransactionsAtHeight({ commit, dispatch }, height);

    expect(commit).toHaveBeenCalledWith(
      'addTransactions',
      mockResponse.data.tx_responses,
    );
    expect(commit).toHaveBeenCalledWith('setTxEventHeight', '');

    mockError = true;

    await actions.getTransactionsAtHeight({ commit, dispatch }, height);

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse, {
      root: true,
    });
    expect(commit).toHaveBeenCalledWith('setTxEventHeight', '');
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
            txs: mockTransactions(),
            pagination: mockPagination(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));