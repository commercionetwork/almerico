import { mockBalances, mockErrors, mockFreezed, mockPool } from '@/__mocks__';
import actions from '../actions.js';
import { SETTINGS } from '@/constants';

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

  test('if "fetchAbrTokens" commit "setAbrTokens", and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.fetchAbrTokens({ commit, dispatch });

    commit('setAbrTokens', mockResponse.data.result);

    mockError = true;

    await actions.fetchAbrTokens({ commit, dispatch });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test('if "fetchAccounts" commit "addAccount", and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.fetchAccounts({ commit, dispatch });

    const accounts = JSON.parse(SETTINGS.SPREADSHEET_ACCOUNTS);
    for (const account of accounts) {
      account.balances = mockResponse.data.result;
      expect(commit).toHaveBeenCalledWith('addAccount', account);
    }

    mockError = true;

    await actions.fetchAccounts({ commit, dispatch });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test('if "fetchFreezedTokens" commit "setFreezedTokens", and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.fetchFreezedTokens({ commit, dispatch });

    commit('setFreezedTokens', mockResponse.data.result);

    mockError = true;

    await actions.fetchFreezedTokens({ commit, dispatch });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test('if "fetchPool" commit "setPool", and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.fetchPool({ commit, dispatch });

    commit('setPool', mockResponse.data.pool);

    mockError = true;

    await actions.fetchPool({ commit, dispatch });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test('if "fetchSupply" commit "setSupply", and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.fetchSupply({ commit, dispatch });

    commit('setSupply', mockResponse.data.supply);

    mockError = true;

    await actions.fetchSupply({ commit, dispatch });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test('if "fetchVbrTokens" commit "setVbrTokens", and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.fetchVbrTokens({ commit, dispatch });

    commit('setVbrTokens', mockResponse.data.funds);

    mockError = true;

    await actions.fetchVbrTokens({ commit, dispatch });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test('if "handleError" set error', () => {
    const commit = jest.fn();
    const error = new Error('message');

    actions.handleError({ commit }, error);

    expect(commit).toHaveBeenCalledWith('setError', error);
  });
});

jest.mock('../../../apis/http/auth.js', () => ({
  requestFreezedTokensLegacy: () => {
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
}));

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
            result: mockFreezed(),
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
