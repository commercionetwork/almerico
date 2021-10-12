const KEYBASE_VERSION = '/1.0';
const API_KEYBASE = `https://keybase.io/_/api${KEYBASE_VERSION}`;

const API_LCD_BASE =
  process.env.VUE_APP_LCD !== undefined ? process.env.VUE_APP_LCD : '';
const API_PATHS = {
  BASE: 'base',
  COSMOS: 'cosmos',
  TENDERMINT: 'tendermint',
  TX: 'tx',
};
const API_VERSION =
  process.env.VUE_APP_API_VERSION !== undefined
    ? process.env.VUE_APP_API_VERSION
    : '';

export const API = {
  // LCD
  LCD: API_LCD_BASE,
  // Query
  AUTH: `${API_LCD_BASE}/${API_PATHS.COSMOS}/auth/${API_VERSION}`,
  BANK: `${API_LCD_BASE}/${API_PATHS.COSMOS}/bank/${API_VERSION}`,
  DISTRIBUTION: `${API_LCD_BASE}/${API_PATHS.COSMOS}/distribution/${API_VERSION}`,
  STAKING: `${API_LCD_BASE}/${API_PATHS.COSMOS}/staking/${API_VERSION}`,
  // Service
  BLOCKS: `${API_LCD_BASE}/${API_PATHS.COSMOS}/${API_PATHS.BASE}/${API_PATHS.TENDERMINT}/${API_VERSION}/blocks`,
  NODE_INFO: `${API_LCD_BASE}/${API_PATHS.COSMOS}/${API_PATHS.BASE}/${API_PATHS.TENDERMINT}/${API_VERSION}/node_info`,
  VALIDATORSETS: `${API_LCD_BASE}/${API_PATHS.COSMOS}/${API_PATHS.BASE}/${API_PATHS.TENDERMINT}/${API_VERSION}/validatorsets`,
  TXS: `${API_LCD_BASE}/${API_PATHS.COSMOS}/${API_PATHS.TX}/${API_VERSION}/txs`,

  // Commercio
  VBR: `${API_LCD_BASE}/vbr`,
  KYC: `${API_LCD_BASE}/commerciokyc`,
  MINT: `${API_LCD_BASE}/commerciomint`,
  // Keybase
  USER_LOOKUP: `${API_KEYBASE}/user/lookup.json`,
};
