import {
  mockBlock,
  mockErrors,
  mockNodeInfo,
  mockPagination,
  mockStakingParams,
  mockValidators,
  mockValidatorSets,
} from '@/__mocks__';
import actions from '../actions.js';
import { VALIDATORS } from '@/constants';

const mockErrorResponse = mockErrors(400);
let mockError = false;
let mockResponse = null;

describe('store/application/actions', () => {
  beforeEach(() => {
    mockError = false;
    mockResponse = null;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('if "initAppData" set loading state, reset latest transactions and validators list, dispatch "fetchInfo", "fetchLatestBlock", "fetchLatestValidatorSets, "fetchStakingParams" and "fetchValidators" actions', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.initAppData({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(commit).toHaveBeenCalledWith('setLatestTransactions', []);
    expect(commit).toHaveBeenCalledWith('setValidators', []);
    expect(dispatch).toHaveBeenCalledWith('fetchInfo');
    expect(dispatch).toHaveBeenCalledWith('fetchLatestBlock');
    expect(dispatch).toHaveBeenCalledWith('fetchLatestValidatorSets');
    expect(dispatch).toHaveBeenCalledWith('fetchStakingParams');
    expect(dispatch).toHaveBeenCalledWith('fetchValidators');
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "fetchInfo" action commit "setInfo" mutation, and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.fetchInfo({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith('setInfo', mockResponse.data);

    mockError = true;

    await actions.fetchInfo({ commit, dispatch });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse, {
      root: true,
    });
  });

  test('if "fetchLatestBlock" action commit "setLatestBlock" mutation, and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.fetchLatestBlock({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith(
      'setLatestBlock',
      mockResponse.data.block,
    );

    mockError = true;

    await actions.fetchLatestBlock({ commit, dispatch });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse, {
      root: true,
    });
  });

  test('if "fetchLatestValidatorSets" action commit "setLatestValidatorSets" mutation, and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.fetchLatestValidatorSets({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith(
      'setLatestValidatorSets',
      mockResponse.data.result.validators,
    );

    mockError = true;

    await actions.fetchLatestValidatorSets({ commit, dispatch });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse, {
      root: true,
    });
  });

  test('if "fetchStakingParams" action commit "setStakingParams" mutation, and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.fetchStakingParams({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith(
      'setStakingParams',
      mockResponse.data.params,
    );

    mockError = true;

    await actions.fetchStakingParams({ commit, dispatch });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse, {
      root: true,
    });
  });

  test('if "fetchValidators" dispatch "getValidators" action for each validators status', async () => {
    const dispatch = jest.fn();
    const getters = jest.fn();
    const statuses = Object.values(VALIDATORS.STATUS);

    await actions.fetchValidators({ dispatch, getters });

    for (const status of statuses) {
      expect(dispatch).toHaveBeenCalledWith('getValidators', {
        params: { status },
        pagination: {},
      });
    }
  });

  test('if "getValidators" action commit "addValidators" and "setValidatorsPagination" mutations, and dispatch "handleError" if error is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const params = { status: 'status' };
    const pagination = { key: 'key' };

    await actions.getValidators({ commit, dispatch }, { params, pagination });

    expect(commit).toHaveBeenCalledWith(
      'addValidators',
      mockResponse.data.validators,
    );
    expect(commit).toHaveBeenCalledWith(
      'setValidatorsPagination',
      mockResponse.data.pagination,
    );

    mockError = true;

    await actions.getValidators({ commit, dispatch }, { params, pagination });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse, {
      root: true,
    });
  });
});

jest.mock('../../../apis/http/gaiaRest.js', () => ({
  requestNodeInfo: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: mockNodeInfo(),
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));

jest.mock('../../../apis/http/staking.js', () => ({
  requestParameters: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: mockStakingParams(),
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestValidatorsList: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            validators: mockValidators(),
            pagination: mockPagination(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));

jest.mock('../../../apis/http/tendermintRpc.js', () => ({
  requestBlockLatest: () => {
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
  requestValidatorSetsLatest: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            height: '1',
            result: mockValidatorSets(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
