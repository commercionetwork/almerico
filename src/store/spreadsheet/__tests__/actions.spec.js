import actions from '../actions.js';
import { mockBalances } from '../../account/__mocks__/balances';
import { CHAIN } from '@/constants';

const mockErrorResponse = {
  request: {},
  response: {
    data: {
      error: 'error',
    },
    status: 400,
  },
};
const mockErrorRequestResponse = {
  request: {},
  response: undefined,
};

let mockError = false;
let mockErrorRequest = false;
let mockErrorServer = false;
let mockResponse = null;

describe('store/spreadsheet/actions', () => {
  beforeEach(() => {
    mockError = false;
    mockErrorRequest = false;
    mockErrorServer = false;
    mockResponse = null;
  });

  test('if "actions.initSpreadsheet" dispatch "fetchAbrTokens", "fetchVbrTokens", "fetchAbrTokens" and "fetchAccountsTokens" actions', async () => {
    const dispatch = jest.fn();
    const commit = jest.fn();

    await actions.initSpreadsheet({
      dispatch,
      commit,
    });

    expect(dispatch).toHaveBeenCalledWith('fetchAbrTokens');
    expect(dispatch).toHaveBeenCalledWith('fetchAccountsTokens');
    expect(dispatch).toHaveBeenCalledWith('fetchAllTokens');
    expect(dispatch).toHaveBeenCalledWith('fetchVbrTokens');
  });

  test('if "actions.fetchAbrTokens" set abr tokens', async () => {
    const dispatch = jest.fn();
    const commit = jest.fn();

    await actions.fetchAbrTokens({
      dispatch,
      commit,
    });

    expect(commit).toHaveBeenCalledWith(
      'setAbrTokens',
      mockResponse.data.result,
    );
  });

  test('if "actions.fetchAbrTokens" has an error, dispatch "handleError"', async () => {
    const dispatch = jest.fn();
    const commit = jest.fn();
    mockError = true;

    await actions.fetchAbrTokens({
      dispatch,
      commit,
    });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test('if "actions.fetchVbrTokens" set vbr tokens', async () => {
    const dispatch = jest.fn();
    const commit = jest.fn();

    await actions.fetchVbrTokens({
      dispatch,
      commit,
    });

    expect(commit).toHaveBeenCalledWith(
      'setVbrTokens',
      mockResponse.data.result,
    );
  });

  test('if "actions.fetchVbrTokens" has an error, dispatch "handleError"', async () => {
    const dispatch = jest.fn();
    const commit = jest.fn();
    mockError = true;

    await actions.fetchVbrTokens({
      dispatch,
      commit,
    });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test('if "actions.fetchAllTokens" set all tokens', async () => {
    const dispatch = jest.fn();
    const commit = jest.fn();

    await actions.fetchAllTokens({
      dispatch,
      commit,
    });

    expect(commit).toHaveBeenCalledWith(
      'setAllTokens',
      mockResponse.data.result,
    );
  });

  test('if "actions.fetchAllTokens" has an error, dispatch "handleError"', async () => {
    const dispatch = jest.fn();
    const commit = jest.fn();
    mockError = true;

    await actions.fetchAllTokens({
      dispatch,
      commit,
    });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });

  test('if "actions.fetchAccountsTokens" set accounts tokens', async () => {
    const dispatch = jest.fn();
    const commit = jest.fn();

    await actions.fetchAccountsTokens({
      dispatch,
      commit,
    });

    const accounts = JSON.parse(CHAIN.OVERVIEW_ACCOUNTS);
    for (const account of accounts) {
      account.balances = mockResponse.data.result;
      expect(commit).toHaveBeenCalledWith('addAccountTokens', account);
    }
  });

  test('if "actions.fetchAccountsTokens" has an error, dispatch "handleError"', async () => {
    const dispatch = jest.fn();
    const commit = jest.fn();
    mockError = true;

    await actions.fetchAccountsTokens({
      dispatch,
      commit,
    });

    expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  });
});

jest.mock('./../http', () => ({
  requestAbrTokens: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }
        if (mockErrorRequest) {
          reject(mockErrorRequestResponse);
        }
        if (mockErrorServer) {
          reject({});
        }

        mockResponse = {
          data: {
            height: '1',
            result: mockBalances(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestVbrTokens: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }
        if (mockErrorRequest) {
          reject(mockErrorRequestResponse);
        }
        if (mockErrorServer) {
          reject({});
        }

        mockResponse = {
          data: {
            height: '1',
            result: mockBalances(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestAllTokens: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }
        if (mockErrorRequest) {
          reject(mockErrorRequestResponse);
        }
        if (mockErrorServer) {
          reject({});
        }

        mockResponse = {
          data: {
            height: '1',
            result: mockBalances(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestBalances: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }
        if (mockErrorRequest) {
          reject(mockErrorRequestResponse);
        }
        if (mockErrorServer) {
          reject({});
        }

        mockResponse = {
          data: {
            height: '1',
            result: mockBalances(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
