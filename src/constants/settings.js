const FIRST_HEIGHT =
  process.env.VUE_APP_FIRST_HEIGHT !== undefined
    ? process.env.VUE_APP_FIRST_HEIGHT
    : 1;

const FIRST_CONVERSION_RATE =
  process.env.VUE_APP_FIRST_CONVERSION_RATE !== undefined
    ? process.env.VUE_APP_FIRST_CONVERSION_RATE
    : 1;

const MINTER_ACCOUNT =
  process.env.VUE_APP_MINTER_ACCOUNT !== undefined
    ? process.env.VUE_APP_MINTER_ACCOUNT
    : '';

const SPREADSHEET_ACCOUNTS =
  process.env.VUE_APP_SPREADSHEET_ACCOUNTS !== undefined
    ? process.env.VUE_APP_SPREADSHEET_ACCOUNTS
    : '[]';

const LEGACY_VERSIONS = {
  V_038: '0.38',
};

export const SETTINGS = {
  FIRST_CONVERSION_RATE,
  FIRST_HEIGHT,
  LEGACY_VERSIONS,
  MINTER_ACCOUNT,
  SPREADSHEET_ACCOUNTS,
};
