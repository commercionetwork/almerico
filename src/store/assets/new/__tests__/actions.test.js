import actions from '../actions.js';
import { mockErrors } from '@/__mocks__';

const mockErrorResponse = mockErrors(400);
let mockError = false;
let mockResponse = null;

describe('store/assetsNew/actions', () => {
  beforeEach(() => {
    mockError = false;
    mockResponse = null;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('if "initAssetsNew" reset store, set loading state, dispatch "keplr/connect" and "fetchGovernmentAddress" actions', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const rootGetters = { keplr: { isInitialized: false } };
    const translator = jest.fn();
    const context = jest.fn();

    await actions.initAssetsNew(
      { commit, dispatch, rootGetters },
      { translator, context }
    );

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith(
      'keplr/connect',
      { translator, context },
      {
        root: true,
      }
    );
    expect(dispatch).toHaveBeenCalledWith('fetchGovernmentAddress');
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "fetchGovernmentAddress" set the government address, and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchGovernmentAddress({ commit });

    expect(commit).toHaveBeenCalledWith(
      'setGovernment',
      mockResponse.data.governmentAddress
    );

    mockError = true;

    await actions.fetchGovernmentAddress({ commit });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "updateContractProp" update the new CW20', () => {
    const commit = jest.fn();
    const payload = { address: 'address', prop: 'prop', value: 'value' };

    actions.updateContractProp({ commit }, payload);

    expect(commit).toHaveBeenCalledWith('addPropToNewCW20', payload);
  });

  test('if "updateIsInvalid" update the new CW20 validation', () => {
    const commit = jest.fn();
    const isInvalid = true;

    actions.updateIsInvalid({ commit }, isInvalid);

    expect(commit).toHaveBeenCalledWith('setIsInvalid', isInvalid);
  });
});

jest.mock('@/apis/http/commercio-api.js', () => ({
  requestGovernmentAddress: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            governmentAddress: 'governmentAddress',
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
