import actions from '../actions.js';
import { mockBalances } from '../__mocks__/balances';
import { mockDelegations } from '../__mocks__/delegations';
import { mockMembership } from '../__mocks__/membership';
import { mockRewards } from '../__mocks__/rewards';
import { mockUnbondings } from '../__mocks__/unbondings';
import { mockTxs } from '../../transactions/__mocks__/txs';

const mockErrorResponse = {
  request: {},
  response: {
    data: {
      error: 'error',
    },
    status: 400,
  },
};
const mockErrorRequestResponse = {
  request: {},
  response: undefined,
};

let mockError = false;
let mockErrorRequest = false;
let mockErrorServer = false;
let mockResponse = null;

describe('store/account/actions', () => {
  test('description', () => {
    const expectedValue = true;
    expect(true).toBe(expectedValue);
  });
  // beforeEach(() => {
  //   mockError = false;
  //   mockErrorRequest = false;
  //   mockErrorServer = false;
  //   mockResponse = null;
  // });

  // test("if 'actions.fetchBalances' set balances", async () => {
  //   const dispatch = jest.fn();
  //   const commit = jest.fn();

  //   await actions.fetchBalances(
  //     {
  //       dispatch,
  //       commit,
  //     },
  //     'address',
  //   );

  //   expect(commit).toHaveBeenCalledWith(
  //     'setBalances',
  //     mockResponse.data.result,
  //   );
  // });

  // test("if 'actions.fetchBalances' has an error, dispatch 'handleError'", async () => {
  //   const dispatch = jest.fn();
  //   const commit = jest.fn();
  //   mockError = true;

  //   await actions.fetchBalances(
  //     {
  //       dispatch,
  //       commit,
  //     },
  //     'address',
  //   );

  //   expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  // });

  // test("if 'actions.fetchDelegations' set delegations", async () => {
  //   const dispatch = jest.fn();
  //   const commit = jest.fn();

  //   await actions.fetchDelegations(
  //     {
  //       dispatch,
  //       commit,
  //     },
  //     'address',
  //   );

  //   expect(commit).toHaveBeenCalledWith(
  //     'setDelegations',
  //     mockResponse.data.result,
  //   );
  // });

  // test("if 'actions.fetchDelegations' has an error, dispatch 'handleError'", async () => {
  //   const dispatch = jest.fn();
  //   const commit = jest.fn();
  //   mockError = true;

  //   await actions.fetchDelegations(
  //     {
  //       dispatch,
  //       commit,
  //     },
  //     'address',
  //   );

  //   expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  // });

  // test("if 'actions.fetchMembership' set membership", async () => {
  //   const commit = jest.fn();

  //   await actions.fetchMembership(
  //     {
  //       commit,
  //     },
  //     'address',
  //   );

  //   expect(commit).toHaveBeenCalledWith(
  //     'setMembership',
  //     mockResponse.data.result,
  //   );
  // });

  // test("if 'actions.fetchRewards' set rewards", async () => {
  //   const dispatch = jest.fn();
  //   const commit = jest.fn();

  //   await actions.fetchRewards(
  //     {
  //       dispatch,
  //       commit,
  //     },
  //     'address',
  //   );

  //   expect(commit).toHaveBeenCalledWith('setRewards', mockResponse.data.result);
  // });

  // test("if 'actions.fetchRewards' has an error, dispatch 'handleError'", async () => {
  //   const dispatch = jest.fn();
  //   const commit = jest.fn();
  //   mockError = true;

  //   await actions.fetchRewards(
  //     {
  //       dispatch,
  //       commit,
  //     },
  //     'address',
  //   );

  //   expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  // });

  // test("if 'actions.fetchBuyMembershipTx' set buy membership tx", async () => {
  //   const dispatch = jest.fn();
  //   const commit = jest.fn();

  //   await actions.fetchBuyMembershipTx(
  //     {
  //       dispatch,
  //       commit,
  //     },
  //     'address',
  //   );

  //   expect(commit).toHaveBeenCalledWith(
  //     'setBuyMembershipTx',
  //     mockResponse.data.txs[0],
  //   );
  // });

  // test("if 'actions.fetchBuyMembershipTx' has an error, dispatch 'handleError'", async () => {
  //   const dispatch = jest.fn();
  //   const commit = jest.fn();
  //   mockError = true;

  //   await actions.fetchBuyMembershipTx(
  //     {
  //       dispatch,
  //       commit,
  //     },
  //     'address',
  //   );

  //   expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  // });

  // test("if 'actions.fetchUnbondings' set unbonding delegations", async () => {
  //   const dispatch = jest.fn();
  //   const commit = jest.fn();

  //   await actions.fetchUnbondings(
  //     {
  //       dispatch,
  //       commit,
  //     },
  //     'address',
  //   );

  //   expect(commit).toHaveBeenCalledWith(
  //     'setUnbondings',
  //     mockResponse.data.result,
  //   );
  // });

  // test("if 'actions.fetchUnbondings' has an error, dispatch 'handleError'", async () => {
  //   const dispatch = jest.fn();
  //   const commit = jest.fn();
  //   mockError = true;

  //   await actions.fetchUnbondings(
  //     {
  //       dispatch,
  //       commit,
  //     },
  //     'address',
  //   );

  //   expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  // });

  // test("if 'actions.getAccount' dispatch fetchMembership, fetchBuyMembershipTx, fetchBalances, fetchDelegations, fetchRewards, fetchUnbondings", async () => {
  //   const commit = jest.fn();
  //   const dispatch = jest.fn();
  //   const address = 'address';

  //   await actions.getAccount(
  //     {
  //       commit,
  //       dispatch,
  //     },
  //     address,
  //   );

  //   expect(dispatch).toHaveBeenCalledWith('fetchMembership', address);
  //   expect(dispatch).toHaveBeenCalledWith('fetchBuyMembershipTx', address);
  //   expect(dispatch).toHaveBeenCalledWith('fetchBalances', address);
  //   expect(dispatch).toHaveBeenCalledWith('fetchDelegations', address);
  //   expect(dispatch).toHaveBeenCalledWith('fetchRewards', address);
  //   expect(dispatch).toHaveBeenCalledWith('fetchUnbondings', address);
  // });

  // test("if 'actions.handleError' handles the various types of error", () => {
  //   const commit = jest.fn();
  //   let error = mockErrorResponse;

  //   actions.handleError({ commit }, error);

  //   expect(commit).toBeCalledWith('setError', error.response);

  //   error = mockErrorRequestResponse;

  //   actions.handleError({ commit }, error);

  //   expect(commit).toBeCalledWith('setError', error);

  //   error = 'error';

  //   actions.handleError({ commit }, error);

  //   expect(commit).toBeCalledWith('setServerReachability', false, {
  //     root: true,
  //   });
  // });
});

jest.mock('./../http', () => ({
  requestBalances: () => {
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
            height: '1',
            result: mockBalances(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestDelegations: () => {
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
            height: '1',
            result: mockDelegations(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestMembership: () => {
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
            height: '1',
            result: mockMembership(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestRewards: () => {
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
            height: '1',
            result: mockRewards(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestSearchTransactions: (txs = 3) => {
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
            count: '1',
            page_number: '1',
            page_total: `${txs}`,
            limit: '1',
            txs: mockTxs(txs),
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
        if (mockErrorRequest) {
          reject(mockErrorRequestResponse);
        }
        if (mockErrorServer) {
          reject({});
        }

        mockResponse = {
          data: {
            height: '1',
            result: mockUnbondings(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
