import actions from '../actions.js';
import { mockErrors, mockWasmsBalances } from '@/__mocks__';

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

  test('if "fetchWasmBalances" action commit "setBalances" mutation, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const accountAddress = 'address';

    await actions.fetchWasmBalances({ commit }, accountAddress);

    expect(commit).toHaveBeenCalledWith(
      'setBalances',
      mockResponse.data.balances
    );

    mockError = true;

    await actions.fetchWasmBalances({ commit }, accountAddress);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "saveCW20" action commit "setCW20" mutation', () => {
    const commit = jest.fn();
    const cw20 = { id: 1 };

    actions.saveCW20({ commit }, cw20);

    expect(commit).toHaveBeenCalledWith('setCW20', cw20);
  });
});

jest.mock('../../../apis/http/wasms.js', () => ({
  requestAccountBalances() {
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
