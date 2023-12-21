import { CONFIG } from '@/constants';

const DEFAULT_INDEX = 1;

const LIST = Object.freeze([
  {
    id: 1,
    text: 'Main-net',
    value: 'https://mainnet.commercio.network',
    chainId: 'commercio-3',
    chainName: 'Commercio.network',
    rpc: 'https://rpc-mainnet.commercio.network',
    lcd: 'https://lcd-mainnet.commercio.network',
  },
  {
    id: 2,
    text: 'Main-net',
    value: 'https://mainnet.commercio.network',
    chainId: 'commercio-3',
    chainName: 'Commercio.network',
    rpc: 'https://rpc-b-mainnet.commercio.network',
    lcd: 'https://lcd-b-mainnet.commercio.network',
  },
  {
    id: 3,
    text: 'Test-net',
    value: 'https://testnet.commercio.network',
    chainId: 'commercio-testnet11k',
    chainName: 'Testnet.network',
    rpc: 'https://rpc-testnet.commercio.network',
    lcd: 'https://lcd-testnet.commercio.network',
  },
  {
    id: 4,
    text: 'Test-net',
    value: 'https://testnet.commercio.network',
    chainId: 'commercio-testnet11k',
    chainName: 'Testnet.network',
    rpc: 'https://rpc-b-testnet.commercio.network',
    lcd: 'https://lcd-b-testnet.commercio.network',
  },
  {
    id: 5,
    text: 'Dev-net',
    value: 'https://devnet.commercio.network',
    chainId: 'commercio-devnet09',
    chainName: 'Devnet.network',
    rpc: 'https://rpc-devnet.commercio.network',
    lcd: 'https://lcd-devnet.commercio.network',
  },
  {
    id: 6,
    text: 'Dev-net',
    value: 'https://devnet.commercio.network',
    chainId: 'commercio-devnet09',
    chainName: 'Devnet.network',
    rpc: 'https://rpc-b-devnet.commercio.network',
    lcd: 'https://lcd-b-devnet.commercio.network',
  },
]);

if (process.env.VUE_APP_LCD === 'http://localhost:7123') {
  LIST.push({
    id: 4,
    text: 'Local-net',
    value: 'https://localhost:9099',
    chainId: 'chain-hN6HnD',
    chainName: 'Localnet.network',
    rpc: 'http://localhost:7124',
    lcd: 'http://localhost:7123',
  });
}

const INFO = () => {
  const index = LIST.findIndex((item) => item.lcd === process.env.VUE_APP_LCD);
  if (index < 0) {
    return null;
  }
  return Object.freeze({
    rpc: LIST[index].rpc,
    rest: LIST[index].lcd,
    chainId: LIST[index].chainId,
    chainName: LIST[index].chainName,
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
};

export default Object.freeze({
  DEFAULT_INDEX,
  INFO,
  LIST,
});
