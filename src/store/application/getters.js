export default {
  error: (state) => state.error,
  info: (state) => state.info,
  isLoading: (state) => state.isLoading,
  latestBlock: (state) => state.latestBlock,
  latestTransactions: (state) => state.latestTransactions,
  latestValidatorSets: (state) => state.latestValidatorSets,
  stakingParams: (state) => state.stakingParams,
  validators: (state) => state.validators,
  validatorsOffset: (state) => state.validatorsOffset,
  validatorsTotal: (state) => state.validatorsPagination.total,
};
