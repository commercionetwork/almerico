import { VALIDATORS } from '@/constants';
import {
  mockBlock,
  mockDelegation,
  mockErrors,
  mockPagination,
  mockPool,
  mockValidator,
  mockValidatorLogo,
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

  test('if "initValidatorsList" reset store, set loading state, dispatch "fetchPool" and "fetchTrackedBlocks" actions', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const lastHeight = '1000';

    process.env.VUE_APP_BLOCKS_MONITOR = 'false';

    await actions.initValidatorsList({ commit, dispatch }, lastHeight);

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchPool');
    expect(dispatch).not.toHaveBeenCalledWith('fetchTrackedBlocks', lastHeight);
    expect(commit).toHaveBeenCalledWith('setLoading', false);

    process.env.VUE_APP_BLOCKS_MONITOR = 'true';

    await actions.initValidatorsList({ commit, dispatch }, lastHeight);

    expect(dispatch).toHaveBeenCalledWith('fetchTrackedBlocks', lastHeight);
  });

  test('if "fetchPool" action commit "setPool", and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchPool({ commit });

    expect(commit).toHaveBeenCalledWith('setPool', mockResponse.data.pool);

    mockError = true;

    await actions.fetchPool({ commit });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchTrackedBlocks" set loading state and dispatch "addBlocksItem"', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const lastHeight = '1000';
    let height = parseInt(lastHeight);
    let minHeight = height - VALIDATORS.CUSTOMIZATION.BLOCKS_MONITOR.AMOUNT;

    await actions.fetchTrackedBlocks({ commit, dispatch }, lastHeight);

    expect(commit).toHaveBeenCalledWith('setLoadingBlocks', true);
    expect(dispatch).toHaveBeenCalledTimes(
      VALIDATORS.CUSTOMIZATION.BLOCKS_MONITOR.AMOUNT
    );
    while (height > minHeight) {
      expect(dispatch).toHaveBeenCalledWith('addBlocksItem', height--);
    }
    expect(commit).toHaveBeenCalledWith('setLoadingBlocks', false);
  });

  test('if "addBlocksItem" commit "addBlock, and set the error if it is caught"', async () => {
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

  test('if "initValidatorsDetail" reset store, set loading state, dispatch "fetchDetail", "fetchDetailDelegations", "fetchPool" and "fetchTrackedBlocks" actions', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = 'address';
    const lastHeight = '1000';

    process.env.VUE_APP_BLOCKS_MONITOR = 'false';

    await actions.initValidatorsDetail(
      { commit, dispatch },
      { id: address, lastHeight }
    );

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchDetail', address);
    expect(dispatch).toHaveBeenCalledWith('fetchDetailDelegations', address);
    expect(dispatch).toHaveBeenCalledWith('fetchPool');
    expect(dispatch).toHaveBeenCalledWith('setAccount', address);
    expect(commit).toHaveBeenCalledWith('setLoading', false);
    expect(dispatch).not.toHaveBeenCalledWith('fetchTrackedBlocks', lastHeight);

    process.env.VUE_APP_BLOCKS_MONITOR = 'true';

    await actions.initValidatorsDetail(
      { commit, dispatch },
      { id: address, lastHeight }
    );

    expect(dispatch).toHaveBeenCalledWith('fetchTrackedBlocks', lastHeight);
  });

  test('if "fetchDetail" action commit "setDetail" and dispatch "fetchDetailLogo", and set the error if it is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const id = 'id';

    await actions.fetchDetail({ commit, dispatch }, id);

    expect(commit).toHaveBeenCalledWith('setDetail', mockResponse.data.result);
    expect(dispatch).toHaveBeenCalledWith(
      'fetchDetailLogo',
      mockResponse.data.result.description.identity
    );

    mockError = true;

    await actions.fetchDetail({ commit, dispatch }, id);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchDetailLogo" commit "setDetailLogo", and set the logo to "" if error is caught', async () => {
    const commit = jest.fn();
    const identity = 'identity';

    await actions.fetchDetailLogo({ commit }, identity);

    for (const item of mockResponse.data.them) {
      if ('primary' in item['pictures']) {
        expect(commit).toHaveBeenCalledWith(
          'setDetailLogo',
          item['pictures']['primary']['url']
        );
      }
    }

    mockError = true;

    await actions.fetchDetailLogo({ commit }, identity);

    expect(commit).toHaveBeenCalledWith('setDetailLogo', '');
  });

  test('if "setAccount" commit "setAccount", and set the error if it is caught', async () => {
    const commit = jest.fn();
    const address = 'address';

    await actions.setAccount({ commit }, address);

    expect(commit).toHaveBeenCalledWith('setAccount', mockResponse);

    mockError = true;

    await actions.setAccount({ commit }, address);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchDetailDelegations" dispatch "addDetailDelegations" action', async () => {
    const dispatch = jest.fn();
    const getters = jest.fn();
    const id = 'id';

    await actions.fetchDetailDelegations({ dispatch, getters }, id);

    expect(dispatch).toHaveBeenCalledWith('addDetailDelegations', { id });
  });

  test('if "addDetailDelegations" action commit "addDelegations", "setDelegationsPagination" and "sumDelegationsOffset" mutations, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const id = 'id';
    const offset = 10;

    await actions.addDetailDelegations({ commit }, { id, offset });

    expect(commit).toHaveBeenCalledWith(
      'addDelegations',
      mockResponse.data.delegation_responses
    );
    expect(commit).toHaveBeenCalledWith(
      'setDelegationsPagination',
      mockResponse.data.pagination
    );
    expect(commit).toHaveBeenCalledWith(
      'sumDelegationsOffset',
      mockResponse.data.delegation_responses.length
    );

    mockError = true;

    await actions.addDetailDelegations({ commit }, { id, offset });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "updateBlocksMonitor" action det loading state and dispatch "addBlocksItem"', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const height = 'height';

    await actions.updateBlocksMonitor({ commit, dispatch }, height);

    expect(commit).toHaveBeenCalledWith('setLoadingBlocks', true);
    expect(dispatch).toHaveBeenCalledWith('addBlocksItem', height);
    expect(commit).toHaveBeenCalledWith('setLoadingBlocks', false);
  });

  test('if "setValidatorsFilter" set filter', () => {
    const commit = jest.fn();
    const filter = {
      active: true,
      query: 'query',
    };

    actions.setValidatorsFilter({ commit }, filter);

    expect(commit).toHaveBeenCalledWith('setFilter', filter);
  });
});

jest.mock('../../../apis/http/keybase.js', () => ({
  requestValidatorLogo: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: mockValidatorLogo(),
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));

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
  requestValidatorsDetailDelegations: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            delegation_responses: mockDelegation(),
            pagination: mockPagination(),
          },
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

jest.mock('../../../utils/bech32Manager.js', () => ({
  decode: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = 'decoded_address';
        resolve(mockResponse);
      }, 1);
    });
  },
  encode: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = 'encoded_address';
        resolve(mockResponse);
      }, 1);
    });
  },
}));
