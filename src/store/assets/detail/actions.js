import { cosmwasm } from '@/apis/http';
import { msgBuilder, stringEncoder } from '@/utils';

export default {
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
  async initAssetsTransfer({ commit, dispatch }, address) {
    commit('reset');
    commit('setLoading', true);
    const requests = [dispatch('fetchAssetToTransfer', address)];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetchAssetToTransfer({ commit, dispatch }, address) {
    const asset = await dispatch('getTokenInfo', address);
    const detail = {
      id: address,
      ...asset,
    };
    commit('setDetail', detail);
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
  async handleAsset(
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
  async transferAsset(
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
    commit('setHandling', false);
    return true;
  },
};
