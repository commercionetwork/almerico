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

    expect(dispatch).toHaveBeenCalledWith('resetBlocksList');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchBlocks', lastHeight);
    expect(commit).toHaveBeenCalledWith('setLoading', false);
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

  test('if "fetchBlocks" dispatch "addBlocksItem" and "setCurrentHeight"', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const lastHeight = '1000';
    let maxHeight = parseInt(lastHeight);
    let minHeight = maxHeight - BLOCKS.TABLE_ITEMS;

    await actions.fetchBlocks({ commit, dispatch }, lastHeight);

    expect(dispatch).toHaveBeenCalledTimes(BLOCKS.TABLE_ITEMS);
    while (maxHeight > minHeight) {
      expect(dispatch).toHaveBeenCalledWith('addBlocksItem', maxHeight--);
    }
    expect(commit).toHaveBeenCalledWith('setCurrentHeight', minHeight);
  });

  test('if "addBlocksItem" commit "addBlock, and dispatch "handleError" if error is caught"', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const height = '100';

    await actions.addBlocksItem({ commit, dispatch }, height);

    expect(commit).toHaveBeenCalledWith('addBlock', {
      ...mockResponse.data,
      ...mockResponseValidatorSets.data.result,
    });

    mockError = true;

    await actions.addBlocksItem({ commit, dispatch }, height);

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test('if "initBlocksDetail" reset store, set loading state, dispatch "fetchBlock", "fetchTransactions" and "fetchValidatorSets" actions', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const height = '100';

    await actions.initBlocksDetail({ commit, dispatch }, height);

    expect(dispatch).toHaveBeenCalledWith('resetBlocksDetail');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchBlock', height);
    expect(dispatch).toHaveBeenCalledWith('fetchTransactions', height);
    expect(dispatch).toHaveBeenCalledWith('fetchValidatorSets', height);
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "fetchBlock" commit "setDetail", and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const height = '100';

    await actions.fetchBlock({ commit, dispatch }, height);

    expect(commit).toHaveBeenCalledWith('setDetail', mockResponse.data);

    mockError = true;

    await actions.fetchBlock({ commit, dispatch }, height);

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test('if "fetchValidatorSets" commit "setValidatorSets", and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const height = '100';

    await actions.fetchValidatorSets({ commit, dispatch }, height);

    expect(commit).toHaveBeenCalledWith(
      'setValidatorSets',
      mockResponseValidatorSets.data.result.validators,
    );

    mockError = true;

    await actions.fetchValidatorSets({ commit, dispatch }, height);

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test('if "fetchTransactions" dispatch "getTransactions"', async () => {
    const dispatch = jest.fn();
    const getters = jest.fn();
    const height = '100';

    await actions.fetchTransactions({ dispatch, getters }, height);

    expect(dispatch).toHaveBeenCalledWith('addTransactions', { height });
  });

  test('if "addTransactions" commit "addTransactions" and "setBlockTxsPagination", and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const height = '100';
    const offset = 10;

    await actions.addTransactions({ commit, dispatch }, { height, offset });

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

    await actions.addTransactions({ commit, dispatch }, { height, offset });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test('if "handleError" set error', () => {
    const commit = jest.fn();
    const error = new Error('message');

    actions.handleError({ commit }, error);

    expect(commit).toHaveBeenCalledWith('setError', error);
  });

  test('if "resetBlocksList" reset error and blocs', () => {
    const commit = jest.fn();

    actions.resetBlocksList({ commit });

    expect(commit).toHaveBeenCalledWith('setError', null);
    expect(commit).toHaveBeenCalledWith('setBlocks', []);
  });

  test('if "resetBlocksDetail" reset error, txs and offset', () => {
    const commit = jest.fn();

    actions.resetBlocksDetail({ commit });

    expect(commit).toHaveBeenCalledWith('setError', null);
    expect(commit).toHaveBeenCalledWith('setTransactions', []);
    expect(commit).toHaveBeenCalledWith('setBlockTxsOffset', 0);
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
