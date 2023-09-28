export default {
  error: (state) => state.error,
  isLoading: (state) => state.isLoading,
  isHandling: (state) => state.isHandling,
  list: (state) => state.list,
  detail: (state) => state.detail,
  contract: (state) => (state.detail ? state.detail.id : ''),
  newCW20: (state) => state.newCW20,
};
