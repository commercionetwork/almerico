import { ACCOUNT } from '@/constants';
import {
  mockBalances,
  mockDelegations,
  mockErrors,
  mockMembership,
  mockPagination,
  mockRewards,
  mockTransactions,
  mockUnbondings,
} from '@/__mocks__';
import actions from '../actions.js';

const mockErrorResponse = mockErrors(400);
let mockError = false;
let mockResponse = null;

describe('store/account/actions', () => {
  beforeEach(() => {
    mockError = false;
    mockResponse = null;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('if "initAccount" set loading state, reset transactions and txs offset, dispatch "fetchBalances", "fetchDelegations", "fetchMembership", "fetchMembershipTxs", "fetchRewards", fetchTransactions and "fetchUnbondings" actions', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = 'address';

    await actions.initAccount({ commit, dispatch }, address);

    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(commit).toHaveBeenCalledWith('setTransactions', []);
    expect(commit).toHaveBeenCalledWith('setTransactionsOffset', 0);
    expect(dispatch).toHaveBeenCalledWith('fetchBalances', address);
    expect(dispatch).toHaveBeenCalledWith('fetchDelegations', address);
    expect(dispatch).toHaveBeenCalledWith('fetchMembership', address);
    expect(dispatch).toHaveBeenCalledWith('fetchMembershipTxs', address);
    expect(dispatch).toHaveBeenCalledWith('fetchRewards', address);
    expect(dispatch).toHaveBeenCalledWith('fetchTransactions', { address });
    expect(dispatch).toHaveBeenCalledWith('fetchUnbondings', address);
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "fetchBalances" action commit "setBalances" mutation, and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = 'address';

    await actions.fetchBalances({ commit, dispatch }, address);

    expect(commit).toHaveBeenCalledWith(
      'setBalances',
      mockResponse.data.result,
    );

    mockError = true;

    await actions.fetchBalances({ commit, dispatch }, address);

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse, {
      root: true,
    });
  });

  test('if "fetchDelegations" action commit "setDelegations" mutation, and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = 'address';

    await actions.fetchDelegations({ commit, dispatch }, address);

    expect(commit).toHaveBeenCalledWith(
      'setDelegations',
      mockResponse.data.result,
    );

    mockError = true;

    await actions.fetchDelegations({ commit, dispatch }, address);

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse, {
      root: true,
    });
  });

  test('if "fetchRewards" action commit "setRewards" mutation, and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = 'address';

    await actions.fetchRewards({ commit, dispatch }, address);

    expect(commit).toHaveBeenCalledWith('setRewards', mockResponse.data);

    mockError = true;

    await actions.fetchRewards({ commit, dispatch }, address);

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse, {
      root: true,
    });
  });

  test('if "fetchUnbondings" commit "setUnbondings" and dispatch action "getUnbondings"', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const getters = jest.fn();
    const address = 'address';

    await actions.fetchUnbondings({ commit, dispatch, getters }, address);

    expect(commit).toHaveBeenCalledWith('setUnbondings', []);
    expect(dispatch).toHaveBeenCalledWith('getUnbondings', { address });
  });

  test('if "getUnbondings" action commit "addUnbondings" and "setUnbondingsPagination" mutations, and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = 'address';
    const pagination = { key: 'key' };

    await actions.getUnbondings({ commit, dispatch }, { address, pagination });

    expect(commit).toHaveBeenCalledWith(
      'addUnbondings',
      mockResponse.data.unbonding_responses,
    );
    expect(commit).toHaveBeenCalledWith(
      'setUnbondingsPagination',
      mockResponse.data.pagination,
    );

    mockError = true;

    await actions.getUnbondings({ commit, dispatch }, { address, pagination });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse, {
      root: true,
    });
  });

  test('if "fetchMembership" action commit "setMembership" mutation, and set membership to null if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = 'address';

    await actions.fetchMembership({ commit, dispatch }, address);

    expect(commit).toHaveBeenCalledWith(
      'setMembership',
      mockResponse.data.result,
    );

    mockError = true;

    await actions.fetchMembership({ commit, dispatch }, address);

    expect(commit).toHaveBeenCalledWith('setMembership', null);
  });

  test('if "fetchMembershipTxs" action commit "setMembershipTxs" mutation, and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = 'address';

    await actions.fetchMembershipTxs({ commit, dispatch }, address);

    expect(commit).toHaveBeenCalledWith(
      'setMembershipTxs',
      mockResponse.data.tx_responses,
    );

    mockError = true;

    await actions.fetchMembershipTxs({ commit, dispatch }, address);

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse, {
      root: true,
    });
  });

  test('if "fetchTransactions" commit "addTransactions", "sumTransactionsOffset" and "setTransactionsPagination", and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = 'address';

    await actions.fetchTransactions({ commit, dispatch }, { address });

    expect(commit).toHaveBeenCalledWith(
      'addTransactions',
      mockResponse.data.tx_responses,
    );
    expect(commit).toHaveBeenCalledWith(
      'sumTransactionsOffset',
      mockResponse.data.tx_responses.length,
    );
    expect(commit).toHaveBeenCalledWith(
      'setTransactionsPagination',
      mockResponse.data.pagination,
    );

    mockError = true;

    await actions.fetchTransactions({ commit, dispatch }, { address });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse, {
      root: true,
    });
  });

  test('if "addTransactions" set loading state and dispatch action "fetchTransactions"', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = 'address';
    const offset = ACCOUNT.TRANSACTIONS_NUMBER;

    await actions.addTransactions({ commit, dispatch }, { address, offset });

    expect(commit).toHaveBeenCalledWith('setAddingTxs', true);
    expect(dispatch).toHaveBeenCalledWith('fetchTransactions', {
      address,
      offset,
    });
    expect(commit).toHaveBeenCalledWith('setAddingTxs', false);
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
}));

jest.mock('../../../apis/http/commercio.js', () => ({
  requestMembership: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            height: '0',
            result: mockMembership(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));

jest.mock('../../../apis/http/distribution.js', () => ({
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

jest.mock('../../../apis/http/staking.js', () => ({
  requestDelegationsLegacy: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            height: '0',
            result: mockDelegations(),
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
            tx_responses: mockTransactions(),
            pagination: mockPagination(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
