const API_PATHS = Object.freeze({
  BASE: 'base',
  COMMERCIO: 'commercionetwork',
  COSMOS: 'cosmos',
  COSMWASM: 'cosmwasm',
  IBC: 'ibc',
  TENDERMINT: 'tendermint',
  TX: 'tx',
});

const API_VERSION = process.env.VUE_APP_API_VERSION || '';
const API_VERSION_COSMWASM = process.env.VUE_APP_API_VERSION_COSMWASM || '';

const BACKEND = process.env.VUE_APP_BACKEND || '';
const BACKEND_WS = process.env.VUE_APP_BACKEND_WS || '';

const LCD = process.env.VUE_APP_LCD || '';

const WS = process.env.VUE_APP_WS || '';

export default Object.freeze({
  HTTP: {
    LCD: LCD,
    API_VERSION: API_VERSION,
    // Backend
    BACKEND_BLOCKS: `${BACKEND}/api/v2/blocks`,
    BACKEND_CHARTS: `${BACKEND}/api/v2/charts`,
    BACKEND_OVERVIEWS: `${BACKEND}/api/v2/overviews`,
    BACKEND_PROPOSALS: `${BACKEND}/api/v2/proposals`,
    BACKEND_TXS: `${BACKEND}/api/v2/txs`,
    BACKEND_VALIDATORS: `${BACKEND}/api/v2/validators`,
    BACKEND_WASMS: `${BACKEND}/api/v2/wasms`,
    BACKEND_HEALTHCHECK: `${BACKEND}/healthcheck`,
    // Query
    AUTH: `${LCD}/${API_PATHS.COSMOS}/auth/${API_VERSION}`,
    BANK: `${LCD}/${API_PATHS.COSMOS}/bank/${API_VERSION}`,
    DISTRIBUTION: `${LCD}/${API_PATHS.COSMOS}/distribution/${API_VERSION}`,
    GOVERNANCE: `${LCD}/${API_PATHS.COSMOS}/gov/${API_VERSION}`,
    SLASHING: `${LCD}/${API_PATHS.COSMOS}/slashing/${API_VERSION}`,
    STAKING: `${LCD}/${API_PATHS.COSMOS}/staking/${API_VERSION}`,
    // Service
    BLOCKS: `${LCD}/${API_PATHS.COSMOS}/${API_PATHS.BASE}/${API_PATHS.TENDERMINT}/${API_VERSION}/blocks`,
    NODE_INFO: `${LCD}/${API_PATHS.COSMOS}/${API_PATHS.BASE}/${API_PATHS.TENDERMINT}/${API_VERSION}/node_info`,
    VALIDATORSETS: `${LCD}/${API_PATHS.COSMOS}/${API_PATHS.BASE}/${API_PATHS.TENDERMINT}/${API_VERSION}/validatorsets`,
    TXS: `${LCD}/${API_PATHS.COSMOS}/${API_PATHS.TX}/${API_VERSION}`,
    // Cosmwasm
    WASM: `${LCD}/${API_PATHS.COSMWASM}/wasm/${API_VERSION_COSMWASM}`,
    // IBC
    IBC_CORE: `${LCD}/${API_PATHS.IBC}/core`,
    // Commercio
    GOVERNMENT: `${LCD}/${API_PATHS.COMMERCIO}/government`,
    KYC: `${LCD}/${API_PATHS.COMMERCIO}/commerciokyc`,
    MINT: `${LCD}/${API_PATHS.COMMERCIO}/commerciomint`,
    SUPPLY: `${LCD}/${API_PATHS.COMMERCIO}/supply`,
    VBR: `${LCD}/${API_PATHS.COMMERCIO}/vbr`,
    // RPC
    BLOCKS_RPC: `${LCD}/blocks`,
    VALIDATORSETS_RPC: `${LCD}/validatorsets`,
    // TODO:remove
    // Legacy
    GOVERNANCE_LEGACY: `${LCD}/gov`,
  },
  LIMIT: 25,
  SORTING_ORDERS: {
    ASC: 'asc',
    DESC: 'desc',
    ORDER_BY_ASC: 'ORDER_BY_ASC',
    ORDER_BY_DESC: 'ORDER_BY_DESC',
    ORDER_BY_UNSPECIFIED: 'ORDER_BY_UNSPECIFIED',
  },
  WS: {
    EVENTS: {
      BACKEND_ACCOUNT_STATISTICS_UPDATE: 'AccountStatisticsUpdate',
      BACKEND_EXCHANGE_RATE_OVERVIEW_UPDATE: 'ExchangeRateOverviewUpdate',
      BACKEND_NEW_HEIGHT: 'NewHeight',
      BACKEND_TOKENS_CHART_UPDATE: 'TokensChartUpdate',
      NEW_BLOCK: 'NewBlock',
      TX: 'Tx',
      TX_SET_PARAMS: 'setParams',
      VALIDATOR_SET_UPDATES: 'ValidatorSetUpdates',
    },
    URL: WS,
    URL_BACKEND: BACKEND_WS,
  },
});
