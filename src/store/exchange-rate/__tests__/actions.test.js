import { mockErrors, mockChart, mockOverview } from '@/__mocks__';
import actions from '../actions.js';

const mockErrorResponse = mockErrors(400);
let mockError = false;
let mockResponse = null;

describe('store/exchange-rate/actions', () => {
  beforeEach(() => {
    mockError = false;
    mockResponse = null;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('if "initExchangeRate" reset store, set loading state, dispatch "fetchChart" and "fetchOverview" actions', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.initExchangeRate({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchChart');
    expect(dispatch).toHaveBeenCalledWith('fetchOverview');
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "fetchChart" action commit "setChart" mutation, and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchChart({ commit });

    expect(commit).toHaveBeenCalledWith('setChart', mockResponse.data);

    mockError = true;

    await actions.fetchChart({ commit });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchOverview" action commit "setOverview" mutation, and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchOverview({ commit });

    expect(commit).toHaveBeenCalledWith('setOverview', mockResponse.data);

    mockError = true;

    await actions.fetchOverview({ commit });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });
});

jest.mock('../../../apis/http/chart.js', () => ({
  requestTokens: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: mockChart(),
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));

jest.mock('../../../apis/http/overview.js', () => ({
  requestExchangeRate: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: mockOverview(),
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
