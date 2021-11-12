import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initialState = {
  blockTxs: [],
  blockTxsPagination: null,
  blockValidatorSets: [],
  blocks: [],
  currentHeight: 1,
  detail: null,
  isLoading: false,
  isAddingBlocks: false,
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
