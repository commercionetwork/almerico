import { VALIDATORS } from '@/constants';
import {
  mockBlock,
  mockDelegation,
  mockErrors,
  mockPool,
  mockValidator,
  mockValidatorSets,
} from '@/__mocks__';
import actions from '../actions.js';

const mockErrorResponse = mockErrors(400);
let mockError = false;
let mockResponse = null;
let mockResponseValidatorSets = null;

describe('store/validators/actions', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    mockError = false;
    mockResponse = null;
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  test('if "initValidatorsList" set loading state and default filter, reset tracked blocks, dispatch "fetchPool" and "fetchTrackedBlocks" actions', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const lastHeight = '1000';

    process.env.VUE_APP_BLOCKS_MONITOR = 'false';

    await actions.initValidatorsList({ commit, dispatch }, lastHeight);

    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(commit).toHaveBeenCalledWith('setFilter', {
      active: true,
      query: '',
    });
    expect(dispatch).toHaveBeenCalledWith('fetchPool');
    expect(commit).toHaveBeenCalledWith('setLoading', false);
    expect(commit).not.toHaveBeenCalledWith('setBlocks', []);
    expect(dispatch).not.toHaveBeenCalledWith('fetchTrackedBlocks', lastHeight);

    process.env.VUE_APP_BLOCKS_MONITOR = 'true';

    await actions.initValidatorsList({ commit, dispatch }, lastHeight);

    expect(commit).toHaveBeenCalledWith('setBlocks', []);
    expect(dispatch).toHaveBeenCalledWith('fetchTrackedBlocks', lastHeight);
  });

  test('if "fetchPool" action commit "setPool", and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.fetchPool({
      commit,
      dispatch,
    });

    expect(commit).toHaveBeenCalledWith('setPool', mockResponse.data.pool);

    mockError = true;

    await actions.fetchPool({
      commit,
      dispatch,
    });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse, {
      root: true,
    });
  });

  test('if "fetchTrackedBlocks" dispatch "addBlocksItem"', async () => {
    const dispatch = jest.fn();
    const lastHeight = '1000';
    let maxHeight = parseInt(lastHeight);
    let minHeight = maxHeight - VALIDATORS.CUSTOMIZATION.BLOCKS_MONITOR.AMOUNT;

    await actions.fetchTrackedBlocks({ dispatch }, lastHeight);

    expect(dispatch).toHaveBeenCalledTimes(
      VALIDATORS.CUSTOMIZATION.BLOCKS_MONITOR.AMOUNT,
    );
    while (maxHeight > minHeight) {
      expect(dispatch).toHaveBeenCalledWith('addBlocksItem', maxHeight--);
    }
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

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse, {
      root: true,
    });
  });

  test('if "initValidatorsDetail" set loading state, reset tracked blocks, dispatch "fetchDetail", "fetchDetailDelegations", "fetchPool" and "fetchTrackedBlocks" actions', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = 'address';
    const lastHeight = '1000';

    process.env.VUE_APP_BLOCKS_MONITOR = 'false';

    await actions.initValidatorsDetail(
      { commit, dispatch },
      { id: address, lastHeight },
    );

    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchDetail', address);
    expect(dispatch).toHaveBeenCalledWith('fetchDetailDelegations', address);
    expect(dispatch).toHaveBeenCalledWith('fetchPool');
    expect(commit).toHaveBeenCalledWith('setLoading', false);
    expect(commit).not.toHaveBeenCalledWith('setBlocks', []);
    expect(dispatch).not.toHaveBeenCalledWith('fetchTrackedBlocks', lastHeight);

    process.env.VUE_APP_BLOCKS_MONITOR = 'true';

    await actions.initValidatorsDetail(
      { commit, dispatch },
      { id: address, lastHeight },
    );

    expect(commit).toHaveBeenCalledWith('setBlocks', []);
    expect(dispatch).toHaveBeenCalledWith('fetchTrackedBlocks', lastHeight);
  });

  test('if "fetchDetail" action commit "setDetail", and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = 'address';

    await actions.fetchDetail({ commit, dispatch }, address);

    expect(commit).toHaveBeenCalledWith('setDetail', mockResponse.data.result);

    mockError = true;

    await actions.fetchDetail({ commit, dispatch }, address);

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse, {
      root: true,
    });
  });

  test('if "fetchDetailDelegations" action commit "setDelegations", and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = 'address';

    await actions.fetchDetailDelegations({ commit, dispatch }, address);

    expect(commit).toHaveBeenCalledWith(
      'setDelegations',
      mockResponse.data.result,
    );

    mockError = true;

    await actions.fetchDetailDelegations({ commit, dispatch }, address);

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse, {
      root: true,
    });
  });
});

jest.mock('../../../apis/http/staking.js', () => ({
  requestPool: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            pool: mockPool(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestValidatorsDetailLegacy: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: { result: mockValidator(), height: '0' },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestValidatorsDetailDelegationsLegacy: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: { result: mockDelegation(), height: '0' },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));

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
