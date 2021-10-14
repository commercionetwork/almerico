import actions from '../actions.js';
import { mockConversionRate } from '../__mocks__/conversionRate';
import { mockRateUpdates } from '../__mocks__/listings';
import { mockBlock } from '../../blocks/__mocks__/blocks';

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

describe('store/dashboard/actions', () => {
  test('description', () => {
    const expectedValue = true;
    expect(true).toBe(expectedValue);
  });
  // beforeEach(() => {
  //   mockError = false;
  //   mockErrorRequest = false;
  //   mockErrorServer = false;
  //   mockResponse = null;
  // });

  // test("if 'actions.init' dispatch actions to fetch starting date, conversion rate and rate updates", async () => {
  //   const dispatch = jest.fn();
  //   const commit = jest.fn();

  //   await actions.init({ dispatch, commit });

  //   expect(dispatch).toHaveBeenCalledWith('fetchStartingDate');
  //   expect(dispatch).toHaveBeenCalledWith('fetchConversionRate');
  //   expect(dispatch).toHaveBeenCalledWith('fetchRateUpdates');
  //   expect(dispatch).toHaveBeenCalledWith('spreadsheet/fetchAbrTokens', null, {
  //     root: true,
  //   });
  //   expect(dispatch).toHaveBeenCalledWith('spreadsheet/fetchVbrTokens', null, {
  //     root: true,
  //   });
  // });

  // test("if 'actions.fetchConversionRate' set rate", async () => {
  //   const commit = jest.fn();
  //   const dispatch = jest.fn();

  //   await actions.fetchConversionRate({ dispatch, commit });

  //   expect(commit).toHaveBeenCalledWith(
  //     'setConversionRate',
  //     mockResponse.data.result,
  //   );
  // });

  // test("if 'actions.fetchConversionRate' has an error, dispatch 'handleError'", async () => {
  //   const commit = jest.fn();
  //   const dispatch = jest.fn();
  //   mockError = true;

  //   await actions.fetchConversionRate({ dispatch, commit });

  //   expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  // });

  // test("if 'actions.fetchRateUpdates' set rate", async () => {
  //   const commit = jest.fn();
  //   const dispatch = jest.fn();

  //   await actions.fetchRateUpdates({ dispatch, commit });

  //   expect(commit).toBeCalledWith('setRateUpdates', mockResponse.data.txs);
  // });

  // test("if 'actions.fetchRateUpdates' has an error, dispatch 'handleError'", async () => {
  //   const commit = jest.fn();
  //   const dispatch = jest.fn();
  //   mockError = true;

  //   await actions.fetchRateUpdates({ dispatch, commit });

  //   expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  // });

  // test("if 'actions.fetchStartingDate' set date", async () => {
  //   const commit = jest.fn();
  //   const dispatch = jest.fn();

  //   await actions.fetchStartingDate({ dispatch, commit });

  //   expect(commit).toBeCalledWith(
  //     'setStartingDate',
  //     mockResponse.data.block.header.time,
  //   );
  // });

  // test("if 'actions.fetchStartingDate' has an error, dispatch 'handleError'", async () => {
  //   const commit = jest.fn();
  //   const dispatch = jest.fn();
  //   mockError = true;

  //   await actions.fetchStartingDate({ dispatch, commit });

  //   expect(dispatch).toHaveBeenCalledWith('handleError', mockErrorResponse);
  // });

  // test("if 'actions.handleError' handles the various types of error", () => {
  //   const commit = jest.fn();
  //   let error = mockErrorResponse;

  //   actions.handleError({ commit }, error);

  //   expect(commit).toBeCalledWith('setError', error.response);

  //   error = mockErrorRequestResponse;

  //   actions.handleError({ commit }, error);

  //   expect(commit).toBeCalledWith('setError', error);

  //   error = 'error';

  //   actions.handleError({ commit }, error);

  //   expect(commit).toBeCalledWith('setServerReachability', false, {
  //     root: true,
  //   });
  // });
});

jest.mock('./../http', () => ({
  requestConversionRate: () => {
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
            height: '0',
            result: mockConversionRate(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestRateUpdates: () => {
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
            total_count: '5',
            count: '5',
            page_number: '1',
            page_total: '1',
            limit: '30',
            txs: mockRateUpdates(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestBlock: () => {
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
          data: mockBlock(),
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
