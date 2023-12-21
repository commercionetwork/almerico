import {
  mockBalances,
  mockContracts,
  mockErrors,
  mockPagination,
} from '@/__mocks__';
import actions from '../actions.js';
import { CONTRACT } from '@/constants';

const mockErrorResponse = mockErrors(400);
let mockError = false;
let mockResponse = null;
let mockNextKey = '';
let mockCounter = 1;
const mockContractsCount = 4;
const mockResponseCount = 2;
const mockModels = [
  {
    //key: balancedid:com:1cjnpack2jqngdhj9cap23h4n3dmxcvqswgyrlc
    key: '000762616C616E63656469643A636F6D3A31636A6E7061636B326A716E6764686A39636170323368346E33646D7863767173776779726C63',
    value: 'IjkwMDAwMDAi',
  },
  {
    //token_info
    key: '746F6B656E5F696E666F',
    value:
      'eyJuYW1lIjoiV2FzbVN3YXBfTGlxdWlkaXR5X1Rva2VuIiwic3ltYm9sIjoid3NscHQiLCJkZWNpbWFscyI6NiwidG90YWxfc3VwcGx5IjoiOTAwMDAwMCIsIm1pbnQiOnsibWludGVyIjoiZGlkOmNvbToxdDZkdnk1NGo5ODI2Y2xzZ2tnM3g3ZTNzbWt6ZDkyNGZjeHZ2cHJrdWV4bnR5NDZnejNrczJqNHk3diIsImNhcCI6bnVsbH19',
  },
];

describe('store/dex/actions', () => {
  beforeEach(() => {
    mockError = false;
    mockResponse = null;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('if "initDex" reset store, set loading state, dispatch wanted actions,; if no account is connected set to false has wallet', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const rootGetters = {
      'keplr/wallet': 'wallet',
    };

    await actions.initDex({ commit, dispatch, rootGetters });

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchContracts');
    expect(commit).toHaveBeenCalledWith('setLoading', false);

    rootGetters['keplr/wallet'] = '';

    await actions.initDex({ commit, dispatch, rootGetters });

    expect(commit).toHaveBeenCalledWith('setHasWallet', false);
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "getContracts" return the contracts, and set the error if it is caught', async () => {
    const commit = jest.fn();

    const response = await actions.getContracts({ commit });

    expect(response.length).toBe(mockContractsCount * mockResponseCount);

    mockError = true;

    await actions.getContracts({ commit });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "getContractModels" return the models, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const address = 'address';

    const response = await actions.getContractModels({ commit }, address);

    expect(response).toStrictEqual(mockResponse.data.models);

    mockError = true;

    await actions.getContractModels({ commit }, address);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchDex" set loading state and dispatch wanted actions', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = 'address';

    await actions.fetchDex({ commit, dispatch }, address);

    expect(commit).toHaveBeenCalledWith('setFetching', true);
    expect(dispatch).toHaveBeenCalledWith('getDexDetail', address);
    expect(commit).toHaveBeenCalledWith('setFetching', false);
  });

  test('if "getContractInfo" return the info, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const contract = 'contract';
    const owner = 'did:com:1cjnpack2jqngdhj9cap23h4n3dmxcvqswgyrlc';

    const response = await actions.getContractInfo(
      { commit },
      { contract, owner }
    );

    expect(response).toHaveProperty(CONTRACT.KEY.STATE.BALANCE);
    expect(response).toHaveProperty(CONTRACT.KEY.STATE.TOKEN_INFO);

    mockError = true;

    await actions.getContractInfo({ commit }, { contract, owner });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "getContractAllowance" return the query data, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const contract = 'contract';
    const owner = 'owner';
    const spender = 'spender';

    const response = await actions.getContractAllowance(
      { commit },
      { contract, owner, spender }
    );

    expect(response).toStrictEqual(mockResponse.data.data);

    mockError = true;

    await actions.getContractAllowance(
      { commit },
      { contract, owner, spender }
    );

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "getContractFee" return the query data, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const address = 'address';

    const response = await actions.getContractFee({ commit }, address);

    expect(response).toStrictEqual(mockResponse.data.data);

    mockError = true;

    await actions.getContractFee({ commit }, address);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "getBalances" return the balances, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const rootGetters = {
      'keplr/wallet': 'wallet',
    };

    const response = await actions.getBalances({ commit, rootGetters });

    expect(response).toStrictEqual(mockResponse.data.balances);

    mockError = true;

    await actions.getBalances({ commit, rootGetters });

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
}));

jest.mock('@/apis/http/cosmwasm-api.js', () => ({
  requestContracts: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockNextKey = mockCounter < mockResponseCount ? 'nextKey' : '';

        mockResponse = {
          data: {
            contracts: mockContracts(mockContractsCount),
            pagination: mockPagination(mockNextKey),
          },
        };
        resolve(mockResponse);
        mockCounter++;
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
          data: {
            data: 'data',
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestContractState: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            models: mockModels,
            pagination: mockPagination(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
