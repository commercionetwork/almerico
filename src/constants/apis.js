const LCD =
  process.env.VUE_APP_LCD !== undefined ? process.env.VUE_APP_LCD : '';

const API_VERSION =
  process.env.VUE_APP_API_VERSION !== undefined
    ? process.env.VUE_APP_API_VERSION
    : '';

const API_PATHS = {
  BASE: 'base',
  COMMERCIO: 'commercionetwork',
  COSMOS: 'cosmos',
  TENDERMINT: 'tendermint',
  TX: 'tx',
};

const WS = process.env.VUE_APP_WS !== undefined ? process.env.VUE_APP_WS : '';

export const APIS = {
  HTTP: {
    LCD: LCD,
    API_VERSION: API_VERSION,
    // Query
    AUTH: `${LCD}/${API_PATHS.COSMOS}/auth/${API_VERSION}`,
    BANK: `${LCD}/${API_PATHS.COSMOS}/bank/${API_VERSION}`,
    DISTRIBUTION: `${LCD}/${API_PATHS.COSMOS}/distribution/${API_VERSION}`,
    STAKING: `${LCD}/${API_PATHS.COSMOS}/staking/${API_VERSION}`,
    // Service
    BLOCKS: `${LCD}/${API_PATHS.COSMOS}/${API_PATHS.BASE}/${API_PATHS.TENDERMINT}/${API_VERSION}/blocks`,
    NODE_INFO: `${LCD}/${API_PATHS.COSMOS}/${API_PATHS.BASE}/${API_PATHS.TENDERMINT}/${API_VERSION}/node_info`,
    VALIDATORSETS: `${LCD}/${API_PATHS.COSMOS}/${API_PATHS.BASE}/${API_PATHS.TENDERMINT}/${API_VERSION}/validatorsets`,
    TXS: `${LCD}/${API_PATHS.COSMOS}/${API_PATHS.TX}/${API_VERSION}`,
    // Commercio
    KYC: `${LCD}/${API_PATHS.COMMERCIO}/commerciokyc`,
    MINT: `${LCD}/${API_PATHS.COMMERCIO}/commerciomint`,
    SUPPLY: `${LCD}/${API_PATHS.COMMERCIO}/supply`,
    VBR: `${LCD}/${API_PATHS.COMMERCIO}/vbr`,
    // RPC
    BLOCKS_RPC: `${LCD}/blocks`,
    VALIDATORSETS_RPC: `${LCD}/validatorsets`,
    // Legacy
    AUTH_LEGACY: `${LCD}/auth`,
    BANK_LEGACY: `${LCD}/bank`,
    DISTRIBUTION_LEGACY: `${LCD}/distribution`,
    STAKING_LEGACY: `${LCD}/staking`,
    TXS_LEGACY: `${LCD}/txs`,
  },
  SORTING_ORDERS: {
    ORDER_BY_ASC: 'ORDER_BY_ASC',
    ORDER_BY_DESC: 'ORDER_BY_DESC',
    ORDER_BY_UNSPECIFIED: 'ORDER_BY_UNSPECIFIED',
  },
  WS: {
    EVENTS: {
      NEW_BLOCK: 'NewBlock',
      TX: 'Tx',
      VALIDATOR_SET_UPDATES: 'ValidatorSetUpdates',
    },
    URL: WS,
  },
};
