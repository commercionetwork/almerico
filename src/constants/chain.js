/**
 * Available chains
 */
export const CHAIN = {
  ANCESTORS:
    process.env.VUE_APP_ANCESTORS !== undefined
      ? process.env.VUE_APP_ANCESTORS
      : [],
  DEFAULT: {
    id: 1,
    text: 'Test-net',
    value: 'https://testnet-new.commercio.network',
    lcd: 'https://lcd-testnet.commercio.network',
  },
  LIST: [
    {
      id: 1,
      text: 'Main-net',
      value: 'https://mainnet-new.commercio.network',
      lcd: 'https://lcd-mainnet.commercio.network',
    },
    {
      id: 2,
      text: 'Test-net',
      value: 'https://testnet-new.commercio.network',
      lcd: 'https://lcd-testnet.commercio.network',
    },
    {
      id: 3,
      text: 'Dev-net',
      value: 'https://devnet-new.commercio.network',
      lcd: 'https://lcd-demo.commercio.network',
    },
  ],
};
