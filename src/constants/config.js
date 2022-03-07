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

const MINTER_ACCOUNT =
  process.env.VUE_APP_MINTER_ACCOUNT !== undefined
    ? process.env.VUE_APP_MINTER_ACCOUNT
    : '';

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

const SPREADSHEET_ACCOUNTS =
  process.env.VUE_APP_SPREADSHEET_ACCOUNTS !== undefined
    ? process.env.VUE_APP_SPREADSHEET_ACCOUNTS
    : '[]';

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
  COPYRIGHT,
  FIRST_CONVERSION_RATE,
  FIRST_HEIGHT,
  LEGACY_VERSIONS,
  MINTER_ACCOUNT,
  PREFIXES,
  SCROLL,
  SPREADSHEET_ACCOUNTS,
  STABLE_COIN,
  TOKEN,
};
