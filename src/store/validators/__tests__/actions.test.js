import {
  mockDelegation,
  mockErrors,
  mockPagination,
  mockValidatorBackend,
  mockValidatorsBackend,
} from '@/__mocks__';
import actions from '../actions.js';

const mockErrorResponse = mockErrors(400);
let mockError = false;
let mockResponse = null;

describe('store/validators/actions', () => {
  beforeEach(() => {
    mockError = false;
    mockResponse = null;
    jest.resetModules();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('if "initValidatorsList" reset store, set loading state, dispatch "fetchList" action', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.initValidatorsList({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchList');
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "fetchList" action commit "setList", and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchList({ commit });

    expect(commit).toHaveBeenCalledWith(
      'setList',
      mockResponse.data.validators
    );

    mockError = true;

    await actions.fetchList({ commit });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "initValidatorsDetail" reset store, set loading state, dispatch "fetchDetail" and "fetchDetailDelegations" actions', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = 'address';

    await actions.initValidatorsDetail({ commit, dispatch }, address);

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchDetail', address);
    expect(dispatch).toHaveBeenCalledWith('fetchDetailDelegations', address);
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "updateValidatorsDetail" set updating state and dispatch "fetchDetail" action', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = 'address';

    await actions.updateValidatorsDetail({ commit, dispatch }, address);

    expect(commit).toHaveBeenCalledWith('setUpdating', true);
    expect(dispatch).toHaveBeenCalledWith('fetchDetail', address);
    expect(commit).toHaveBeenCalledWith('setUpdating', false);
  });

  test('if "fetchDetail" action commit "setDetail", and set the error if it is caught', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = 'address';

    await actions.fetchDetail({ commit, dispatch }, address);

    expect(commit).toHaveBeenCalledWith('setDetail', mockResponse.data);

    mockError = true;

    await actions.fetchDetail({ commit, dispatch }, address);

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

jest.mock('../../../apis/http/validators-api.js', () => ({
  requestList: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: { validators: mockValidatorsBackend() },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestDetail: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: mockValidatorBackend(false),
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));

jest.mock('../../../apis/http/staking-api.js', () => ({
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
