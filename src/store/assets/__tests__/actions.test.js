import actions from '../actions.js';
import { mockErrors, mockPagination } from '@/__mocks__';
import { CONFIG } from '@/constants';
import { stringEncoder } from '@/utils';

const mockErrorResponse = mockErrors(400);
let mockError = false;
let mockResponse = null;

let counter = 1;
const mockContracts = new Array(10)
  .fill(null)
  .map(() => `contract ${counter++}`);

describe('store/assets/actions', () => {
  const queryData = 'queryData';
  jest.spyOn(stringEncoder, 'encodeToBase64').mockReturnValue(queryData);

  beforeEach(() => {
    mockError = false;
    mockResponse = null;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('if "initAssetsList" reset store, set loading state, dispatch "fetchAssets" action', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.initAssetsList({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith(
      'fetchAssets',
      CONFIG.WASM_CW20_CODE_ID
    );
    expect(commit).toHaveBeenCalledWith('setLoading', false);
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

  test('if "initAssetsNew" reset store, set loading state, dispatch "keplr/connect" action', async () => {
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
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "getContracts" return the contracts list, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const codeId = 'codeId';

    const response = await actions.getContracts({ commit }, codeId);

    expect(response).toStrictEqual(mockContracts);

    mockError = true;

    await actions.getContracts({ commit }, codeId);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
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

jest.mock('../../../apis/http/cosmwasm.js', () => ({
  requestContracts: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            contracts: mockContracts,
            pagination: mockPagination(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
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
