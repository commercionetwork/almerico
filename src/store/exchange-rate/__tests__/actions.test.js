import { CONFIG } from '@/constants';
import {
  mockBalances,
  mockErrors,
  mockPagination,
  mockPool,
} from '@/__mocks__';
import actions from '../actions.js';

const mockErrorResponse = mockErrors(400);
let mockError = false;
let mockResponse = null;

describe('store/exchange-rate/actions', () => {
  beforeEach(() => {
    mockError = false;
    mockResponse = null;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('if "initExchangeRate" reset store, set loading state, dispatch "fetchAbrTokens", "fetchAccounts", "fetchFreezedTokens", "fetchPool", "fetchSupply" and "fetchVbrTokens" actions', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.initExchangeRate({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchAccounts');
    expect(dispatch).toHaveBeenCalledWith('fetchFreezedTokens');
    expect(dispatch).toHaveBeenCalledWith('fetchPool');
    expect(dispatch).toHaveBeenCalledWith('fetchSupply');
    expect(dispatch).toHaveBeenCalledWith('fetchVbrTokens');
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "fetchAbrTokens" commit "setAbrTokens", and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchAbrTokens({ commit });

    commit('setAbrTokens', mockResponse.data.funds);

    mockError = true;

    await actions.fetchAbrTokens({ commit });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchAccounts" commit "addAccount", and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchAccounts({ commit });

    const accounts = JSON.parse(CONFIG.SPREADSHEET_ACCOUNTS);
    for (const account of accounts) {
      account.balances = mockResponse.data.balances;
      expect(commit).toHaveBeenCalledWith('addAccount', account);
    }

    mockError = true;

    await actions.fetchAccounts({ commit });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchFreezedTokens" commit "setFreezedTokens", and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchFreezedTokens({ commit });

    commit('setFreezedTokens', mockResponse.data.balances);

    mockError = true;

    await actions.fetchFreezedTokens({ commit });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchPool" commit "setPool", and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchPool({ commit });

    commit('setPool', mockResponse.data.pool);

    mockError = true;

    await actions.fetchPool({ commit });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchSupply" commit "setSupply", and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchSupply({ commit });

    commit('setSupply', mockResponse.data.supply);

    mockError = true;

    await actions.fetchSupply({ commit });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchVbrTokens" commit "setVbrTokens", and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchVbrTokens({ commit });

    commit('setVbrTokens', mockResponse.data.funds);

    mockError = true;

    await actions.fetchVbrTokens({ commit });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });
});

jest.mock('../../../apis/http/bank.js', () => ({
  requestBalances: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            balances: mockBalances(),
            pagination: mockPagination(),
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
            funds: mockBalances(),
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
