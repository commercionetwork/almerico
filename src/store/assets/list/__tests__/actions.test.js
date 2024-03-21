import actions from '../actions.js';
import {
  mockBalances,
  mockErrors,
  mockPagination,
  mockSupply,
  mockWasmsBalances,
} from '@/__mocks__';
import { CONFIG, CONTRACT } from '@/constants';
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
    expect(dispatch).toHaveBeenCalledWith('fetchSupply');
    expect(dispatch).toHaveBeenCalledWith(
      'fetchAssets',
      CONFIG.WASM_CW20_CODE_ID
    );
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "fetchSupply" set the supply, and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchSupply({ commit });

    expect(commit).toHaveBeenCalledWith('setSupply', mockResponse.data.supply);

    mockError = true;

    await actions.fetchSupply({ commit });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
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

  test('if "fetchBalances" add balances, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const wallet = 'wallet';

    await actions.fetchBalances({ commit }, wallet);

    expect(commit).toHaveBeenCalledWith('addBalancesProp', {
      path: CONTRACT.TOKEN.TYPE.NATIVE,
      value: mockResponse.data.balances,
    });

    mockError = true;

    await actions.fetchBalances({ commit }, wallet);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchWasmBalances" add wasm balances, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const wallet = 'wallet';

    await actions.fetchWasmBalances({ commit }, wallet);

    expect(commit).toHaveBeenCalledWith('addBalancesProp', {
      path: CONTRACT.TOKEN.TYPE.CW20,
      value: mockResponse.data.balances,
    });

    mockError = true;

    await actions.fetchWasmBalances({ commit }, wallet);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });
});

jest.mock('@/apis/http/bank-api.js', () => ({
  requestBalances: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            balances: mockBalances(),
            pagination: mockPagination(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestSupply: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            supply: mockSupply(),
            pagination: mockPagination(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));

jest.mock('@/apis/http/cosmwasm-api.js', () => ({
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

jest.mock('@/apis/http/wasms-api.js', () => ({
  requestAccountBalances: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            balances: mockWasmsBalances(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
