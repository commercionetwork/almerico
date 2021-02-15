import actions from '../actions.js';
import {
  mockBalances,
  mockDelegations,
  mockMembership,
  mockRewards,
  mockUnbondings,
} from '../__mocks__';

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
  beforeEach(() => {
    mockError = false;
    mockErrorRequest = false;
    mockErrorServer = false;
    mockResponse = null;
  });

  test("Check if 'actions.fetchBalances' set balances", async () => {
    const commit = jest.fn();

    await actions.fetchBalances(
      {
        commit,
      },
      'address'
    );

    expect(commit).toHaveBeenCalledWith(
      'setBalances',
      mockResponse.data.result
    );
  });

  test("Check if 'actions.fetchDelegations' set delegations", async () => {
    const commit = jest.fn();

    await actions.fetchDelegations(
      {
        commit,
      },
      'address'
    );

    expect(commit).toHaveBeenCalledWith(
      'setDelegations',
      mockResponse.data.result
    );
  });

  test("Check if 'actions.fetchMembership' set membership", async () => {
    const commit = jest.fn();

    await actions.fetchMembership(
      {
        commit,
      },
      'address'
    );

    expect(commit).toHaveBeenCalledWith(
      'setMembership',
      mockResponse.data.result
    );
  });

  test("Check if 'actions.fetchRewards' set rewards", async () => {
    const commit = jest.fn();

    await actions.fetchRewards(
      {
        commit,
      },
      'address'
    );

    expect(commit).toHaveBeenCalledWith('setRewards', mockResponse.data.result);
  });

  test("Check if 'actions.fetchUnbondings' set unbonding delegations", async () => {
    const commit = jest.fn();

    await actions.fetchUnbondings(
      {
        commit,
      },
      'address'
    );

    expect(commit).toHaveBeenCalledWith(
      'setUnbondings',
      mockResponse.data.result
    );
  });

  test("Check if 'actions.getAccount' dispatch fetchMembership, fetchBalances, fetchDelegations, fetchRewards, fetchUnbondings", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = 'address';

    await actions.getAccount(
      {
        commit,
        dispatch,
      },
      address
    );

    expect(dispatch).toHaveBeenCalledWith('fetchMembership', address);
    expect(dispatch).toHaveBeenCalledWith('fetchBalances', address);
    expect(dispatch).toHaveBeenCalledWith('fetchDelegations', address);
    expect(dispatch).toHaveBeenCalledWith('fetchRewards', address);
    expect(dispatch).toHaveBeenCalledWith('fetchUnbondings', address);
  });
});

jest.mock('./../api', () => ({
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
