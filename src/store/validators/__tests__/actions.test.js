import {
  mockBalances,
  mockDelegations,
  mockErrors,
  mockPagination,
  mockRewards,
  mockUnbondings,
  mockValidatorBackend,
  mockValidatorsBackend,
} from '@/__mocks__';
import actions from '../actions.js';

const mockErrorResponse = mockErrors(400);
let mockError = false;
let mockResponse = null;

describe('store/validators/actions', () => {
  beforeEach(() => {
    mockError = false;
    mockResponse = null;
    jest.resetModules();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('if "initValidatorsList" reset store, set loading state, dispatch "fetchList" action', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.initValidatorsList({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchList');
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "fetchList" action commit "setList", and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchList({ commit });

    expect(commit).toHaveBeenCalledWith(
      'setList',
      mockResponse.data.validators
    );

    mockError = true;

    await actions.fetchList({ commit });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "initValidatorsDetail" reset store, set loading state, dispatch "fetchDetail" and "fetchDetailDelegations" actions', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = 'address';

    await actions.initValidatorsDetail({ commit, dispatch }, address);

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchDetail', address);
    expect(dispatch).toHaveBeenCalledWith('fetchDetailDelegations', address);
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "updateValidatorsDetail" set updating state and dispatch "fetchDetail" action', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = 'address';

    await actions.updateValidatorsDetail({ commit, dispatch }, address);

    expect(commit).toHaveBeenCalledWith('setUpdating', true);
    expect(dispatch).toHaveBeenCalledWith('fetchDetail', address);
    expect(commit).toHaveBeenCalledWith('setUpdating', false);
  });

  test('if "fetchDetail" action commit "setDetail", and set the error if it is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = 'address';

    await actions.fetchDetail({ commit, dispatch }, address);

    expect(commit).toHaveBeenCalledWith('setDetail', mockResponse.data);

    mockError = true;

    await actions.fetchDetail({ commit, dispatch }, address);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchDetailDelegations" dispatch "getDetailDelegations" action', async () => {
    const dispatch = jest.fn();
    const getters = jest.fn();
    const validator = 'validator';

    await actions.fetchDetailDelegations({ dispatch, getters }, validator);

    expect(dispatch).toHaveBeenCalledWith('getDetailDelegations', {
      validator,
    });
  });

  test('if "getDetailDelegations" action commit "addDelegations" and "setDelegationsPagination" mutations, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const validator = 'validator';
    const key = 'key';

    await actions.getDetailDelegations({ commit }, { validator, key });

    expect(commit).toHaveBeenCalledWith(
      'addDelegations',
      mockResponse.data.delegation_responses
    );
    expect(commit).toHaveBeenCalledWith(
      'setDelegationsPagination',
      mockResponse.data.pagination
    );

    mockError = true;

    await actions.getDetailDelegations({ commit }, { validator, key });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "setValidatorsFilter" set filter', () => {
    const commit = jest.fn();
    const filter = {
      active: true,
      query: 'query',
    };

    actions.setValidatorsFilter({ commit }, filter);

    expect(commit).toHaveBeenCalledWith('setFilter', filter);
  });

  test('if "initWallet" reset the wallet, set loading state and dispatch wanted actions', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const account = 'did:com:';
    const rootGetters = { 'keplr/accounts': [{ address: account }] };

    await actions.initWallet({ commit, dispatch, rootGetters });

    expect(commit).toHaveBeenCalledWith('resetWallet');
    expect(commit).toHaveBeenCalledWith('setLoadingWallet', true);
    expect(dispatch).toHaveBeenCalledWith('fetchAccountBalances', account);
    expect(dispatch).toHaveBeenCalledWith('fetchAccountDelegations', account);
    expect(dispatch).toHaveBeenCalledWith('fetchAccountRewards', account);
    expect(dispatch).toHaveBeenCalledWith('fetchAccountUnbondings', account);
    expect(commit).toHaveBeenCalledWith('setLoadingWallet', false);
  });

  test('if "fetchAccountBalances" action commit "setWalletItem", and set the error if it is caught', async () => {
    const commit = jest.fn();
    const account = 'did:com:';

    await actions.fetchAccountBalances({ commit }, account);

    expect(commit).toHaveBeenCalledWith('setWalletItem', {
      balances: mockResponse.data.balances,
    });

    mockError = true;

    await actions.fetchAccountBalances({ commit }, account);

    expect(commit).toHaveBeenCalledWith('setWalletItem', { balances: [] });
  });

  test('if "getWalletDelegations" add delegations and set pagination, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const account = 'did:com:';
    const key = 'key';

    await actions.getWalletDelegations({ commit }, { account, key });

    expect(commit).toHaveBeenCalledWith(
      'addWalletDelegations',
      mockResponse.data.delegation_responses
    );
    expect(commit).toHaveBeenCalledWith(
      'setWalletDelegationsPagination',
      mockResponse.data.pagination
    );

    mockError = true;

    await actions.getWalletDelegations({ commit }, { account, key });

    expect(commit).toHaveBeenCalledWith('setWalletItem', { delegations: [] });
  });

  test('if "getWalletUnbondings" add unbondings and set pagination, and set the error if it is caught ', async () => {
    const commit = jest.fn();
    const account = 'did:com:';
    const key = 'key';

    await actions.getWalletUnbondings({ commit }, { account, key });

    expect(commit).toHaveBeenCalledWith(
      'addWalletUnbondings',
      mockResponse.data.unbonding_responses
    );
    expect(commit).toHaveBeenCalledWith(
      'setWalletUnbondingsPagination',
      mockResponse.data.pagination
    );

    mockError = true;

    await actions.getWalletUnbondings({ commit }, { account, key });

    expect(commit).toHaveBeenCalledWith('setWalletItem', { unbondings: [] });
  });

  test('if "fetchAccountRewards" action commit "setWalletItem", and set the error if it is caught', async () => {
    const commit = jest.fn();
    const account = 'did:com:';

    await actions.fetchAccountRewards({ commit }, account);

    expect(commit).toHaveBeenCalledWith('setWalletItem', {
      rewards: mockResponse.data,
    });

    mockError = true;

    await actions.fetchAccountRewards({ commit }, account);

    expect(commit).toHaveBeenCalledWith('setWalletItem', { rewards: [] });
  });
});

jest.mock('../../../apis/http/validators-api.js', () => ({
  requestList: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: { validators: mockValidatorsBackend() },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestDetail: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: mockValidatorBackend(false),
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));

jest.mock('../../../apis/http/staking-api.js', () => ({
  requestDelegations: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            delegation_responses: mockDelegations(),
            pagination: mockPagination(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestUnbondings: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            unbonding_responses: mockUnbondings(),
            pagination: mockPagination(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestValidatorsDetailDelegations: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            delegation_responses: mockDelegations(),
            pagination: mockPagination(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
jest.mock('../../../apis/http/distribution-api.js', () => ({
  requestRewards: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: mockRewards(),
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));

jest.mock('../../../apis/http/bank-api.js', () => ({
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
}));
