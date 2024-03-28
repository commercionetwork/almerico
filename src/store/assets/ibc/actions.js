import { bank } from '@/apis/http';
import { CHAIN } from '@/constants';
import { bech32Manager, msgBuilder, tokensHandler } from '@/utils';

export default {
  handleModal({ commit }, modal) {
    commit('setModal', modal);
  },
  async initIBCTransfer({ commit, dispatch }, chain) {
    commit('setLoading', true);
    await dispatch('fetchTokenBalance', chain);
    commit('setLoading', false);
  },
  async fetchTokenBalance({ commit, getters, rootGetters }, chain) {
    const modal = getters['modal'];
    const wallet = rootGetters['keplr/wallet'];
    const address = bech32Manager.encode(
      bech32Manager.decode(wallet),
      chain.hrp
    );
    const channel = chain.withdraw.counterparty;
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
    const chain = CHAIN.INFO();
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
