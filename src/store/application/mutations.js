export default {
  setInfo(state, payload) {
    state.info = payload;
  },
  setLoading(state, payload) {
    state.isLoading = payload;
  },
  setLatestBlock(state, payload) {
    state.latestBlock = payload;
  },
  setLatestTransactions(state, payload) {
    state.latestTransactions = payload;
  },
  addLatestTransactions(state, payload) {
    state.latestTransactions.push(...payload);
  },
  setLatestValidatorSets(state, payload) {
    state.latestValidatorSets = payload;
  },
  setStakingParams(state, payload) {
    state.stakingParams = payload;
  },
  setValidators(state, payload) {
    state.validators = payload;
  },
  addValidators(state, payload) {
    state.validators.push(...payload);
  },
  setValidatorsPagination(state, payload) {
    state.validatorsPagination = payload;
  },
};
