export default {
  details: (state) => state.details,
  filter: (state) => state.filter,
  heightValidatorsSets: (state) => state.heightValidatorsSets,
  isLoading: (state) => state.isLoading,
  latestValidatorsSets: (state) => state.latestValidatorsSets,
  pagination: (state) => state.pagination,
  validators: (state) => state.validators,
  nextKey: (state) =>
    state.pagination && state.pagination.next_key
      ? state.pagination.next_key
      : null,
};
