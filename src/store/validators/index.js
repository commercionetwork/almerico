import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initialState = {
  blocks: [],
  delegations: [],
  detail: null,
  error: null,
  filter: null,
  isLoading: false,
  newHeight: '',
  pool: null,
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
