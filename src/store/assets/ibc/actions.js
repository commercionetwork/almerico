import { bank, ibcCore } from '@/apis/http';
import { bech32Manager, msgBuilder, tokensHandler } from '@/utils';

export default {
  handleModal({ commit }, modal) {
    commit('setModal', modal);
  },
  async initIBCTransfer({ commit, dispatch }, connection) {
    commit('setConnection', null);
    commit('setLoading', true);
    const requests = [
      dispatch('fetchChannel', connection.id),
      dispatch('fetchClient', connection.id),
    ];
    await Promise.all(requests);
    await dispatch('fetchConnectionBalance', connection);
    commit('setLoading', false);
  },
  async fetchChannel({ commit }, connectionId) {
    try {
      const response = await ibcCore.requestConnectionChannels(connectionId);
      const channels = response.data.channels;
      if (channels.length > 0) {
        const channel = channels.find(
          (channel) => channel.state === 'STATE_OPEN'
        );
        commit('addConnectionProp', {
          path: 'channel',
          value: channel,
        });
      }
    } catch (error) {
      commit('setError', error);
    }
  },
  async fetchClient({ commit }, connectionId) {
    try {
      const response = await ibcCore.requestConnectionClientState(connectionId);
      commit('addConnectionProp', {
        path: 'client',
        value: response.data.identified_client_state,
      });
    } catch (error) {
      commit('setError', error);
    }
  },
  async fetchConnectionBalance({ commit, getters, rootGetters }, chain) {
    const connection = getters['connection'];
    const modal = getters['modal'];
    const wallet = rootGetters['keplr/wallet'];
    if (!connection || !modal || !wallet) {
      return;
    }
    const address = bech32Manager.encode(
      bech32Manager.decode(wallet),
      chain.hrp
    );
    const channel = connection['channel']['counterparty'];
    const denom = tokensHandler.buildIBCDenom({
      channelId: channel.channel_id,
      portId: channel.port_id,
      token: modal.token,
    });
    try {
      const response = await bank.requestTokenBalance({
        address,
        baseURL: chain.lcd,
        denom,
      });
      commit('addModalProp', {
        path: 'counterparty_balance',
        value: response.data.balance,
      });
    } catch (error) {
      commit('setError', error);
    }
  },
  async transferTokens(
    { commit, dispatch, rootGetters },
    { data, translator, context }
  ) {
    if (!rootGetters['keplr/isInitialized']) {
      await dispatch(
        'keplr/connect',
        { translator, context },
        {
          root: true,
        }
      );
    }
    const msg = msgBuilder.buildMsgTransfer(data);
    commit('setHandling', true);
    const result = await dispatch('keplr/signAndBroadcastTransaction', [msg], {
      root: true,
    });
    commit('setHandling', false);
    return result;
  },
};
