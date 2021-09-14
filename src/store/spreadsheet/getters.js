export default {
  abrTokens: (state) => state.abrTokens,
  accountsTokens: (state) => state.accountsTokens,
  allTokens: (state) => state.allTokens,
  error: (state) => state.error,
  freezedTokens: (state) => state.freezedTokens.value.coins,
  isLoading: (state) => state.isLoading,
  vbrTokens: (state) => state.vbrTokens,
};
