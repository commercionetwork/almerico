const CHAIN_LIST = Object.freeze([
  {
    id: 1,
    text: 'Osmosis',
    chainId: 'osmosis-1',
    chainName: 'osmosis',
    rpc: 'https://rpc.osmosis.zone/',
    rest: '"https://lcd.osmosis.zone/',
  },
  {
    id: 2,
    text: 'Osmosis - Testnet',
    chainId: 'osmo-test-5',
    chainName: 'Osmosis (osmo-test-5)',
    rpc: 'https://rpc.osmotest5.osmosis.zone',
    rest: 'https://lcd.osmotest5.osmosis.zone',
  },
  {
    id: 3,
    text: 'Rebus',
    chainId: 'reb_1111-1',
    chainName: 'rebus',
    rpc: 'https://api.rebuschain.com:26657/',
    rest: 'https://api.rebuschain.com:1317/',
  },
  {
    id: 4,
    text: 'Rebus - Testnet',
    chainId: 'reb_3333-1',
    chainName: 'rebustestnet',
    rpc: 'https://testnet.rebus.money/cosmosrpc/',
    rest: 'https://testnet.rebus.money/cosmosrest/',
  },
]);

const CONFIG_LIST = Object.freeze([
  {
    id: 1,
    chainIds: ['osmosis-1', 'osmo-test-5'],
    bech32Config: {
      bech32PrefixAccAddr: 'osmo',
      bech32PrefixAccPub: 'osmopub',
      bech32PrefixValAddr: 'osmovaloper',
      bech32PrefixValPub: 'osmovaloperpub',
      bech32PrefixConsAddr: 'osmovalcons',
      bech32PrefixConsPub: 'osmovalconspub',
    },
    coinDenom: 'OSMO',
    coinMinimalDenom: 'uosmo',
    coinDecimals: 6,
    gasPriceStep: {
      low: 0.0025,
      average: 0.025,
      high: 0.04,
    },
  },
  {
    id: 2,
    chainIds: ['reb_1111-1', 'reb_3333-1'],
    bech32Config: {
      bech32PrefixAccAddr: 'rebus',
      bech32PrefixAccPub: 'rebuspub',
      bech32PrefixValAddr: 'rebusvaloper',
      bech32PrefixValPub: 'rebusvaloperpub',
      bech32PrefixConsAddr: 'rebusvalcons',
      bech32PrefixConsPub: 'rebusvalconspub',
    },
    coinDenom: 'REBUS',
    coinMinimalDenom: 'arebus',
    coinDecimals: 18,
    gasPriceStep: {
      low: 10000000000,
      average: 25000000000,
      high: 40000000000,
    },
  },
]);

const INFO = (chainId) => {
  const chain = CHAIN_LIST.find((item) => item.chainId === chainId);
  const config = CONFIG_LIST.find((item) => item.chainIds.includes(chainId));
  if (!chain || !config) {
    return null;
  }
  return Object.freeze({
    chainId,
    chainName: chain.chainName,
    rpc: chain.rpc,
    rest: chain.rest,
    bip44: {
      coinType: 118,
    },
    bech32Config: config.bech32Config,
    currencies: [
      {
        coinDenom: config.coinDenom,
        coinMinimalDenom: config.coinMinimalDenom,
        coinDecimals: config.coinDecimals,
      },
    ],
    feeCurrencies: [
      {
        coinDenom: config.coinDenom,
        coinMinimalDenom: config.coinMinimalDenom,
        coinDecimals: config.coinDecimals,
        gasPriceStep: config.gasPriceStep,
      },
    ],
    stakeCurrency: {
      coinDenom: config.coinDenom,
      coinMinimalDenom: config.coinMinimalDenom,
      coinDecimals: config.coinDecimals,
    },
  });
};

const TYPE = Object.freeze({
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',
});

export default Object.freeze({
  CHAIN_LIST,
  CONFIG_LIST,
  INFO,
  TYPE,
});
