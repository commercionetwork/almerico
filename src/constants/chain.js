/**
 * Available chains
 */
export const CHAIN = {
  ANCHESTORS:
    process.env.VUE_APP_ANCHESTORS !== undefined
      ? JSON.parse(process.env.VUE_APP_ANCHESTORS)
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
