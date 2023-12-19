import { bank, cosmwasm, wasms } from '@/apis/http';
import { CONFIG } from '@/constants';
import { stringEncoder } from '@/utils';

export default {
  async initDex({ commit, dispatch, rootGetters }) {
    commit('reset');
    commit('setLoading', true);
    if (!rootGetters['keplr/wallet']) {
      commit('setHasWallet', false);
      commit('setLoading', false);
      return;
    }
    const address = rootGetters['keplr/wallet'];
    const requests = [
      dispatch('fetcBankBalances', address),
      dispatch('fetchContracts'),
      dispatch('fetchWasmBalances', address),
    ];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetcBankBalances({ commit }, address) {
    try {
      const response = await bank.requestBalances(address);
      commit('setBankTokens', response.data.balances);
    } catch (error) {
      commit('setError', error);
    }
  },
  async fetchContracts({ dispatch }) {
    const addresses = await dispatch('getContracts');
    for (const address of addresses) {
      await dispatch('getInfo', address);
    }
  },
  async fetchWasmBalances({ commit }, address) {
    try {
      const response = await wasms.requestAccountBalances({
        accountAddress: address,
        cw20Code: CONFIG.WASM_CW20_CODE_ID,
        swapCode: CONFIG.WASM_SWAP_CODE_ID,
      });
      commit('setWasmsTokens', response.data.balances);
    } catch (error) {
      commit('setError', error);
    }
  },
  async getContracts({ commit }) {
    const contracts = [];
    let nextKey = null;
    do {
      try {
        const response = await cosmwasm.requestContracts({
          codeId: CONFIG.WASM_SWAP_CODE_ID,
          nextKey,
        });
        nextKey = response.data.pagination.next_key;
        contracts.push(...response.data.contracts);
      } catch (error) {
        commit('setError', error);
      }
    } while (nextKey);
    return contracts;
  },
  async getInfo({ commit, dispatch }, address) {
    const queryData = stringEncoder.encodeToBase64('{"info":{}}');
    try {
      const response = await dispatch('getContractDetail', {
        address,
        queryData,
      });
      const data = response.data.data;
      commit('addContract', { address, data });
    } catch (error) {
      commit('setError', error);
    }
  },
  async getContractDetail({ commit }, { address, queryData }) {
    try {
      return await cosmwasm.requestContractSmartQuery({
        address,
        queryData,
      });
    } catch (error) {
      commit('setError', error);
    }
  },
};
