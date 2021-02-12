import actions from '../actions.js';
import { mockBlock } from '../__mocks__/blocks';

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

describe('store/blocks/actions', () => {
  beforeEach(() => {
    mockError = false;
    mockErrorRequest = false;
    mockErrorServer = false;
    mockResponse = null;
  });

  test("Check if 'actions.getBlock' set block details", async () => {
    const commit = jest.fn();

    await actions.getBlock({
      commit,
    }, 1);

    expect(commit).toHaveBeenCalledWith('setBlockDetails', mockResponse.data);
  });

  test("Check if 'actions.fetchLatestBlock' set last block", async () => {
    const commit = jest.fn();

    await actions.fetchLatestBlock({
      commit
    });

    expect(commit).toHaveBeenCalledWith("setLatestBlock", mockResponse.data.block);
  });
});

jest.mock('./../api', () => ({
  requestBlock: () => {
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
            block_id: {},
            block: mockBlock(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestLatestBlock: () => {
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
            block_id: {},
            block: mockBlock(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
