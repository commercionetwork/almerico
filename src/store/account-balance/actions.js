import { wasms } from '@/apis/http';
import { CONFIG } from '@/constants';
import { msgBuilder } from '@/utils';

export default {
  async initAllBalancesDashboard({ commit, dispatch }, address) {
    commit('reset');
    commit('setLoading', true);
    const requests = [
      dispatch('fetchWasmBalances', address),
      dispatch('account/fetchBalances', address, { root: true }),
      dispatch('account/fetchMembership', address, { root: true }),
    ];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetchWasmBalances({ commit }, accountAddress) {
    try {
      const response = await wasms.requestAccountBalances({
        accountAddress,
        cw20Code: CONFIG.WASM_CW20_CODE_ID,
        swapCode: CONFIG.WASM_SWAP_CODE_ID,
      });
      commit('setBalances', response.data.balances);
    } catch (error) {
      commit('setError', error);
    }
  },
  saveCW20({ commit }, cw20) {
    commit('setCW20', cw20);
  },
  async executeContract(
    { dispatch, rootGetters },
    { contract, textMsg, translator, context }
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
    const sender = rootGetters['keplr/wallet'];
    const msg = msgBuilder.buildMsgExecuteContract({
      sender,
      contract,
      msg: textMsg,
    });
    await dispatch('keplr/signAndBroadcastCosmWasmTx', [msg], {
      root: true,
    });
  },
  async sendTokens(
    { commit, dispatch },
    { contract, textMsg, translator, context, accountAddress }
  ) {
    commit('setHandling', true);
    await dispatch('executeContract', {
      contract,
      textMsg,
      translator,
      context,
    });
    dispatch('saveCW20', null);
    await dispatch('fetchWasmBalances', accountAddress);
    commit('setHandling', false);
    return true;
  },
};
