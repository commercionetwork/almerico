import { cosmwasm } from '@/apis/http';
import { CONFIG, CONTRACT } from '@/constants';
import { stringEncoder } from '@/utils';

export default {
  async initDexDetail({ commit, dispatch, rootGetters }, address) {
    commit('reset');
    commit('setLoading', true);
    if (!rootGetters['keplr/wallet']) {
      commit('setHasWallet', false);
      commit('setLoading', false);
      return;
    }
    const requests = [dispatch('fetchContract', address)];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetchContract({ commit, dispatch }, address) {
    const query = '{"info":{}}';
    const queryData = stringEncoder.encodeToBase64(query);
    try {
      const response = await cosmwasm.requestContractSmartQuery({
        address,
        queryData,
      });
      const data = response.data.data;
      commit('setContractProp', { path: 'id', value: address });
    } catch (error) {
      commit('setError', error);
    }
  },
  async getContractInfo({ commit }, { contract, owner }) {
    try {
      const response = await cosmwasm.requestContractState(contract);
      const models = response.data.models;
      const info = {};
      const regex = new RegExp(`${CONTRACT.STATE_KEY.BALANCE}${owner}`, 'igm');
      for (const model of models) {
        const key = stringEncoder.decodeFromHex(model.key);
        if (key === CONTRACT.STATE_KEY.TOKEN_INFO) {
          info[key] = JSON.parse(stringEncoder.decodeFromBase64(model.value));
        }
        if (regex.test(key)) {
          info[CONTRACT.STATE_KEY.BALANCE] = stringEncoder.removeDoubleQuotes(
            stringEncoder.decodeFromBase64(model.value)
          );
        }
      }
      return info;
    } catch (error) {
      commit('setError', error);
    }
  },
};
