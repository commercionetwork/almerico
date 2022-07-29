export default {
  error: (state) => state.error,
  isLoading: (state) => state.isLoading,
  list: (state) => state.list,
  filter: (state) => state.filter,
  detail: (state) => state.detail,
  pool: (state) => state.pool,
  proposal: (state) => (state.detail ? state.detail.proposal : null),
  tally: (state) => (state.detail ? state.detail.tally : null),
  votes: (state) => (state.detail ? state.detail.votes : []),
};
