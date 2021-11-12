export default {
  info: (state) => state.info,
  isLoading: (state) => state.isLoading,
  latestBlock: (state) => state.latestBlock,
  latestTransactions: (state) => state.latestTransactions,
  latestValidatorSets: (state) => state.latestValidatorSets,
  stakingParams: (state) => state.stakingParams,
  validators: (state) => state.validators,
  validatorsNextKey: (state) => state.validatorsPagination.next_key,
  validatorsPagination: (state) => state.validatorsPagination,
};
