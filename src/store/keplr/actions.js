import {
  assertIsDeliverTxSuccess,
  SigningStargateClient,
} from '@cosmjs/stargate';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { CONFIG } from '@/constants';

export default {
  async connect({ commit, dispatch }, { translator, context }) {
    commit('reset');
    const $t = translator.bind(context);
    if (!window.keplr) {
      commit('setHasKeplr', false);
      commit('setError', $t('msgs.installKeplrExtension'));
      return;
    }
    const chain = CONFIG.CHAIN.LIST.find(
      (item) => item.lcd === process.env.VUE_APP_LCD
    );
    if (!chain) {
      commit('setError', $t('msgs.failedToDetectTheChain'));
      return;
    }
    commit('setLoading', true);
    await dispatch('suggestChain', { chain, $t });
    await dispatch('getAccounts', { chain, $t });
    dispatch('subscribeKeyStoreChange', { chain, $t });
    commit('setLoading', false);
  },
  async suggestChain({ commit }, { chain, $t }) {
    try {
      await window.keplr.experimentalSuggestChain({
        rpc: chain.rpc,
        rest: chain.lcd,
        chainId: chain.chainId,
        chainName: chain.chainName,
        stakeCurrency: {
          coinDenom: CONFIG.TOKEN.SYMBOL,
          coinMinimalDenom: CONFIG.TOKEN.DENOM,
          coinDecimals: CONFIG.TOKEN.EXPONENT,
        },
        bip44: {
          coinType: CONFIG.COIN_TYPE,
        },
        bech32Config: {
          bech32PrefixAccAddr: CONFIG.PREFIXES.ACCOUNT.ADDRESS,
          bech32PrefixAccPub: CONFIG.PREFIXES.ACCOUNT.KEY,
          bech32PrefixValAddr: CONFIG.PREFIXES.VALIDATOR.OPERATOR.ADDRESS,
          bech32PrefixValPub: CONFIG.PREFIXES.VALIDATOR.OPERATOR.KEY,
          bech32PrefixConsAddr: CONFIG.PREFIXES.VALIDATOR.CONSENSUS.ADDRESS,
          bech32PrefixConsPub: CONFIG.PREFIXES.VALIDATOR.CONSENSUS.KEY,
        },
        currencies: [
          {
            coinDenom: CONFIG.TOKEN.SYMBOL,
            coinMinimalDenom: CONFIG.TOKEN.DENOM,
            coinDecimals: CONFIG.TOKEN.EXPONENT,
          },
          {
            coinDenom: CONFIG.STABLE_COIN.SYMBOL,
            coinMinimalDenom: CONFIG.STABLE_COIN.DENOM,
            coinDecimals: CONFIG.STABLE_COIN.EXPONENT,
          },
        ],
        feeCurrencies: [
          {
            coinDenom: CONFIG.STABLE_COIN.SYMBOL,
            coinMinimalDenom: CONFIG.STABLE_COIN.DENOM,
            coinDecimals: CONFIG.STABLE_COIN.EXPONENT,
            gasPriceStep: {
              low: CONFIG.GAS_PRICE_STEP.LOW,
              average: CONFIG.GAS_PRICE_STEP.AVERAGE,
              high: CONFIG.GAS_PRICE_STEP.HIGH,
            },
          },
          {
            coinDenom: CONFIG.TOKEN.SYMBOL,
            coinMinimalDenom: CONFIG.TOKEN.DENOM,
            coinDecimals: CONFIG.TOKEN.EXPONENT,
            gasPriceStep: {
              low: CONFIG.GAS_PRICE_STEP.LOW,
              average: CONFIG.GAS_PRICE_STEP.AVERAGE,
              high: CONFIG.GAS_PRICE_STEP.HIGH,
            },
          },
        ],
      });
    } catch (error) {
      commit('setError', $t('msgs.failedToSuggestTheChain'));
    }
  },
  async getAccounts({ commit }, { chain, $t }) {
    try {
      await window.keplr.enable(chain.chainId);
      const offlineSigner = window.keplr.getOfflineSigner(chain.chainId);
      const accounts = await offlineSigner.getAccounts();
      commit('setAccounts', accounts);
      commit('setInitialized', true);
    } catch (error) {
      commit('setError', $t('msgs.noAccountFound'));
    }
  },
  subscribeKeyStoreChange({ commit, dispatch }, { chain, $t }) {
    window.addEventListener('keplr_keystorechange', async () => {
      commit('setLoading', true);
      commit('setAccounts', []);
      commit('setInitialized', false);
      await dispatch('getAccounts', { chain, $t });
      commit('setLoading', false);
    });
  },
  async getOfflineSigner({ commit }, chainId) {
    try {
      return await window.keplr.getOfflineSignerAuto(chainId);
    } catch (error) {
      commit('setError', error);
    }
  },
  async signAndBroadcastTransaction({ commit, dispatch }, msgs) {
    try {
      const chain = _getChain();
      const offlineSigner = await dispatch('getOfflineSigner', chain.chainId);
      const client = await SigningStargateClient.connectWithSigner(
        chain.rpc,
        offlineSigner
      );
      await dispatch('deliverTx', { client, msgs });
    } catch (error) {
      commit('setError', error);
    }
  },
  async signAndBroadcastCosmWasmTx({ commit, dispatch }, msgs) {
    try {
      const chain = _getChain();
      const offlineSigner = await dispatch('getOfflineSigner', chain.chainId);
      const client = await SigningCosmWasmClient.connectWithSigner(
        chain.rpc,
        offlineSigner
      );
      await dispatch('deliverTx', { client, msgs });
    } catch (error) {
      commit('setError', error);
    }
  },
  async deliverTx({ commit, getters }, { client, msgs }) {
    try {
      const wallet = getters['wallet'];
      const fee = _calcFee(msgs.length);
      const result = await client.signAndBroadcast(wallet, msgs, fee);
      assertIsDeliverTxSuccess(result);
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

const _getChain = () =>
  CONFIG.CHAIN.LIST.find((item) => item.lcd === process.env.VUE_APP_LCD);

const _calcFee = (msgs) => ({
  amount: [
    {
      denom: CONFIG.STABLE_COIN.DENOM,
      amount: (CONFIG.FEE_AMOUNT * msgs).toString(),
    },
  ],
  gas: (CONFIG.GAS_AMOUNT * msgs).toString(),
});
