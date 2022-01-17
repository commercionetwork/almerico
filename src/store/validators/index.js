import { VALIDATORS } from '@/constants';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initState = () => ({
  blocks: [],
  delegations: [],
  delegationsOffset: 0,
  delegationsPagination: null,
  detail: null,
  error: null,
  filter: {
    status: VALIDATORS.FILTER.ACTIVE,
    query: '',
  },
  isLoading: false,
  isLoadingBlocks: false,
  newHeight: '',
  pool: null,
});

export default {
  namespaced: true,
  state: initState(),
  getters,
  mutations,
  actions,
};
