import actions from '../actions.js';
import { STATUS } from '@/constants';
import { mockNodeInfo } from '../__mocks__/node_info';
import { mockParameters } from '../__mocks__/parameters';
import { mockPool } from '../__mocks__/pool';

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

  test("Chck if 'actions.fetchInitData' dispatch actions to fetch node info, staking parameters and pool, latest block, validators, and subscribe web socket", async () => {
    const dispatch = jest.fn();
    const commit = jest.fn();

    await actions.fetchInitData({ dispatch, commit });

    expect(dispatch).toHaveBeenCalledWith('fetchNodeInfo');
    expect(dispatch).toHaveBeenCalledWith('fetchParams');
    expect(dispatch).toHaveBeenCalledWith('fetchPool');
    expect(dispatch).toHaveBeenCalledWith('blocks/fetchLatestBlock', null, {
      root: true,
    });
    expect(dispatch).toHaveBeenCalledWith(
      'validators/initValidators',
      {
        status: [
          STATUS.VALIDATOR.BONDED,
          STATUS.VALIDATOR.UNBONDED,
          STATUS.VALIDATOR.UNBONDING,
        ],
      },
      { root: true }
    );
    expect(dispatch).toHaveBeenCalledWith('subscribeWebSocket');
  });

  test("Check if 'actions.fetchNodeInfo' set node info", async () => {
    const commit = jest.fn();

    await actions.fetchNodeInfo({ commit });

    expect(commit).toHaveBeenCalledWith('setNodeInfo', mockResponse.data);
  });

  test("Check if 'actions.fetchParams' set staking parameters", async () => {
    const commit = jest.fn();

    await actions.fetchParams({ commit });

    expect(commit).toHaveBeenCalledWith('setParams', mockResponse.data.result);
  });

  test("Check if 'actions.fetchPool' set pool", async () => {
    const commit = jest.fn();

    await actions.fetchPool({ commit });

    expect(commit).toHaveBeenCalledWith('setPool', mockResponse.data.result);
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
}));
