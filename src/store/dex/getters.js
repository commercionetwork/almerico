import dexHelper from './dex-helper';

export default {
  error: (state) => state.error,
  isLoading: (state) => state.isLoading,
  isHandling: (state) => state.isHandling,
  hasWallet: (state) => state.hasWallet,
  bankTokens: (state) => state.bankTokens,
  contracts: (state) => state.contracts,
  wasmsTokens: (state) => state.wasmsTokens,
  tokens: (state) =>
    dexHelper.mergeBankWasmsTokens({
      bankTokens: state.bankTokens,
      wasmsTokens: state.wasmsTokens,
    }),
};
