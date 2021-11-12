const FIRST_HEIGHT =
  process.env.VUE_APP_FIRST_HEIGHT !== undefined
    ? process.env.VUE_APP_FIRST_HEIGHT
    : 1;

const ANCESTORS =
  process.env.VUE_APP_ANCESTORS !== undefined
    ? process.env.VUE_APP_ANCESTORS
    : '';

const MINTER_ACCOUNT =
  process.env.VUE_APP_MINTER_ACCOUNT !== undefined
    ? process.env.VUE_APP_MINTER_ACCOUNT
    : '';

const OVERVIEW_ACCOUNTS =
  process.env.VUE_APP_OVERVIEW_ACCOUNTS !== undefined
    ? process.env.VUE_APP_OVERVIEW_ACCOUNTS
    : '';

const SPREADSHEET_ACCOUNTS =
  process.env.VUE_APP_SPREADSHEET_ACCOUNTS !== undefined
    ? process.env.VUE_APP_SPREADSHEET_ACCOUNTS
    : '';

const LEGACY_VERSIONS = {
  V_038: '0.38',
};

export const SETTINGS = {
  ANCESTORS,
  FIRST_HEIGHT,
  LEGACY_VERSIONS,
  MINTER_ACCOUNT,
  OVERVIEW_ACCOUNTS,
  SPREADSHEET_ACCOUNTS,
};
