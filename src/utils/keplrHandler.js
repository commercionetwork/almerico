import { CONFIG } from '@/constants';

const keplrHandler = {
  async suggest() {
    if (!window.getOfflineSigner || !window.keplr) {
      alert('Please install keplr extension');
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
                coinType: 118,
              },
              bech32Config: {
                bech32PrefixAccAddr: CONFIG.PREFIXES.ACCOUNT.ADDRESS,
                bech32PrefixAccPub: CONFIG.PREFIXES.ACCOUNT.KEY,
                bech32PrefixValAddr: CONFIG.PREFIXES.OPERATOR.ADDRESS,
                bech32PrefixValPub: CONFIG.PREFIXES.OPERATOR.KEY,
                bech32PrefixConsAddr: CONFIG.PREFIXES.CONSENSUS.ADDRESS,
                bech32PrefixConsPub: CONFIG.PREFIXES.CONSENSUS.KEY,
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
              coinType: 118,
              gasPriceStep: {
                low: 0.05,
                average: 0.1,
                high: 0.2,
              },
            });
          }
        } catch {
          alert('Failed to suggest the chain');
        }
      } else {
        alert('Please use the recent version of keplr extension');
      }
    }
  },
};

export default keplrHandler;
