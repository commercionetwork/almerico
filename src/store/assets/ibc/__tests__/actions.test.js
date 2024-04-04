import actions from '../actions.js';
import { CONFIG, TRANSFER } from '@/constants';
import {
  mockBalance,
  mockErrors,
  mockIBCChannel,
  mockIBCChannels,
  mockPagination,
} from '@/__mocks__';
import { bech32 } from 'bech32';
import bech32Manager from '../../../../utils/bech32-manager.js';

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

  test('if "initIBCTransfer" reset state, set loading state and dispatch wanted actions', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const connections = CONFIG.CONNECTIONS;

    await actions.initIBCTransfer({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith('setLoading', true);
    for (const connection of connections) {
      expect(dispatch).toHaveBeenCalledWith('getConnectionChannel', connection);
    }
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "getConnectionChannel" return the open channel, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const connection = { id: 1 };

    const response = await actions.getConnectionChannel({ commit }, connection);

    const expectedChannel = mockResponse.data.channels.find(
      (channel) => channel.state === 'STATE_OPEN'
    );

    expect(response).toStrictEqual(expectedChannel);

    mockError = true;

    await actions.getConnectionChannel({ commit }, connection);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "getChannelProofHeight" return the proof height, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const channelId = 'channelId';
    const portId = 'portId';

    const response = await actions.getChannelProofHeight(
      { commit },
      { channelId, portId }
    );

    expect(response).toStrictEqual(mockResponse.data.proof_height);

    mockError = true;

    await actions.getChannelProofHeight({ commit }, { channelId, portId });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchIBCChain" dispatch wanted actions and set handling state', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const chain = { chain_id: 'chainId' };
    const translator = jest.fn();
    const context = {};

    await actions.fetchIBCChain(
      { commit, dispatch },
      { chain, translator, context }
    );

    expect(commit).toHaveBeenCalledWith('setHandling', true);
    expect(dispatch).toHaveBeenCalledWith('getTokenBalance', chain);
    expect(commit).toHaveBeenCalledWith('setHandling', false);
  });

  test('if "getTokenBalance" set the modal data, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const getters = {
      modal: {
        token: { id: 1 },
      },
    };
    const rootGetters = {
      'keplr/wallet': 'did:com:133nf49v83dts7pq30csnnl7ul5unsvzz55qt20',
    };
    const chain = {
      hrp: 'hrp',
      counterparty: { channel_id: 'channelId', port_id: 'portId' },
    };
    jest
      .spyOn(bech32Manager, 'encode')
      .mockReturnValue('did:com:133nf49v83dts7pq30csnnl7ul5unsvzz55qt20');

    await actions.getTokenBalance({ commit, getters, rootGetters }, chain);

    expect(commit).toHaveBeenCalledWith('addModalProp', {
      path: 'counterparty_balance',
      value: mockResponse.data.balance,
    });

    mockError = true;

    await actions.getTokenBalance({ commit, getters, rootGetters }, chain);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });
});

jest.mock('@/apis/http/bank-api.js', () => ({
  requestTokenBalance: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            balance: mockBalance(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));

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
              revision_number: '0',
              revision_height: '17726991',
            },
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestChannelDetail: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            channel: mockIBCChannel(),
            proof: null,
            proof_height: {
              revision_number: '0',
              revision_height: '17727015',
            },
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
