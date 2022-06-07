import { VALIDATORS } from '@/constants';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initState = () => ({
  error: null,
  isLoading: false,
  isUpdating: false,
  detail: null,
  list: [],
  newBlock: false,
  newUpdate: false,
  delegations: [],
  delegationsOffset: 0,
  delegationsPagination: null,
  filter: {
    status: VALIDATORS.FILTER.ACTIVE,
    query: '',
  },
});

export default {
  namespaced: true,
  state: initState(),
  getters,
  mutations,
  actions,
};
