import { CONFIG } from './index';

const ADDRESS = Object.freeze({
  DEX: process.env.VUE_APP_CONTRACT_DEX,
});

const KEY = Object.freeze({
  FEE: {
    LP_FEE_PERCENT: 'protocol_fee_percent',
    PROTOCOL_FEE_PERCENT: 'protocol_fee_percent',
  },
  QUERY: {
    FEE: 'fee',
    INFO: 'info',
  },
  STATE: {
    BALANCE: 'balance',
    CONTRACT_INFO: 'contract_info',
    LP_TOKEN: 'lp_token',
    TOKEN_1: 'token1',
    TOKEN_2: 'token2',
    TOKEN_INFO: 'token_info',
  },
});

const TOKEN = Object.freeze({
  DENOM: {
    TOKEN_1: 'token1',
    TOKEN_2: 'token2',
  },
  KEY: {
    TOKEN_1: 'Token1',
    TOKEN_2: 'Token2',
  },
  LABEL: {
    [CONFIG.TOKEN.DENOM]: '$COM',
    [CONFIG.STABLE_COIN.DENOM]: '$CCC',
  },
  TYPE: {
    CW20: 'cw20',
    NATIVE: 'native',
  },
});

export default Object({
  ADDRESS,
  KEY,
  TOKEN,
});
