import actions from '../actions.js';
import {
  mockErrors,
  mockIBCChannels,
  mockIBCClient,
  mockPagination,
} from '@/__mocks__';

const mockErrorResponse = mockErrors(400);
let mockError = false;
let mockResponse = null;

describe('store/assetsIbc/actions', () => {
  beforeEach(() => {
    mockError = false;
    mockResponse = null;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('if "handleModal" set the modal data', () => {
    const commit = jest.fn();
    const modal = { id: 1 };

    actions.handleModal({ commit }, modal);

    expect(commit).toHaveBeenCalledWith('setModal', modal);
  });

  test('if "initIBCTransfer" reset connection, set loading state and dispatch wanted actions', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const connectionId = 'connectionId';

    await actions.initIBCTransfer({ commit, dispatch }, connectionId);

    expect(commit).toHaveBeenCalledWith('setConnection', null);
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchChannel', connectionId);
    expect(dispatch).toHaveBeenCalledWith('fetchClient', connectionId);
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "fetchChannel" set the channel data, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const connectionId = 'connectionId';

    await actions.fetchChannel({ commit }, connectionId);

    expect(commit).toHaveBeenCalledWith('addConnectionProp', {
      path: 'channel',
      value: mockResponse.data.channels[0],
    });

    mockError = true;

    await actions.fetchChannel({ commit }, connectionId);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchClient" set the client data, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const connectionId = 'connectionId';

    await actions.fetchClient({ commit }, connectionId);

    expect(commit).toHaveBeenCalledWith('addConnectionProp', {
      path: 'client',
      value: mockResponse.data.identified_client_state,
    });

    mockError = true;

    await actions.fetchClient({ commit }, connectionId);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });
});

jest.mock('@/apis/http/ibc-core-api.js', () => ({
  requestConnectionChannels: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            channels: mockIBCChannels(),
            pagination: mockPagination(),
            height: {
              revision_number: '1',
              revision_height: '123456',
            },
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestConnectionClientState: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            identified_client_state: mockIBCClient(),
            proof: null,
            proof_height: {
              revision_number: '1',
              revision_height: '123456',
            },
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
