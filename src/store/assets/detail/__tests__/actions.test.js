import actions from '../actions.js';
import { mockErrors } from '@/__mocks__';
import { stringEncoder } from '@/utils';

const mockErrorResponse = mockErrors(400);
let mockError = false;
let mockResponse = null;

describe('store/assetsDetail/actions', () => {
  const queryData = 'queryData';
  jest.spyOn(stringEncoder, 'encodeToBase64').mockReturnValue(queryData);

  beforeEach(() => {
    mockError = false;
    mockResponse = null;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('if "initAssetsDetail" reset store, set loading state, dispatch "fetchAssetDetail" action', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = 'address';

    await actions.initAssetsDetail({ commit, dispatch }, address);

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchAssetDetail', address);
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "initAssetsTransfer" reset store, set loading state, dispatch "fetchAssetToTransfer" action', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = 'address';

    await actions.initAssetsTransfer({ commit, dispatch }, address);

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchAssetToTransfer', address);
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "getMarketingInfo" dispatch "getContractDetail" action', async () => {
    const dispatch = jest.fn();
    const address = 'address';

    await actions.getMarketingInfo({ dispatch }, address);

    expect(dispatch).toHaveBeenCalledWith('getContractDetail', {
      address,
      queryData,
    });
  });

  test('if "getMinter" dispatch "getContractDetail" action', async () => {
    const dispatch = jest.fn();
    const address = 'address';

    await actions.getMinter({ dispatch }, address);

    expect(dispatch).toHaveBeenCalledWith('getContractDetail', {
      address,
      queryData,
    });
  });

  test('if "getTokenInfo" dispatch "getContractDetail" action', async () => {
    const dispatch = jest.fn();
    const address = 'address';

    await actions.getTokenInfo({ dispatch }, address);

    expect(dispatch).toHaveBeenCalledWith('getContractDetail', {
      address,
      queryData,
    });
  });

  test('if "getContractDetail" return the contract detail, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const address = 'address';
    const queryData = 'queryData';

    const response = await actions.getContractDetail(
      { commit },
      { address, queryData }
    );

    expect(response).toStrictEqual(mockResponse.data.data);

    mockError = true;

    await actions.getContractDetail({ commit }, { address, queryData });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });
});

jest.mock('@/apis/http/cosmwasm-api.js', () => ({
  requestContractSmartQuery: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: { data: 'data' },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
