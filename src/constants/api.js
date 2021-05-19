const KEYBASE_VERSION = '/1.0';

const API_KEYBASE = `https://keybase.io/_/api${KEYBASE_VERSION}`;
const API_LCD_BASE =
  process.env.VUE_APP_LCD !== undefined ? process.env.VUE_APP_LCD : '';

export const API = {
  // LCD
  LCD: API_LCD_BASE,
  BANK: `${API_LCD_BASE}/bank/balances`,
  BLOCKS: `${API_LCD_BASE}/blocks`,
  DISTRIBUTION: `${API_LCD_BASE}/distribution`,
  KYC: `${API_LCD_BASE}/commerciokyc`,
  MINT: `${API_LCD_BASE}/commerciomint`,
  NODE_INFO: `${API_LCD_BASE}/node_info`,
  STAKING: `${API_LCD_BASE}/staking`,
  SUPPLY: `${API_LCD_BASE}/supply`,
  TXS: `${API_LCD_BASE}/txs`,
  VALIDATORSETS: `${API_LCD_BASE}/validatorsets`,
  VBR: `${API_LCD_BASE}/vbr`,
  // Keybase
  USER_LOOKUP: `${API_KEYBASE}/user/lookup.json`,
};
