export default {
  error: (state) => state.error,
  isLoading: (state) => state.isLoading,
  isInitialized: (state) => state.isInitialized,
  hasKeplr: (state) => state.hasKeplr,
  accounts: (state) => state.accounts,
  wallet: (state) =>
    state.accounts.length > 0 ? state.accounts[0]['address'] : '',
};
