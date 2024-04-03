import { bank, ibcCore } from '@/apis/http';
import { CONFIG, TRANSFER } from '@/constants';
import { bech32Manager, msgBuilder, tokensHandler } from '@/utils';

export default {
  handleModal({ commit }, modal) {
    commit('setModal', modal);
  },
  async initIBCTransfer({ commit, dispatch }) {
    commit('reset');
    commit('setLoading', true);
    await dispatch('getConnectionChannels');
    commit('setLoading', false);
  },
  async getConnectionChannels({ commit }) {
    const connections = CONFIG.CONNECTIONS;
    for (const connection of connections) {
      try {
        const response = await ibcCore.requestConnectionChannels(connection.id);
        const data = Object.assign(
          {},
          { ...connection },
          { channels: response.data.channels }
        );
        commit('addConnection', data);
      } catch (error) {
        commit('setError', error);
      }
    }
  },
  async fetchIBCChain({ commit, dispatch }, { chain, translator, context }) {
    const $t = translator.bind(context);
    const chainInfo = TRANSFER.INFO(chain.chain_id);
    const requests = [
      dispatch('getTokenBalance', chain),
      dispatch('keplr/suggestChain', { chainInfo, $t }, { root: true }),
    ];
    commit('setHandling', true);
    await Promise.all(requests);
    commit('setHandling', false);
  },
  async getTokenBalance({ commit, getters, rootGetters }, chain) {
    const modal = getters['modal'];
    const wallet = rootGetters['keplr/wallet'];
    const address = bech32Manager.encode(
      bech32Manager.decode(wallet),
      chain.hrp
    );
    const counterparty = chain.counterparty;
    const denom = tokensHandler.buildIBCDenom({
      channelId: counterparty.channel_id,
      portId: counterparty.port_id,
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
    { chain, data, translator, context }
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
    const result = await dispatch(
      'keplr/signAndBroadcastTransaction',
      { chain, msgs: [msg] },
      {
        root: true,
      }
    );
    commit('setHandling', false);
    return result;
  },
};
