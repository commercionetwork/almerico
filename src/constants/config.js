const BROWSER_STORAGE_KEYS = {
  THEME: 'almerico-dark-theme',
  VALIDATORS: 'almerico-my-validators',
};

const CHAIN = {
  DEFAULT_INDEX: 1,
  LIST: [
    {
      id: 1,
      text: 'Main-net',
      value: 'https://mainnet.commercio.network',
      lcd: 'https://lcd-mainnet.commercio.network',
    },
    {
      id: 2,
      text: 'Test-net',
      value: 'https://testnet.commercio.network',
      lcd: 'https://lcd-testnet.commercio.network',
    },
    {
      id: 3,
      text: 'Dev-net',
      value: 'https://devnet.commercio.network',
      lcd: 'https://lcd-demo.commercio.network',
    },
  ],
};

const PREFIXES = {
  ACCOUNT: {
    ADDRESS: 'did:com:',
    KEY: 'did:com:pub',
  },
  VALIDATOR: {
    CONSENSUS: {
      ADDRESS: 'did:com:valcons',
      KEY: 'did:com:valconspub',
    },
    OPERATOR: {
      ADDRESS: 'did:com:valoper',
      KEY: 'did:com:valoperpub',
    },
  },
};

const STABLE_COIN = {
  NAME: 'commercio cash credits',
  SYMBOL: 'CCC',
  DENOM: 'uccc',
  VALUE: {
    AMOUNT: '1.00',
    SYMBOL: '€',
  },
};

const TOKEN = {
  NAME: 'commercio',
  SYMBOL: 'COM',
  DENOM: 'ucommercio',
  EXPONENT: 6,
  STAKEABLE: true,
};

export const CONFIG = {
  BROWSER_STORAGE_KEYS,
  CHAIN,
  PREFIXES,
  STABLE_COIN,
  TOKEN,
};
