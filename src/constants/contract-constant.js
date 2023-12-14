const FEE_KEY = Object.freeze({
  LP_FEE_PERCENT: 'lp_fee_percent',
  PROTOCOL_FEE_PERCENT: 'protocol_fee_percent',
});

const STATE_KEY = Object.freeze({
  BALANCE: 'balance',
  CONTRACT_INFO: 'contract_info',
  LP_TOKEN: 'lp_token',
  TOKEN_1: 'token1',
  TOKEN_2: 'token2',
  TOKEN_INFO: 'token_info',
});

const TOKEN_TYPE = Object.freeze({
  CW20: 'cw20',
  NATIVE: 'native',
});

export default Object({
  FEE_KEY,
  STATE_KEY,
  TOKEN_TYPE,
});
