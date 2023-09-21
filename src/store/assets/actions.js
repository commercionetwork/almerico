import { cosmwasm } from '@/apis/http';
import { CONFIG } from '@/constants';
import { stringEncoder } from '@/utils';

export default {
  async initAssetsList({ commit, dispatch }) {
    commit('reset');
    commit('setLoading', true);
    const requests = [dispatch('fetchAssets', CONFIG.WASM_CW20_CODE_ID)];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetchAssets({ dispatch }, codeId) {
    const contracts = await dispatch('getContracts', codeId);
    contracts.forEach(async (contract) => {
      await dispatch('getContractInfo', contract);
    });
  },
  async getContracts({ commit }, codeId) {
    const contracts = [];
    let nextKey = null;
    do {
      try {
        const response = await cosmwasm.requestContracts(codeId, nextKey);
        nextKey = response.data.pagination.next_key;
        contracts.push(...response.data.contracts);
      } catch (error) {
        commit('setError', error);
      }
    } while (nextKey);
    return contracts;
  },
  async getContractInfo({ commit }, contractAddress) {
    const query = stringEncoder.encodeToBase64('{"token_info":{}}');
    try {
      const response = await cosmwasm.requestContractSmartQuery({
        address: contractAddress,
        queryData: query,
      });
      const contract = Object.assign(
        {},
        { id: contractAddress },
        { ...response.data.data }
      );
      commit('addContract', contract);
    } catch (error) {
      commit('setError', error);
    }
  },
};
