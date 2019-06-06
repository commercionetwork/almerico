/**
 * URLs
 */
const API_LCD_BASE = (process.env.VUE_APP_LCD !== undefined) ?
  process.env.VUE_APP_LCD :
  "";
const API_RPC_BASE = (process.env.VUE_APP_RPC !== undefined) ?
  process.env.VUE_APP_RPC :
  "";
/**
 * APIs
 */
export const API = {
  //lcd
  AUTH:`${API_LCD_BASE}/auth/accounts`,
  BANK: `${API_LCD_BASE}/bank/balances`,
  BLOCKS: `${API_LCD_BASE}/blocks`,
  BLOCKS_LATEST: `${API_LCD_BASE}/blocks/latest`,
  DISTRIBUTION_DELEGATORS: `${API_LCD_BASE}/distribution/delegators`,
  DISTRIBUTION_PARAMETERS: `${API_LCD_BASE}/distribution/parameters`,
  DISTRIBUTION_POOL: `${API_LCD_BASE}/distribution/community_pool`,
  DISTRIBUTION_VALIDATORS: `${API_LCD_BASE}/distribution/validators`,
  GOV_PARAMETERS: `${API_LCD_BASE}/gov/parameters`,
  GOV_PROPOSALS: `${API_LCD_BASE}/gov/proposals`,
  MINTING_INFLATION:`${API_LCD_BASE}/minting/inflation`,
  MINTING_PARAMETERS:`${API_LCD_BASE}/minting/parameters`,
  MINTING_PROVISIONS:`${API_LCD_BASE}/minting/annual-provisions`,
  NODE_INFO: `${API_LCD_BASE}/node_info`,
  NODE_VERSION:`${API_LCD_BASE}/node_version`,
  SLASHING_PARAMETERS: `${API_LCD_BASE}/slashing/parameters`,
  SLASHING_SIGNING: `${API_LCD_BASE}/slashing/signing_infos`,
  STAKING_DELEGATORS: `${API_LCD_BASE}/staking/delegators`,
  STAKING_PARAMETERS: `${API_LCD_BASE}/staking/parameters`,
  STAKING_POLL: `${API_LCD_BASE}/staking/poll`,
  STAKING_REDELEGATIONS: `${API_LCD_BASE}/staking/redelegations`,
  STAKING_VALIDATORS: `${API_LCD_BASE}/staking/validators`,
  SYNCING: `${API_LCD_BASE}/syncing`,
  TXS: `${API_LCD_BASE}/txs`,
  VALIDATORSETS: `${API_LCD_BASE}/validators`,
  VALIDATORSETS_LATEST: `${API_LCD_BASE}/validators/latest`,
  VERSION:`${API_LCD_BASE}/version`,
  // rpc
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
};
