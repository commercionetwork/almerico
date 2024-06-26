import {
  assertIsDeliverTxSuccess,
  SigningStargateClient,
} from '@cosmjs/stargate';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { CHAIN, CONFIG } from '@/constants';
import { bech32Manager } from '@/utils';

let controller;

export default {
  async connect({ commit, dispatch }, { translator, context }) {
    if (controller) {
      controller.abort();
    }
    commit('reset');
    const $t = translator.bind(context);
    if (!window.keplr) {
      commit('setHasKeplr', false);
      commit('setError', $t('msgs.installKeplrExtension'));
      return;
    }
    const chainInfo = CHAIN.INFO();
    if (!chainInfo) {
      commit('setError', $t('msgs.failedToDetectTheChain'));
      return;
    }
    commit('setLoading', true);
    await dispatch('suggestChain', { chainInfo, $t });
    await dispatch('getAccounts', { chainInfo, $t });
    dispatch('subscribeKeyStoreChange', { chainInfo, $t });
    commit('setLoading', false);
  },
  async suggestChain({ commit }, { chainInfo, $t }) {
    try {
      await window.keplr.experimentalSuggestChain(chainInfo);
    } catch (error) {
      commit('setError', $t('msgs.failedToSuggestTheChain'));
    }
  },
  async getAccounts({ commit }, { chainInfo, $t }) {
    try {
      await window.keplr.enable(chainInfo.chainId);
      const offlineSigner = window.keplr.getOfflineSigner(chainInfo.chainId);
      const accounts = await offlineSigner.getAccounts();
      commit('setAccounts', accounts);
      commit('setInitialized', true);
    } catch (error) {
      commit('setError', $t('msgs.noAccountFound'));
    }
  },
  async refreshAccounts({ commit, dispatch }, { chainInfo, $t }) {
    commit('setAccounts', []);
    commit('setInitialized', false);
    commit('setLoading', true);
    await dispatch('getAccounts', { chainInfo, $t });
    commit('setLoading', false);
  },
  subscribeKeyStoreChange({ dispatch }, { chainInfo, $t }) {
    controller = new AbortController();
    window.addEventListener(
      'keplr_keystorechange',
      async () => await dispatch('refreshAccounts', { chainInfo, $t }),
      { signal: controller.signal }
    );
  },
  async getOfflineSigner({ commit }, chainId) {
    try {
      return await window.keplr.getOfflineSignerAuto(chainId);
    } catch (error) {
      commit('setError', error);
    }
  },
  async signAndBroadcastTransaction({ commit, dispatch }, { chain, msgs }) {
    try {
      const offlineSigner = await dispatch('getOfflineSigner', chain.chainId);
      const client = await SigningStargateClient.connectWithSigner(
        chain.rpc,
        offlineSigner
      );
      const hrp = chain.bech32Config.bech32PrefixAccAddr;
      const result = await dispatch('deliverTx', { client, hrp, msgs });
      return result;
    } catch (error) {
      commit('setError', error);
    }
  },
  async signAndBroadcastCosmWasmTx({ commit, dispatch }, { chain, msgs }) {
    try {
      const offlineSigner = await dispatch('getOfflineSigner', chain.chainId);
      const client = await SigningCosmWasmClient.connectWithSigner(
        chain.rpc,
        offlineSigner
      );
      const hrp = chain.bech32Config.bech32PrefixAccAddr;
      const result = await dispatch('deliverTx', { client, hrp, msgs });
      return result;
    } catch (error) {
      commit('setError', error);
    }
  },
  async deliverTx({ commit, getters }, { client, hrp, msgs }) {
    try {
      const wallet = getters['wallet'];
      const account = bech32Manager.encode(bech32Manager.decode(wallet), hrp);
      const fee = _calcFee(msgs.length);
      const result = await client.signAndBroadcast(account, msgs, fee);
      assertIsDeliverTxSuccess(result);
      return result;
    } catch (error) {
      commit('setError', error);
    }
  },
  disconnect({ commit }) {
    commit('reset');
  },
  resetError({ commit }) {
    commit('setError', undefined);
  },
};

const _calcFee = (msgsLength) => ({
  amount: [
    {
      denom: CONFIG.STABLE_COIN.DENOM,
      amount: (CONFIG.FEE_AMOUNT * msgsLength).toString(),
    },
  ],
  gas: (CONFIG.GAS_AMOUNT * msgsLength).toString(),
});
