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

    await actions.getBlock({ commit }, 1);

    expect(commit).toHaveBeenCalledWith('setBlockDetails', mockResponse.data);
  });

  test("Check if 'actions.fetchLatestBlock' set last block", async () => {
    const commit = jest.fn();

    await actions.fetchLatestBlock({
      commit,
    });

    expect(commit).toHaveBeenCalledWith(
      'setLatestBlock',
      mockResponse.data.block
    );
  });

  test("Check if 'actions.fetchBlocks' adds the required number of blocks", async () => {
    const commit = jest.fn();
    let height = 10;
    let items = 10;

    await actions.fetchBlocks({ commit }, { height: height, items: items });

    expect(commit).toHaveBeenNthCalledWith(
      items,
      'addSingleBlock',
      mockResponse.data.block
    );

    height = 5;
    items = 10;

    await actions.fetchBlocks({ commit }, { height: height, items: items });

    expect(commit).toHaveBeenNthCalledWith(
      5,
      'addSingleBlock',
      mockResponse.data.block
    );
  });

  test("Check if 'actions.getBlocks' dispatch the action 'fetchBlocks'", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    let maxHeight = 100;
    let items = 10;

    await actions.getBlocks(
      { dispatch, commit },
      { maxHeight: maxHeight, items: items }
    );

    expect(commit).toHaveBeenCalledWith('clearAllBlocks');
    expect(dispatch).toHaveBeenCalledWith('fetchBlocks', {
      height: maxHeight,
      items: items,
    });
  });

  test("Check if 'actions.addBlocks' dispatch the action 'fetchBlocks'", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const currentHeight = 100;
    const items = 10;

    await actions.addBlocks(
      { dispatch, commit },
      { currentHeight: currentHeight, items: items }
    );

    expect(dispatch).toHaveBeenCalledWith('fetchBlocks', {
      height: currentHeight,
      items: items,
    });
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
          data: mockBlock(),
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
          data: mockBlock(),
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
