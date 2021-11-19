import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initialState = {
  blockTxs: [],
  blockTxsOffset: 0,
  blockTxsPagination: null,
  blockValidatorSets: [],
  blocks: [],
  currentHeight: 1,
  detail: null,
  error: null,
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
