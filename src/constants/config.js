const BROWSER_STORAGE_KEYS = {
  LOCALE: 'almerico-locale',
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
      chainId: 'commercio-3',
      chainName: 'Commercio.network',
      rpc: 'https://rpc-mainnet.commercio.network',
      lcd: 'https://lcd-mainnet.commercio.network',
    },
    {
      id: 2,
      text: 'Test-net',
      value: 'https://testnet.commercio.network',
      chainId: 'commercio-testnet11k',
      chainName: 'Testnet.network',
      rpc: 'https://rpc-testnet.commercio.network',
      lcd: 'https://lcd-testnet.commercio.network',
    },
    {
      id: 3,
      text: 'Dev-net',
      value: 'https://devnet.commercio.network',
      chainId: 'commercio-devnet09',
      chainName: 'Devnet.network',
      rpc: 'https://rpc-devnet.commercio.network',
      lcd: 'https://lcd-devnet.commercio.network',
    },
  ],
};

const COPYRIGHT = 'Commercio.network SpA';

const FIRST_CONVERSION_RATE =
  process.env.VUE_APP_FIRST_CONVERSION_RATE !== undefined
    ? process.env.VUE_APP_FIRST_CONVERSION_RATE
    : '1';

const FIRST_HEIGHT =
  process.env.VUE_APP_FIRST_HEIGHT !== undefined
    ? process.env.VUE_APP_FIRST_HEIGHT
    : '1';

const LEGACY_VERSIONS = {
  V_038: '0.38',
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

const SCROLL = {
  BEHAVIOR: 'smooth',
  OFFSET_X: 0,
  OFFSET_Y: 70,
};

const STABLE_COIN = {
  NAME: 'commercio cash credits',
  SYMBOL: 'CCC',
  DENOM: 'uccc',
  EXPONENT: 6,
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

const COIN_TYPE = 118;

const GAS_PRICE_STEP = {
  AVERAGE: 0.125,
  HIGH: 0.125,
  LOW: 0.125,
};

// ms
const REST_LEAD_TIME = 5 * 1000;

const WASM_CODE_ID =
  process.env.VUE_APP_WASM_CODE_ID !== undefined
    ? process.env.VUE_APP_WASM_CODE_ID
    : '';

export const CONFIG = {
  BROWSER_STORAGE_KEYS,
  CHAIN,
  COIN_TYPE,
  COPYRIGHT,
  FIRST_CONVERSION_RATE,
  FIRST_HEIGHT,
  GAS_PRICE_STEP,
  LEGACY_VERSIONS,
  PREFIXES,
  REST_LEAD_TIME,
  SCROLL,
  STABLE_COIN,
  TOKEN,
  WASM_CODE_ID,
};
