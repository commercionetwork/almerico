import actions from '../actions.js';
import { STATUS } from '@/constants';
import { mockNodeInfo } from '../__mocks__/node_info';
import { mockConversionRate, mockParameters } from '../__mocks__/parameters';
import { mockPool } from '../__mocks__/pool';
import { mockRateUpdates } from '../__mocks__/rateUpdates';

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

describe('store/starting/actions', () => {
  beforeEach(() => {
    mockError = false;
    mockErrorRequest = false;
    mockErrorServer = false;
    mockResponse = null;
  });

  test("if 'actions.fetchInitData' dispatch actions to fetch node info, staking parameters and pool, latest block, validators, and subscribe web socket", async () => {
    const dispatch = jest.fn();
    const commit = jest.fn();

    await actions.fetchInitData({ dispatch, commit });

    expect(dispatch).toHaveBeenCalledWith('fetchNodeInfo');
    expect(dispatch).toHaveBeenCalledWith('fetchParams');
    expect(dispatch).toHaveBeenCalledWith('fetchPool');
    expect(dispatch).toHaveBeenCalledWith('fetchConversionRate');
    expect(dispatch).toHaveBeenCalledWith('fetchRateUpdates');
    expect(dispatch).toHaveBeenCalledWith('blocks/fetchLatestBlock', null, {
      root: true,
    });
    expect(dispatch).toHaveBeenCalledWith(
      'validators/initValidators',
      {
        statuses: [
          STATUS.VALIDATOR.BONDED,
          STATUS.VALIDATOR.UNBONDED,
          STATUS.VALIDATOR.UNBONDING,
        ],
      },
      { root: true },
    );
    expect(dispatch).toHaveBeenCalledWith('subscribeWebSocket');
  });

  test("if 'actions.fetchNodeInfo' set node info", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.fetchNodeInfo({ dispatch, commit });

    expect(commit).toHaveBeenCalledWith('setNodeInfo', mockResponse.data);
  });

  test("if 'actions.fetchNodeInfo' has an error, dispatch 'handleError'", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    mockError = true;

    await actions.fetchNodeInfo({ dispatch, commit });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test("if 'actions.fetchParams' set staking parameters", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.fetchParams({ dispatch, commit });

    expect(commit).toHaveBeenCalledWith('setParams', mockResponse.data.result);
  });

  test("if 'actions.fetchParams' has an error, dispatch 'handleError'", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    mockError = true;

    await actions.fetchParams({ dispatch, commit });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test("if 'actions.fetchPool' set pool", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.fetchPool({ dispatch, commit });

    expect(commit).toHaveBeenCalledWith('setPool', mockResponse.data.result);
  });

  test("if 'actions.fetchPool' has an error, dispatch 'handleError'", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    mockError = true;

    await actions.fetchPool({ dispatch, commit });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test("if 'actions.fetchConversionRate' set rate", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.fetchConversionRate({ dispatch, commit });

    expect(commit).toHaveBeenCalledWith(
      'setConversionRate',
      mockResponse.data.result,
    );
  });

  test("if 'actions.fetchConversionRate' has an error, dispatch 'handleError'", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    mockError = true;

    await actions.fetchConversionRate({ dispatch, commit });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test("if 'actions.fetchRateUpdates' set rate", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.fetchRateUpdates({ dispatch, commit });

    expect(commit).toBeCalledWith('setRateUpdates', mockResponse.data.txs);
  });

  test("if 'actions.fetchRateUpdates' has an error, dispatch 'handleError'", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    mockError = true;

    await actions.fetchRateUpdates({ dispatch, commit });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test("if 'actions.handleError' handles the various types of error", () => {
    const commit = jest.fn();
    let error = mockErrorResponse;

    actions.handleError({ commit }, error);

    expect(commit).toBeCalledWith('setError', error.response);

    error = mockErrorRequestResponse;

    actions.handleError({ commit }, error);

    expect(commit).toBeCalledWith('setError', error);

    error = 'error';

    actions.handleError({ commit }, error);

    expect(commit).toBeCalledWith('setServerReachability', false, {
      root: true,
    });
  });
});

jest.mock('./../api', () => ({
  requestNodeInfo: () => {
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
          data: mockNodeInfo(),
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestPool: () => {
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
            result: mockPool(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestStakingParameters: () => {
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
            result: mockParameters(),
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
        if (mockErrorRequest) {
          reject(mockErrorRequestResponse);
        }
        if (mockErrorServer) {
          reject({});
        }

        mockResponse = {
          data: {
            height: '0',
            result: mockConversionRate(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestRateUpdates: () => {
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
            total_count: '5',
            count: '5',
            page_number: '1',
            page_total: '1',
            limit: '30',
            txs: mockRateUpdates(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
