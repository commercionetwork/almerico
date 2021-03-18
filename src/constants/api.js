/**
 * Versions
 */
const KEYBASE_VERSION = '/1.0';

/**
 * URLs
 */
const API_KEYBASE = `https://keybase.io/_/api${KEYBASE_VERSION}`;
const API_LCD_BASE =
  process.env.VUE_APP_LCD !== undefined ? process.env.VUE_APP_LCD : '';

/**
 * APIs
 */
export const API = {
  // LCD
  LCD: API_LCD_BASE,
  AUTH: `${API_LCD_BASE}/auth/accounts`,
  BANK: `${API_LCD_BASE}/bank/balances`,
  BLOCKS: `${API_LCD_BASE}/blocks`,
  DISTRIBUTION: `${API_LCD_BASE}/distribution`,
  GOV: `${API_LCD_BASE}/gov`,
  KYC: `${API_LCD_BASE}/commerciokyc`,
  MINTING: `${API_LCD_BASE}/minting`,
  NODE_INFO: `${API_LCD_BASE}/node_info`,
  SLASHING: `${API_LCD_BASE}/slashing`,
  STAKING: `${API_LCD_BASE}/staking`,
  SYNCING: `${API_LCD_BASE}/syncing`,
  TXS: `${API_LCD_BASE}/txs`,
  VALIDATORSETS: `${API_LCD_BASE}/validatorsets`,
  // Keybase
  USER_LOOKUP: `${API_KEYBASE}/user/lookup.json`,
};
