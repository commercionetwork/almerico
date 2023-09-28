import { cosmwasm } from '@/apis/http';
import { CONFIG } from '@/constants';
import { msgBuilder, stringEncoder } from '@/utils';

export default {
  async initAssetsList({ commit, dispatch }) {
    commit('reset');
    commit('setLoading', true);
    const requests = [dispatch('fetchAssets', CONFIG.WASM_CW20_CODE_ID)];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetchAssets({ commit, dispatch }, codeId) {
    const contracts = await dispatch('getContracts', codeId);
    contracts.forEach(async (address) => {
      const info = await dispatch('getTokenInfo', address);
      const contract = Object.assign({}, { id: address }, { ...info.token });
      commit('addContract', contract);
    });
  },
  async initAssetsDetail({ commit, dispatch }, address) {
    commit('reset');
    commit('setLoading', true);
    const requests = [dispatch('fetchAssetDetail', address)];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetchAssetDetail({ commit, dispatch }, address) {
    const requests = [
      dispatch('getMarketingInfo', address),
      dispatch('getMinter', address),
      dispatch('getTokenInfo', address),
    ];
    const responses = await Promise.all(requests);
    const detail = {
      id: address,
      ...responses[0],
      ...responses[1],
      ...responses[2],
    };
    commit('setDetail', detail);
  },
  async initAssetsNew(
    { commit, dispatch, rootGetters },
    { translator, context }
  ) {
    commit('reset');
    commit('setLoading', true);
    if (!rootGetters['keplr/isInitialized']) {
      await dispatch(
        'keplr/connect',
        { translator, context },
        {
          root: true,
        }
      );
    }
    commit('setLoading', false);
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
  async getMarketingInfo({ dispatch }, address) {
    const queryData = stringEncoder.encodeToBase64('{"marketing_info":{}}');
    const data = await dispatch('getContractDetail', { address, queryData });
    return { marketing: data };
  },
  async getMinter({ dispatch }, address) {
    const queryData = stringEncoder.encodeToBase64('{"minter":{}}');
    const data = await dispatch('getContractDetail', { address, queryData });
    return { minter: data };
  },
  async getTokenInfo({ dispatch }, address) {
    const queryData = stringEncoder.encodeToBase64('{"token_info":{}}');
    const data = await dispatch('getContractDetail', { address, queryData });
    return { token: data };
  },
  updateContractProp({ commit }, payload) {
    commit('addPropToNewCW20', payload);
  },
  updateIsInvalid({ commit }, isInvalid) {
    commit('setIsInvalid', isInvalid);
  },
  async instantiateContract(
    { dispatch, rootGetters },
    { codeId, contract, translator, context }
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
    const account = rootGetters['keplr/wallet'];
    const label = `Init ${contract.name} contract`;
    const funds = [];
    const msg = msgBuilder.buildMsgInstantiateContract({
      account,
      codeId,
      funds,
      label,
      msg: JSON.stringify(contract),
    });
    await dispatch('keplr/signAndBroadcastCosmWasmTx', [msg], {
      root: true,
    });
  },
  async createNewAsset({ commit, dispatch, getters }, { translator, context }) {
    const codeId = CONFIG.WASM_CW20_CODE_ID;
    const contract = getters['newCW20'];
    commit('setHandling', true);
    await dispatch('instantiateContract', {
      codeId,
      contract,
      translator,
      context,
    });
    commit('setHandling', false);
    return true;
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
  async updateMarketing(
    { commit, dispatch },
    { contract, textMsg, translator, context }
  ) {
    commit('setHandling', true);
    await dispatch('executeContract', {
      contract,
      textMsg,
      translator,
      context,
    });
    await dispatch('fetchAssetDetail', contract);
    commit('setHandling', false);
    return true;
  },
};
