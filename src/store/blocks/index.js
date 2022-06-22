import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initState = () => ({
  error: null,
  isLoading: false,
  blockTxs: [],
  blockTxsOffset: 0,
  blockTxsPagination: null,
  blockValidatorSets: [],
  blocks: [],
  currentHeight: 1,
  detail: null,
  isAddingBlocks: false,
  isSearching: false,
  newHeight: 0,
  supposedTime: null,
});

export default {
  namespaced: true,
  state: initState(),
  getters,
  mutations,
  actions,
};
