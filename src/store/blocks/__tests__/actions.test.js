import {
  mockBlock,
  mockErrors,
  mockPagination,
  mockTransactions,
  mockValidatorSets,
} from '@/__mocks__';
import actions from '../actions.js';
import { BLOCKS } from '@/constants';

const mockErrorResponse = mockErrors(400);
let mockError = false;
let mockResponse = null;
let mockResponseValidatorSets = null;

describe('store/blocks/actions', () => {
  beforeEach(() => {
    mockError = false;
    mockResponse = null;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('if "initBlocksList" reset store, set loading state, dispatch "fetchBlocks" action', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const lastHeight = '100';

    await actions.initBlocksList({ commit, dispatch }, lastHeight);

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchBlocks', lastHeight);
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "fetchBlocks" dispatch "addBlocksItem" and commit "setCurrentHeight"', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const height = '1000';
    let maxHeight = parseInt(height);
    let minHeight = maxHeight - BLOCKS.TABLE_ITEMS;

    await actions.fetchBlocks({ commit, dispatch }, height);

    expect(dispatch).toHaveBeenCalledTimes(BLOCKS.TABLE_ITEMS);
    while (maxHeight > minHeight) {
      expect(dispatch).toHaveBeenCalledWith('addBlocksItem', maxHeight--);
    }
    expect(commit).toHaveBeenCalledWith('setCurrentHeight', minHeight);
  });

  test('if "searchBlocks" reset blocks adn current height, set searching state, fetch blocks and set current height', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const height = '1000';
    let maxHeight = parseInt(height);
    let minHeight = maxHeight - BLOCKS.SEARCH_ITEMS;

    await actions.searchBlocks({ commit, dispatch }, height);

    expect(commit).toHaveBeenCalledWith('setBlocks', []);
    expect(commit).toHaveBeenCalledWith('setCurrentHeight', '');
    expect(dispatch).toHaveBeenCalledTimes(BLOCKS.SEARCH_ITEMS);
    while (maxHeight > minHeight) {
      expect(dispatch).toHaveBeenCalledWith('addBlocksItem', maxHeight--);
    }
    expect(commit).toHaveBeenCalledWith('setCurrentHeight', minHeight);
  });

  test('if "addBlocksItem" commit "addBlock, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const height = '100';

    await actions.addBlocksItem({ commit }, height);

    expect(commit).toHaveBeenCalledWith('addBlock', {
      ...mockResponse.data,
      ...mockResponseValidatorSets.data.result,
    });

    mockError = true;

    await actions.addBlocksItem({ commit }, height);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "addBlocks" commit "setAddingBlocks" and dispatch "fetchBlocks" action', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const lastHeight = '100';

    await actions.addBlocks({ commit, dispatch }, lastHeight);

    expect(commit).toHaveBeenCalledWith('setAddingBlocks', true);
    expect(dispatch).toHaveBeenCalledWith('fetchBlocks', lastHeight);
    expect(commit).toHaveBeenCalledWith('setAddingBlocks', false);
  });

  test('if "initBlocksDetail" reset store, set loading state, dispatch "fetchBlock", "fetchTransactions" and "fetchValidatorSets" actions', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const height = '100';

    await actions.initBlocksDetail({ commit, dispatch }, height);

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchBlock', height);
    expect(dispatch).toHaveBeenCalledWith('fetchTransactions', height);
    expect(dispatch).toHaveBeenCalledWith('fetchValidatorSets', height);
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "fetchBlock" commit "setDetail", and set the error if it is caught', async () => {
    const commit = jest.fn();
    const height = '100';

    await actions.fetchBlock({ commit }, height);

    expect(commit).toHaveBeenCalledWith('setDetail', mockResponse.data);

    mockError = true;

    await actions.fetchBlock({ commit }, height);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchValidatorSets" commit "setValidatorSets", and set the error if it is caught', async () => {
    const commit = jest.fn();
    const height = '100';

    await actions.fetchValidatorSets({ commit }, height);

    expect(commit).toHaveBeenCalledWith(
      'setValidatorSets',
      mockResponseValidatorSets.data.result.validators,
    );

    mockError = true;

    await actions.fetchValidatorSets({ commit }, height);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchTransactions" dispatch "getTransactions"', async () => {
    const dispatch = jest.fn();
    const getters = jest.fn();
    const height = '100';

    await actions.fetchTransactions({ dispatch, getters }, height);

    expect(dispatch).toHaveBeenCalledWith('addTransactions', { height });
  });

  test('if "addTransactions" commit "addTransactions" and "setBlockTxsPagination", and set the error if it is caught', async () => {
    const commit = jest.fn();
    const height = '100';
    const offset = 10;

    await actions.addTransactions({ commit }, { height, offset });

    expect(commit).toHaveBeenCalledWith(
      'addTransactions',
      mockResponse.data.tx_responses,
    );
    expect(commit).toHaveBeenCalledWith(
      'setBlockTxsPagination',
      mockResponse.data.pagination,
    );
    expect(commit).toHaveBeenCalledWith(
      'sumBlockTxsOffset',
      mockResponse.data.tx_responses.length,
    );

    mockError = true;

    await actions.addTransactions({ commit }, { height, offset });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });
});

jest.mock('../../../apis/http/tendermintRpc.js', () => ({
  requestBlock: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: mockBlock(),
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestValidatorSets: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponseValidatorSets = {
          data: {
            height: '1',
            result: mockValidatorSets(),
          },
        };
        resolve(mockResponseValidatorSets);
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
            tx: {},
            tx_responses: mockTransactions(),
            pagination: mockPagination(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
