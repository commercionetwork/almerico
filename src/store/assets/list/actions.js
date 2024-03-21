import { bank, cosmwasm, wasms } from '@/apis/http';
import { CONFIG, CONTRACT } from '@/constants';
import { stringEncoder } from '@/utils';

export default {
  async initAssetsList({ commit, dispatch }, wallet) {
    commit('reset');
    commit('setLoading', true);
    const requests = [
      dispatch('fetchSupply'),
      dispatch('fetchAssets', CONFIG.WASM_CW20_CODE_ID),
    ];
    if (wallet) {
      requests.push(dispatch('fetchBalances', wallet));
      requests.push(dispatch('fetchWasmBalances', wallet));
    }
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetchSupply({ commit }) {
    try {
      const response = await bank.requestSupply();
      commit('setSupply', response.data.supply);
    } catch (error) {
      commit('setError', error);
    }
  },
  async fetchAssets({ commit, dispatch }, codeId) {
    const contracts = await dispatch('getContracts', codeId);
    contracts.forEach(async (address) => {
      const requests = [dispatch('getTokenInfo', address)];
      const responses = await Promise.all(requests);
      const contract = Object.assign(
        {},
        { id: address },
        { ...responses[0]['token'] }
      );
      commit('addContract', contract);
    });
  },
  async getContracts({ commit }, codeId) {
    const contracts = [];
    let nextKey = null;
    do {
      try {
        const response = await cosmwasm.requestContracts({ codeId, nextKey });
        nextKey = response.data.pagination.next_key;
        contracts.push(...response.data.contracts);
      } catch (error) {
        commit('setError', error);
      }
    } while (nextKey);
    return contracts;
  },
  async getTokenInfo({ dispatch }, address) {
    const queryData = stringEncoder.encodeToBase64('{"token_info":{}}');
    const data = await dispatch('getContractDetail', { address, queryData });
    return { token: data };
  },
  async getContractDetail({ commit }, { address, queryData }) {
    try {
      const response = await cosmwasm.requestContractSmartQuery({
        address,
        queryData,
      });
      return response.data.data;
    } catch (error) {
      commit('setError', error);
    }
  },
  async fetchBalances({ commit }, wallet) {
    try {
      const response = await bank.requestBalances(wallet);
      commit('addBalancesProp', {
        path: CONTRACT.TOKEN.TYPE.NATIVE,
        value: response.data.balances,
      });
    } catch (error) {
      commit('setError', error);
    }
  },
  async fetchWasmBalances({ commit }, wallet) {
    try {
      const response = await wasms.requestAccountBalances({
        accountAddress: wallet,
        cw20Code: CONFIG.WASM_CW20_CODE_ID,
        swapCode: CONFIG.WASM_SWAP_CODE_ID,
      });
      commit('addBalancesProp', {
        path: CONTRACT.TOKEN.TYPE.CW20,
        value: response.data.balances,
      });
    } catch (error) {
      commit('setError', error);
    }
  },
};
