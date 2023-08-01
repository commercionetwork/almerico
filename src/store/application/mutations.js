import { initState } from './index';

export default {
  reset(state) {
    Object.assign(state, initState());
  },
  setError(state, error) {
    state.error = error;
  },
  setLoading(state, payload) {
    state.isLoading = payload;
  },
  setMaintenance(state, payload) {
    state.maintenance = payload;
  },
  setEventHeight(state, payload) {
    state.eventHeight = payload;
  },
  setInfo(state, payload) {
    state.info = payload;
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
  setValidatorsOffset(state, payload) {
    state.validatorsOffset = payload;
  },
  sumValidatorsOffset(state, payload) {
    state.validatorsOffset += payload;
  },
  setValidatorsPagination(state, payload) {
    state.validatorsPagination = payload;
  },
};
