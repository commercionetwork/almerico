import {
  mockContracts,
  mockErrors,
  mockModels,
  mockPagination,
} from '@/__mocks__';
import actions from '../actions.js';

const mockErrorResponse = mockErrors(400);
let mockError = false;
let mockResponse = null;
let mockNextKey = '';
let mockCounter = 1;
const mockContractsCount = 4;
const mockResponseCount = 2;

describe('store/dex/list/actions', () => {
  beforeEach(() => {
    mockError = false;
    mockResponse = null;
    mockNextKey = '';
    mockCounter = 1;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('if "initDexList" reset store, set loading state, dispatch wanted actions', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.initDexList({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchContracts');
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "getDexContracts" return the contracts, and set the error if it is caught', async () => {
    const commit = jest.fn();

    const response = await actions.getDexContracts({ commit });

    expect(response.length).toBe(mockContractsCount * mockResponseCount);

    mockError = true;

    await actions.getDexContracts({ commit });

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
});

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
  requestContractState: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            models: mockModels(),
            pagination: mockPagination(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
