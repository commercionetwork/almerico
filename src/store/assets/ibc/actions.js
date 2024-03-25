import { ibcCore } from '@/apis/http';
import { msgBuilder } from '@/utils';

export default {
  handleModal({ commit }, modal) {
    commit('setModal', modal);
  },
  async initIBCTransfer({ commit, dispatch }, connectionId) {
    commit('setConnection', null);
    commit('setLoading', true);
    const requests = [
      dispatch('fetchChannel', connectionId),
      dispatch('fetchClient', connectionId),
    ];
    await Promise.all(requests);
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
  // async fetchConnectionBalance(
  //   { commit },
  //   { chain, connection, token, wallet }
  // ) {
  //   const address = bech32Manager.encode(
  //     bech32Manager.decode(wallet),
  //     chain.hrp
  //   );
  //   const channel = connection['channel']['counterparty'];
  //   const denom = tokensHandler.buildIBCDenom({
  //     channelId: channel.channel_id,
  //     portId: channel.port_id,
  //     token,
  //   });
  //   try {
  //     const response = await bank.requestTokenBalance({
  //       address,
  //       baseURL: connection.lcd,
  //       denom,
  //     });
  //     console.log('response', response.data.balance);
  //   } catch (error) {
  //     commit('setError', error);
  //   }
  // },
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
    await dispatch('keplr/signAndBroadcastTransaction', [msg], { root: true });
    commit('setHandling', false);
  },
};
