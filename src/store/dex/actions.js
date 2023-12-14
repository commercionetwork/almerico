import { cosmwasm } from '@/apis/http';
import { CONFIG, CONTRACT } from '@/constants';
import { stringEncoder } from '@/utils';

export default {
  async initDexList({ commit, dispatch }) {
    commit('reset');
    commit('setLoading', true);
    const requests = [dispatch('fetchContracts')];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetchContracts({ commit, dispatch }) {
    const addresses = await dispatch('getDexContracts');
    for (const address of addresses) {
      const models = await dispatch('getContractModels', address);
      const token1 = await dispatch('getToken', {
        key: CONTRACT.STATE_KEY.TOKEN_1,
        models,
      });
      const token2 = await dispatch('getToken', {
        key: CONTRACT.STATE_KEY.TOKEN_2,
        models,
      });
      const contract = { id: address, token1, token2 };
      commit('addContract', contract);
    }
  },
  async getDexContracts({ commit }) {
    const contracts = [];
    let nextKey = null;
    do {
      try {
        const response = await cosmwasm.requestContracts({
          codeId: CONFIG.WASM_SWAP_CODE_ID,
          nextKey,
        });
        contracts.push(...response.data.contracts);
        nextKey = response.data.pagination.next_key;
      } catch (error) {
        commit('setError', error);
      }
    } while (nextKey);
    return contracts;
  },
  async getContractModels({ commit }, address) {
    try {
      const response = await cosmwasm.requestContractState(address);
      return response.data.models;
    } catch (error) {
      commit('setError', error);
    }
  },
  async getToken({ commit, dispatch }, { key, models }) {
    const index = getIndexByKey(models, key);
    if (index < 0) {
      return '';
    }
    const token = JSON.parse(
      stringEncoder.decodeFromBase64(models[index].value)
    );
    if (token['denom'][CONTRACT.TOKEN_TYPE.NATIVE]) {
      return token['denom'][CONTRACT.TOKEN_TYPE.NATIVE];
    }
    try {
      const address = token['denom'][CONTRACT.TOKEN_TYPE.CW20];
      const cw20Models = await dispatch('getContractModels', address);
      const cw20Index = getIndexByKey(
        cw20Models,
        CONTRACT.STATE_KEY.TOKEN_INFO
      );
      if (cw20Index < 0) {
        return address;
      }
      const cw20 = JSON.parse(
        stringEncoder.decodeFromBase64(cw20Models[cw20Index].value)
      );
      return cw20.name;
    } catch (error) {
      commit('setError', error);
    }
  },
};

const getIndexByKey = (items, key) =>
  items.findIndex(
    (item) =>
      item.key.toUpperCase() === stringEncoder.encodeToHex(key).toUpperCase()
  );
