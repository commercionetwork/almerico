import { cosmwasm } from '@/apis/http';
import { CONFIG, CONTRACT } from '@/constants';
import { stringEncoder } from '@/utils';

export default {
  async initDexDetail({ commit, dispatch }, address) {
    commit('reset');
    commit('setLoading', true);
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
      console.log(response.data);
    } catch (error) {
      commit('setError', error);
    }
  },
};
