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

  test('if "initAppData" reset store, set loading state, dispatch "fetchInfo", "fetchLatestBlock", "fetchLatestValidatorSets, "fetchStakingParams" and "fetchValidators" actions', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.initAppData({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchInfo');
    expect(dispatch).toHaveBeenCalledWith('fetchLatestBlock');
    expect(dispatch).toHaveBeenCalledWith('fetchLatestValidatorSets');
    expect(dispatch).toHaveBeenCalledWith('fetchStakingParams');
    expect(dispatch).toHaveBeenCalledWith('fetchValidators');
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "fetchInfo" action commit "setInfo" mutation, and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchInfo({ commit });

    expect(commit).toHaveBeenCalledWith('setInfo', mockResponse.data);

    mockError = true;

    await actions.fetchInfo({ commit });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchLatestBlock" action commit "setLatestBlock" mutation, and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchLatestBlock({ commit });

    expect(commit).toHaveBeenCalledWith(
      'setLatestBlock',
      mockResponse.data.block
    );

    mockError = true;

    await actions.fetchLatestBlock({ commit });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchLatestValidatorSets" action commit "setLatestValidatorSets" mutation, and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchLatestValidatorSets({ commit });

    expect(commit).toHaveBeenCalledWith(
      'setLatestValidatorSets',
      mockResponse.data.result.validators
    );

    mockError = true;

    await actions.fetchLatestValidatorSets({ commit });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchStakingParams" action commit "setStakingParams" mutation, and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchStakingParams({ commit });

    expect(commit).toHaveBeenCalledWith(
      'setStakingParams',
      mockResponse.data.params
    );

    mockError = true;

    await actions.fetchStakingParams({ commit });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchValidators" dispatch "addValidators" action for each validators status', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const getters = jest.fn();
    const statuses = Object.values(VALIDATORS.STATUS);

    await actions.fetchValidators({ commit, dispatch, getters });

    for (const status of statuses) {
      expect(dispatch).toHaveBeenCalledWith('addValidators', {
        params: { status },
      });
      expect(commit).toHaveBeenCalledWith('setValidatorsOffset', 0);
    }
  });

  test('if "addValidators" action commit "addValidators", "sumValidatorsOffset" and "setValidatorsPagination" mutations, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const params = { status: 'status' };
    const offset = 10;

    await actions.addValidators({ commit }, { params, offset });

    expect(commit).toHaveBeenCalledWith(
      'addValidators',
      mockResponse.data.validators
    );
    expect(commit).toHaveBeenCalledWith(
      'setValidatorsPagination',
      mockResponse.data.pagination
    );
    expect(commit).toHaveBeenCalledWith(
      'sumValidatorsOffset',
      mockResponse.data.validators.length
    );

    mockError = true;

    await actions.addValidators({ commit }, { params, offset });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "refreshValidators" set loading state, reset validators and dispatch "fetchValidators" action', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.refreshValidators({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(commit).toHaveBeenCalledWith('setValidators', []);
    expect(dispatch).toHaveBeenCalledWith('fetchValidators');
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });
});

jest.mock('../../../apis/http/gaiaRest-api.js', () => ({
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

jest.mock('../../../apis/http/staking-api.js', () => ({
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

jest.mock('../../../apis/http/tendermintRpc-api.js', () => ({
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
