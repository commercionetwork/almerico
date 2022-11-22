import actions from '../actions.js';
import {
  mockErrors,
  mockPagination,
  mockContracts,
  mockEntries,
  mockEntry,
  mockModels,
} from '@/__mocks__';
import { stringEncoder } from '@/utils';

const mockErrorResponse = mockErrors(400);
let mockError = false;
let mockResponse = null;

describe('store/account-balance/actions', () => {
  beforeEach(() => {
    mockError = false;
    mockResponse = null;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('if "initAllBalancesDashboard" reset store, set loading state, dispatch "fetchWasmBalances", "account/fetchBalances" and "account/fetchMembership" actions', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const address = 'address';

    await actions.initAllBalancesDashboard({ commit, dispatch }, address);

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchWasmBalances', address);
    expect(dispatch).toHaveBeenCalledWith('account/fetchBalances', address, {
      root: true,
    });
    expect(dispatch).toHaveBeenCalledWith('account/fetchMembership', address, {
      root: true,
    });
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "fetchWasmBalances" dispatch "fetchCw20Contracts" and "fetchSwapContract" actions, and set the balances', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const cw20Contracts = mockContracts(10);
    const swapContracts = mockContracts(5);
    const getters = { cw20Contracts, swapContracts };
    const address = 'address';
    const expectedBalances = () => {
      const entry = mockEntry();
      const contracts = [];
      for (const cw20 of cw20Contracts) {
        if (swapContracts.includes(cw20)) {
          continue;
        } else {
          contracts.push(cw20);
        }
      }
      return contracts.map((contract) => ({
        contract,
        balance: '1',
        name: entry.msg.name,
        decimals: entry.msg.decimals,
        symbol: entry.msg.symbol,
      }));
    };

    await actions.fetchWasmBalances({ commit, dispatch, getters }, address);

    expect(dispatch).toHaveBeenCalledWith('fetchCw20Contracts');
    expect(dispatch).toHaveBeenCalledWith('fetchSwapContracts');
    expect(commit).toHaveBeenCalledWith('setBalances', expectedBalances());
  });

  test('if "fetchCw20Contracts" action commit "addCw20Contracts" mutation, and set an empty string if an error is caught', async () => {
    const commit = jest.fn();

    await actions.fetchCw20Contracts({ commit });

    expect(commit).toHaveBeenCalledWith(
      'addCw20Contracts',
      mockResponse.data.contracts
    );

    mockError = true;

    await actions.fetchCw20Contracts({ commit });

    expect(commit).toHaveBeenCalledWith('addCw20Contracts', '');
  });

  test('if "fetchSwapContracts" action commit "addSwapContract" mutation', async () => {
    const commit = jest.fn();
    const mockAddress = 'did:com:1';
    const spy = jest.spyOn(stringEncoder, 'decodeBase64ToString');
    spy.mockReturnValue(mockAddress);

    await actions.fetchSwapContracts({ commit });

    expect(commit).toHaveBeenCalledWith('addSwapContract', mockAddress);
  });
});

jest.mock('../../../apis/http/cosmwasm.js', () => ({
  requestContracts() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            contracts: mockContracts(),
            pagination: mockPagination(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestContractBalance() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            data: {
              balance: '1',
            },
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestContractHistory() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            entries: mockEntries(),
            pagination: mockPagination(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestContractState() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            models: mockModels(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
