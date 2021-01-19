/**
 * TRANSACTIONS GETTERS
 */

export default {
  currentPage: (state) => state.currentPage,
  details: (state) => state.details,
  error: (state) => state.error,
  filter: (state) => state.filter,
  hasNext: (state) => state.hasNext,
  isLoading: (state) => state.isLoading,
  transactions: (state) => state.transactions,
  version: (state) => state.version,
};
