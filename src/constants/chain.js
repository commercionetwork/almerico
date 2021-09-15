export const CHAIN = {
  MINTER_ACCOUNT:
    process.env.VUE_APP_MINTER_ACCOUNT !== undefined
      ? process.env.VUE_APP_MINTER_ACCOUNT
      : '',
  ANCESTORS:
    process.env.VUE_APP_ANCESTORS !== undefined
      ? process.env.VUE_APP_ANCESTORS
      : '',
  DEFAULT: {
    id: 1,
    text: 'Test-net',
    value: 'https://testnet.commercio.network',
    lcd: 'https://lcd-testnet.commercio.network',
  },
  LIST: [
    {
      id: 1,
      text: 'Main-net',
      value: 'https://mainnet.commercio.network',
      lcd: 'https://lcd-mainnet.commercio.network',
    },
    {
      id: 2,
      text: 'Test-net',
      value: 'https://testnet.commercio.network',
      lcd: 'https://lcd-testnet.commercio.network',
    },
    {
      id: 3,
      text: 'Dev-net',
      value: 'https://devnet.commercio.network',
      lcd: 'https://lcd-demo.commercio.network',
    },
  ],
  OVERVIEW_ACCOUNTS:
    process.env.VUE_APP_OVERVIEW_ACCOUNTS !== undefined
      ? process.env.VUE_APP_OVERVIEW_ACCOUNTS
      : '',
  SPREADSHEET_ACCOUNTS:
    process.env.VUE_APP_SPREADSHEET_ACCOUNTS !== undefined
      ? process.env.VUE_APP_SPREADSHEET_ACCOUNTS
      : '',
};
