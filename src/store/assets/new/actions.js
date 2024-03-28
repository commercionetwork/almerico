import { commercio } from '@/apis/http';
import { CHAIN, CONFIG } from '@/constants';
import { msgBuilder } from '@/utils';

export default {
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
    await dispatch('fetchGovernmentAddress');
    commit('setLoading', false);
  },
  async fetchGovernmentAddress({ commit }) {
    try {
      const response = await commercio.requestGovernmentAddress();
      commit('setGovernment', response.data.governmentAddress);
    } catch (error) {
      commit('setError', error);
    }
  },
  updateContractProp({ commit }, payload) {
    commit('addPropToNewCW20', payload);
  },
  updateIsInvalid({ commit }, isInvalid) {
    commit('setIsInvalid', isInvalid);
  },
  async createNewAsset(
    { commit, dispatch },
    { contract, translator, context }
  ) {
    const codeId = CONFIG.WASM_CW20_CODE_ID;
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
  async instantiateContract(
    { dispatch, getters, rootGetters },
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
    const chain = CHAIN.INFO();
    const account = rootGetters['keplr/wallet'];
    const government = getters['government'];
    const label = `Init ${contract.name} contract`;
    const funds = [];
    const msg = msgBuilder.buildMsgInstantiateContract({
      sender: account,
      admin: government,
      codeId,
      funds,
      label,
      msg: JSON.stringify(contract),
    });
    await dispatch(
      'keplr/signAndBroadcastCosmWasmTx',
      { chain, msgs: [msg] },
      {
        root: true,
      }
    );
  },
};
