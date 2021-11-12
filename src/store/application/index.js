import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initialState = {
  info: null,
  isLoading: false,
  latestBlock: null,
  latestTransactions: [],
  latestValidatorSets: [],
  stakingParams: null,
  validators: [],
  validatorsPagination: null,
};

export default {
  namespaced: true,
  initialState,
  state: {
    ...initialState,
  },
  getters,
  actions,
  mutations,
};
