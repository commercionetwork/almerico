import { CONFIG } from '@/constants';

const keplrHandler = {
  async suggest(translator, context) {
    const $t = translator.bind(context);
    if (!window.getOfflineSigner || !window.keplr) {
      alert($t('msgs.installKeplrExtension'));
    } else {
      if (window.keplr.experimentalSuggestChain) {
        try {
          const chain = CONFIG.CHAIN.LIST.find(
            (item) => item.lcd === process.env.VUE_APP_LCD
          );
          if (chain) {
            await window.keplr.experimentalSuggestChain({
              chainId: chain.chainId,
              chainName: chain.chainName,
              rpc: chain.rpc,
              rest: chain.lcd,
              bip44: {
                coinType: CONFIG.COIN_TYPE,
              },
              bech32Config: {
                bech32PrefixAccAddr: CONFIG.PREFIXES.ACCOUNT.ADDRESS,
                bech32PrefixAccPub: CONFIG.PREFIXES.ACCOUNT.KEY,
                bech32PrefixValAddr: CONFIG.PREFIXES.VALIDATOR.OPERATOR.ADDRESS,
                bech32PrefixValPub: CONFIG.PREFIXES.VALIDATOR.OPERATOR.KEY,
                bech32PrefixConsAddr:
                  CONFIG.PREFIXES.VALIDATOR.CONSENSUS.ADDRESS,
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
                },
              ],
              stakeCurrency: {
                coinDenom: CONFIG.TOKEN.SYMBOL,
                coinMinimalDenom: CONFIG.TOKEN.DENOM,
                coinDecimals: CONFIG.TOKEN.EXPONENT,
              },
              coinType: CONFIG.COIN_TYPE,
              gasPriceStep: {
                low: CONFIG.GAS_PRICE_STEP.LOW,
                average: CONFIG.GAS_PRICE_STEP.AVERAGE,
                high: CONFIG.GAS_PRICE_STEP.HIGH,
              },
            });
          }
        } catch (error) {
          console.log(error);
          alert($t('msgs.failedToSuggestTheChain'));
        }
      } else {
        alert($t('msgs.useRecentVersionOfKeplr'));
      }
    }
  },
};

export default keplrHandler;
