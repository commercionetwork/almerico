import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initState = () => ({
  error: null,
  info: null,
  isLoading: false,
  latestBlock: null,
  latestTransactions: [],
  latestValidatorSets: [],
  stakingParams: null,
  validators: [],
  validatorsOffset: 0,
  validatorsPagination: null,
});

export default {
  namespaced: true,
  state: initState(),
  getters,
  mutations,
  actions,
};
