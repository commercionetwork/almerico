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
  isAddingBlocks: false,
  isLoading: false,
  newHeight: 0,
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
