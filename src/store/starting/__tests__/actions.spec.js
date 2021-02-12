import actions from '../actions.js';
import { STATUS } from '@/constants';
import { mockGenesis } from '../__mocks__/genesis';
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

  test("Chck if 'actions.fetchInitData' dispatch actions to fetch genesis, node info, staking parameters and pool, latest block, validators, and subscribe web socket", async () => {
    const dispatch = jest.fn();
    const commit = jest.fn();

    await actions.fetchInitData({ dispatch, commit });

    expect(dispatch).toHaveBeenCalledWith('fetchGenesis');
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

  test("Check if 'actions.fetchGenesis' set genesis", async () => {
    const commit = jest.fn();

    await actions.fetchGenesis({ commit });

    expect(commit).toHaveBeenCalledWith(
      'setGenesis',
      mockResponse.data.result.genesis
    );
  });

  test("Check if 'actions.fetchNodeInfo' set genesis", async () => {
    const commit = jest.fn();

    await actions.fetchNodeInfo({ commit });

    expect(commit).toHaveBeenCalledWith('setNodeInfo', mockResponse.data);
  });

  test("Check if 'actions.fetchParams' set genesis", async () => {
    const commit = jest.fn();

    await actions.fetchParams({ commit });

    expect(commit).toHaveBeenCalledWith('setParams', mockResponse.data.result);
  });

  test("Check if 'actions.fetchPool' set genesis", async () => {
    const commit = jest.fn();

    await actions.fetchPool({ commit });

    expect(commit).toHaveBeenCalledWith('setPool', mockResponse.data.result);
  });
});

jest.mock('./../api', () => ({
  requestGenesis: () => {
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
            jsonrpc: '2.0',
            id: -1,
            result: mockGenesis(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
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
