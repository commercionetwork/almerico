import { bank, cosmwasm } from '@/apis/http';
import { CONTRACT } from '@/constants';
import { stringEncoder } from '@/utils';

export default {
  async initDex({ commit, dispatch, rootGetters }, address) {
    commit('reset');
    commit('setLoading', true);
    const requests = [dispatch('fetchContract', address)];
    if (rootGetters['keplr/wallet']) {
      commit('setHasWallet', true);
      requests.push(dispatch('fetchBalances'));
    }
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetchBalances({ commit, rootGetters }) {
    const wallet = rootGetters['keplr/wallet'];
    try {
      const response = await bank.requestBalances(wallet);
      commit('setBalances', response.data.balances);
    } catch (error) {
      commit('setError', error);
    }
  },
  async fetchContract({ commit, dispatch }, address) {
    commit('setContractProp', { path: 'address', value: address });
    const requests = [
      dispatch('getFee', address),
      dispatch('getInfo', address),
    ];
    await Promise.all(requests);
  },
  async getFee({ commit }, address) {
    const query = `{"${CONTRACT.KEY.QUERY.FEE}":{}}`;
    const queryData = stringEncoder.encodeToBase64(query);
    try {
      const response = await cosmwasm.requestContractSmartQuery({
        address,
        queryData,
      });
      commit('setContractProp', {
        path: CONTRACT.KEY.QUERY.FEE,
        value: response.data.data,
      });
    } catch (error) {
      commit('setError', error);
    }
  },
  async getInfo({ commit }, address) {
    const query = `{"${CONTRACT.KEY.QUERY.INFO}":{}}`;
    const queryData = stringEncoder.encodeToBase64(query);
    try {
      const response = await cosmwasm.requestContractSmartQuery({
        address,
        queryData,
      });
      commit('setContractProp', {
        path: CONTRACT.KEY.QUERY.INFO,
        value: response.data.data,
      });
    } catch (error) {
      commit('setError', error);
    }
  },
  async executeContract(
    { commit, dispatch, rootGetters },
    { msgs, translator, context } = {}
  ) {
    if (!rootGetters['keplr/wallet']) {
      await dispatch('keplr/connect', { translator, context }, { root: true });
    }
    commit('setHandling', true);
    const res = await dispatch('keplr/signAndBroadcastCosmWasmTx', msgs, {
      root: true,
    });
    commit('setHandling', false);
    return res;
  },
};
