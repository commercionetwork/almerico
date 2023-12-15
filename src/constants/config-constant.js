const BROWSER_STORAGE_KEYS = Object.freeze({
  LOCALE: 'almerico-locale',
  THEME: 'almerico-dark-theme',
  VALIDATORS: 'almerico-my-validators',
});

const COPYRIGHT = 'Commercio.network SpA';

const FIRST_CONVERSION_RATE =
  process.env.VUE_APP_FIRST_CONVERSION_RATE !== undefined
    ? process.env.VUE_APP_FIRST_CONVERSION_RATE
    : '1';

const FIRST_HEIGHT =
  process.env.VUE_APP_FIRST_HEIGHT !== undefined
    ? process.env.VUE_APP_FIRST_HEIGHT
    : '1';

const LEGACY_VERSIONS = Object.freeze({
  V_038: '0.38',
});

const PREFIXES = Object.freeze({
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
});

const SCROLL = Object.freeze({
  BEHAVIOR: 'smooth',
  OFFSET_X: 0,
  OFFSET_Y: 70,
});

const STABLE_COIN = Object.freeze({
  NAME: 'commercio cash credits',
  SYMBOL: 'CCC',
  DENOM: 'uccc',
  EXPONENT: 6,
  VALUE: {
    AMOUNT: '1.00',
    SYMBOL: '€',
  },
});

const TOKEN = Object.freeze({
  NAME: 'commercio',
  SYMBOL: 'COM',
  DENOM: 'ucommercio',
  EXPONENT: 6,
  STAKEABLE: true,
});

const COIN_TYPE = 118;

const GAS_PRICE_STEP = Object.freeze({
  AVERAGE: 0.125,
  HIGH: 0.125,
  LOW: 0.125,
});

const FEE_AMOUNT = 10000;

const GAS_AMOUNT = 1000000;

// ms
const REST_LEAD_TIME = 5 * 1000;

const WASM_CW20_CODE_ID =
  process.env.VUE_APP_WASM_CW20_CODE_ID !== undefined
    ? process.env.VUE_APP_WASM_CW20_CODE_ID
    : '';

const WASM_SWAP_CODE_ID =
  process.env.VUE_APP_WASM_SWAP_CODE_ID !== undefined
    ? process.env.VUE_APP_WASM_SWAP_CODE_ID
    : '';

export default Object.freeze({
  BROWSER_STORAGE_KEYS,
  COIN_TYPE,
  COPYRIGHT,
  FEE_AMOUNT,
  FIRST_CONVERSION_RATE,
  FIRST_HEIGHT,
  GAS_AMOUNT,
  GAS_PRICE_STEP,
  LEGACY_VERSIONS,
  PREFIXES,
  REST_LEAD_TIME,
  SCROLL,
  STABLE_COIN,
  TOKEN,
  WASM_CW20_CODE_ID,
  WASM_SWAP_CODE_ID,
});
