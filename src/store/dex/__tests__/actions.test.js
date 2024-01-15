import { mockBalances, mockErrors, mockPagination } from '@/__mocks__';
import actions from '../actions.js';
import { CONTRACT } from '@/constants';

const mockErrorResponse = mockErrors(400);
let mockError = false;
let mockResponse = null;
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

  test('if "initDex" reset store, set loading state and dispatch wanted actions', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const rootGetters = {
      'keplr/wallet': 'wallet',
    };
    const address = 'address';

    await actions.initDex({ commit, dispatch, rootGetters }, address);

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(commit).toHaveBeenCalledWith('setHasWallet', true);
    expect(dispatch).toHaveBeenCalledWith('fetchBalances');
    expect(dispatch).toHaveBeenCalledWith('fetchContract', address);
    expect(commit).toHaveBeenCalledWith('setLoading', false);

    const dispatchFetchBalances = jest.fn('fetchBalances');
    rootGetters['keplr/wallet'] = '';

    await actions.initDex({ commit, dispatch, rootGetters }, address);

    expect(dispatchFetchBalances).not.toHaveBeenCalled();
  });

  test('if "fetchBalances" save the balances, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const rootGetters = {
      'keplr/wallet': 'wallet',
    };

    await actions.fetchBalances({ commit, rootGetters });

    expect(commit).toHaveBeenCalledWith(
      'setBalances',
      mockResponse.data.balances
    );

    mockError = true;

    await actions.fetchBalances({ commit, rootGetters });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchContract" set contract data and dispatch wanted actions', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = 'address';

    await actions.fetchContract({ commit, dispatch }, address);

    expect(commit).toHaveBeenCalledWith('setContractProp', {
      path: 'address',
      value: address,
    });
    expect(dispatch).toHaveBeenCalledWith('getFee', address);
    expect(dispatch).toHaveBeenCalledWith('getInfo', address);
  });

  test('if "getFee" set contract data, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const address = 'address';

    await actions.getFee({ commit }, address);

    expect(commit).toHaveBeenCalledWith('setContractProp', {
      path: CONTRACT.KEY.QUERY.FEE,
      value: mockResponse.data.data,
    });

    mockError = true;

    await actions.getFee({ commit }, address);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "getInfo" set contract data, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const address = 'address';

    await actions.getInfo({ commit }, address);

    expect(commit).toHaveBeenCalledWith('setContractProp', {
      path: CONTRACT.KEY.QUERY.INFO,
      value: mockResponse.data.data,
    });

    mockError = true;

    await actions.getInfo({ commit }, address);

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
