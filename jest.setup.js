process.env.VUE_APP_ANCESTORS =
  '[{"lcd_ledger":"http://178.62.202.95:7123", "lcd": "https://lcd-testnet.commercio.network/9001", "ver": "0.38"}]';

global.IntersectionObserver = class IntersectionObserver {
  constructor() {}

  disconnect() {
    return null;
  }

  observe() {
    return null;
  }

  takeRecords() {
    return null;
  }

  unobserve() {
    return null;
  }
};
