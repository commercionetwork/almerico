export default {
  error: (state) => state.error,
  isLoading: (state) => state.isLoading,
  eventHeight: (state) => state.eventHeight,
  info: (state) => state.info,
  latestBlock: (state) => state.latestBlock,
  latestTransactions: (state) => state.latestTransactions,
  latestValidatorSets: (state) => state.latestValidatorSets,
  stakingParams: (state) => state.stakingParams,
  validators: (state) => state.validators,
  validatorsOffset: (state) => state.validatorsOffset,
  validatorsTotal: (state) => state.validatorsPagination.total,
};
