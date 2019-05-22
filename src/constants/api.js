/**
 * URLs
 */
export const API_LCD = (process.env.VUE_APP_LCD !== undefined) ?
  process.env.VUE_APP_LCD :
  "";
export const API_RPC_BASE = (process.env.VUE_APP_RPC !== undefined) ?
  process.env.VUE_APP_RPC :
  "";
/**
 * APIs
 */
export const API = {
  ABCI_INFO: "/abci_info",
  ABCI_QUERY: "/abci_query",
  BLOCK: "/block",
  BLOCK_RESULTS: "/block_results",
  BLOCKCHAIN: "/blockchain",
  BROADCAST_TX_ASYNC: "/broadcast_tx_async",
  BROADCAST_TX_COMMIT: "/broadcast_tx_commit",
  BROADCAST_TX_SYNC: "/broadcast_tx_sync",
  COMMIT: "/commit",
  CONSENSUS_PARAMS: "/consensus_params",
  CONSENSUS_STATE: "/consensus_state",
  DUMP_CONSENSUS_STATE: "/dump_consensus_state",
  GENESIS: "/genesis",
  HEALTH: "/health",
  NET_INFO: "/net_info",
  NUM_UNCONFIRMED_TXS: "/num_unconfirmed_txs",
  STATUS: "/status",
  SUBSCRIBE: "/subscribe",
  TX: "/tx",
  TX_SEARCH: "/tx_search",
  UNCONFIRMED_TXS: "/unconfirmed_txs",
  UNSUBSCRIBE: "/unsubscribe",
  UNSUBSCRIBE_ALL: "/unsubscribe_all",
  VALIDATORS: "/validators",
};
