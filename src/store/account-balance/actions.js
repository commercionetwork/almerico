import { wasms } from '@/apis/http';
import { CONFIG } from '@/constants';

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
};
