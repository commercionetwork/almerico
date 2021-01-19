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
const API_RPC_BASE =
  process.env.VUE_APP_RPC !== undefined ? process.env.VUE_APP_RPC : '';

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
  MEMBERSHIP: `${API_LCD_BASE}/membership`,
  MINTING: `${API_LCD_BASE}/minting`,
  NODE_INFO: `${API_LCD_BASE}/node_info`,
  NODE_VERSION: `${API_LCD_BASE}/node_version`,
  SLASHING: `${API_LCD_BASE}/slashing`,
  STAKING: `${API_LCD_BASE}/staking`,
  SYNCING: `${API_LCD_BASE}/syncing`,
  TXS: `${API_LCD_BASE}/txs`,
  VALIDATORSETS: `${API_LCD_BASE}/validatorsets`,
  VERSION: `${API_LCD_BASE}/version`,
  // RPC
  RPC: API_RPC_BASE,
  ABCI_INFO: `${API_RPC_BASE}/abci_info`,
  ABCI_QUERY: `${API_RPC_BASE}/abci_query`,
  BLOCK: `${API_RPC_BASE}/block`,
  BLOCK_RESULTS: `${API_RPC_BASE}/block_results`,
  BLOCKCHAIN: `${API_RPC_BASE}/blockchain`,
  BROADCAST_TX_ASYNC: `${API_RPC_BASE}/broadcast_tx_async`,
  BROADCAST_TX_COMMIT: `${API_RPC_BASE}/broadcast_tx_commit`,
  BROADCAST_TX_SYNC: `${API_RPC_BASE}/broadcast_tx_sync`,
  COMMIT: `${API_RPC_BASE}/commit`,
  CONSENSUS_PARAMS: `${API_RPC_BASE}/consensus_params`,
  CONSENSUS_STATE: `${API_RPC_BASE}/consensus_state`,
  DUMP_CONSENSUS_STATE: `${API_RPC_BASE}/dump_consensus_state`,
  GENESIS: `${API_RPC_BASE}/genesis`,
  HEALTH: `${API_RPC_BASE}/health`,
  NET_INFO: `${API_RPC_BASE}/net_info`,
  NUM_UNCONFIRMED_TXS: `${API_RPC_BASE}/num_unconfirmed_txs`,
  STATUS: `${API_RPC_BASE}/status`,
  SUBSCRIBE: `${API_RPC_BASE}/subscribe`,
  TX: `${API_RPC_BASE}/tx`,
  TX_SEARCH: `${API_RPC_BASE}/tx_search`,
  UNCONFIRMED_TXS: `${API_RPC_BASE}/unconfirmed_txs`,
  UNSUBSCRIBE: `${API_RPC_BASE}/unsubscribe`,
  UNSUBSCRIBE_ALL: `${API_RPC_BASE}/unsubscribe_all`,
  VALIDATORS: `${API_RPC_BASE}/validators`,
  // Keybase
  USER_LOOKUP: `${API_KEYBASE}/user/lookup.json`,
};
