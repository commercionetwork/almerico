export default {
  error: (state) => state.error,
  isLoading: (state) => state.isLoading,
  isHandling: (state) => state.isHandling,
  detail: (state) => state.detail,
  contract: (state) => (state.detail ? state.detail.id : ''),
};
