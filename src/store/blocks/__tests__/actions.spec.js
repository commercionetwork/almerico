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

  test("if 'actions.getBlock' set block details", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.getBlock({ dispatch, commit }, 1);

    expect(commit).toHaveBeenCalledWith('setBlockDetails', mockResponse.data);
  });

  test("if 'actions.getBlock' has an error, dispatch 'handleError'", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    mockError = true;

    await actions.getBlock({ dispatch, commit }, 1);

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test("if 'actions.fetchLatestBlock' set last block", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.fetchLatestBlock({
      dispatch,
      commit,
    });

    expect(commit).toHaveBeenCalledWith(
      'setLatestBlock',
      mockResponse.data.block
    );
  });

  test("if 'actions.fetchLatestBlock' has an error, dispatch 'handleError'", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    mockError = true;

    await actions.fetchLatestBlock({
      dispatch,
      commit,
    });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test("if 'actions.fetchBlocks' adds the required number of blocks", async () => {
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

  test("if 'actions.getBlocks' dispatch the action 'fetchBlocks'", async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const maxHeight = 100;
    const items = 10;

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

  test("if 'actions.addBlocks' dispatch the action 'fetchBlocks'", async () => {
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
