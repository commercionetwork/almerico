import { ACCOUNT } from '@/constants';
import {
  mockBalances,
  mockCommission,
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
const mockAddress = 'did:com:';
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

  test('if "initAccountDashboard" reset store, set loading state, dispatch "fetchBalances", "fetchCommission", "fetchDelegations", "fetchMembership", "fetchMembershipTxs", "fetchRewards", "fetchUnbondings" and "fetchTransactions" actions', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = 'address';

    await actions.initAccountDashboard({ commit, dispatch }, address);

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchBalances', address);
    expect(dispatch).toHaveBeenCalledWith('fetchCommission', address);
    expect(dispatch).toHaveBeenCalledWith('fetchDelegations', address);
    expect(dispatch).toHaveBeenCalledWith('fetchMembership', address);
    expect(dispatch).toHaveBeenCalledWith('fetchMembershipTxs', address);
    expect(dispatch).toHaveBeenCalledWith('fetchRewards', address);
    expect(dispatch).toHaveBeenCalledWith('fetchUnbondings', address);
    expect(commit).toHaveBeenCalledWith('setLoading', false);
    expect(dispatch).toHaveBeenCalledWith('fetchTransactions', { address });
  });

  test('if "fetchBalances" action commit "setBalances" mutation, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const address = 'address';

    await actions.fetchBalances({ commit }, address);

    expect(commit).toHaveBeenCalledWith(
      'setBalances',
      mockResponse.data.balances
    );

    mockError = true;

    await actions.fetchBalances({ commit }, address);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchCommission" action commit "setCommission" mutation, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const address = 'did:com:133nf49v83dts7pq30csnnl7ul5unsvzz55qt20';

    await actions.fetchCommission({ commit }, address);

    expect(commit).toHaveBeenCalledWith(
      'setCommission',
      mockResponse.data.commission
    );

    mockError = true;

    await actions.fetchCommission({ commit }, address);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchDelegations" dispatch "addDelegations" action', async () => {
    const dispatch = jest.fn();
    const getters = jest.fn();
    const address = 'address';

    await actions.fetchDelegations({ dispatch, getters }, address);

    expect(dispatch).toHaveBeenCalledWith('addDelegations', { address });
  });

  test('if "addDelegations" action commit "addDelegations" and "setDelegationsPagination" mutations, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const address = 'address';
    const key = 'key';

    await actions.addDelegations({ commit }, { address, key });

    expect(commit).toHaveBeenCalledWith(
      'addDelegations',
      mockResponse.data.delegation_responses
    );
    expect(commit).toHaveBeenCalledWith(
      'setDelegationsPagination',
      mockResponse.data.pagination
    );

    mockError = true;

    await actions.addDelegations({ commit }, { address, key });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchRewards" action commit "setRewards" mutation, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const address = 'address';

    await actions.fetchRewards({ commit }, address);

    expect(commit).toHaveBeenCalledWith('setRewards', mockResponse.data);

    mockError = true;

    await actions.fetchRewards({ commit }, address);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchUnbondings" dispatch "addUnbondings" action', async () => {
    const dispatch = jest.fn();
    const getters = jest.fn();
    const address = 'address';

    await actions.fetchUnbondings({ dispatch, getters }, address);

    expect(dispatch).toHaveBeenCalledWith('addUnbondings', { address });
  });

  test('if "addUnbondings" action commit "addUnbondings" and "setUnbondingsPagination" mutations, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const address = 'address';
    const key = 'key';

    await actions.addUnbondings({ commit }, { address, key });

    expect(commit).toHaveBeenCalledWith(
      'addUnbondings',
      mockResponse.data.unbonding_responses
    );
    expect(commit).toHaveBeenCalledWith(
      'setUnbondingsPagination',
      mockResponse.data.pagination
    );

    mockError = true;

    await actions.addUnbondings({ commit }, { address, key });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchMembership" action commit "setMembership" mutation, and set membership to null if error is caught', async () => {
    const commit = jest.fn();
    const address = 'address';

    await actions.fetchMembership({ commit }, address);

    expect(commit).toHaveBeenCalledWith(
      'setMembership',
      mockResponse.data.membership
    );

    mockError = true;

    await actions.fetchMembership({ commit }, address);

    expect(commit).toHaveBeenCalledWith('setMembership', null);
  });

  test('if "fetchMembershipTxs" action commit "setMembershipTxs" mutation, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const address = 'address';

    await actions.fetchMembershipTxs({ commit }, address);

    expect(commit).toHaveBeenCalledWith(
      'setMembershipTxs',
      mockResponse.data.tx_responses
    );

    mockError = true;

    await actions.fetchMembershipTxs({ commit }, address);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchTransactions" set loading state, commit "addTransactions", "sumTransactionsOffset" and "setTransactionsPagination", and set an empty array if an error is caught', async () => {
    const commit = jest.fn();
    const address = 'address';

    await actions.fetchTransactions({ commit }, { address });

    expect(commit).toHaveBeenCalledWith('setAddingTxs', true);
    expect(commit).toHaveBeenCalledWith(
      'addTransactions',
      mockResponse.data.tx_responses
    );
    expect(commit).toHaveBeenCalledWith(
      'sumTransactionsOffset',
      mockResponse.data.tx_responses.length
    );
    expect(commit).toHaveBeenCalledWith(
      'setTransactionsPagination',
      mockResponse.data.pagination
    );
    expect(commit).toHaveBeenCalledWith('setAddingTxs', false);

    mockError = true;

    await actions.fetchTransactions({ commit }, { address });

    expect(commit).toHaveBeenCalledWith('setTransactions', []);
  });

  test('if "addTransactions" dispatch action "fetchTransactions"', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = 'address';
    const offset = ACCOUNT.TRANSACTIONS_NUMBER;
    const sent = false;

    await actions.addTransactions(
      { commit, dispatch },
      { address, offset, sent }
    );

    expect(dispatch).toHaveBeenCalledWith('fetchTransactions', {
      address,
      offset,
      sent,
    });
  });

  test('if "resetTransactions" commit "setTransactions", "setTransactionsPagination" and "setTransactionsOffset" mutations', () => {
    const commit = jest.fn();

    actions.resetTransactions({ commit });

    expect(commit).toHaveBeenCalledWith('setTransactions', []);
    expect(commit).toHaveBeenCalledWith('setTransactionsPagination', []);
    expect(commit).toHaveBeenCalledWith('setTransactionsOffset', 0);
  });
});

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

jest.mock('../../../apis/http/commercio-api.js', () => ({
  requestMembership: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            membership: mockMembership(),
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
  requestCommission: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            commission: mockCommission(),
          },
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
}));

jest.mock('../../../apis/http/tx-api.js', () => ({
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

jest.mock('../../../utils/bech32-manager.js', () => ({
  decode: () => {
    if (mockError) {
      return mockErrorResponse;
    }

    return mockAddress;
  },
  encode: () => {
    if (mockError) {
      return mockErrorResponse;
    }

    return mockAddress;
  },
}));
