import { governance } from '@/apis/http';
import { PROPOSALS } from '@/constants';

export default {
  async initProposalsList({ commit, dispatch }) {
    commit('reset');
    commit('setLoading', true);
    const requests = [
      dispatch('fetchProposals'),
      { status: PROPOSALS.STATUS.UNSPECIFIED, offset: 0 },
    ];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetchProposals({ commit }, { status, offset }) {
    const params = {
      proposalStatus: status,
    };
    const pagination = {
      offset: offset,
    };
    try {
      const response = await governance.requestList(params, pagination);
      commit('addProposals', response.data.proposals);
      commit('setPagination', response.data.pagination);
      commit('sumOffset', response.data.proposals.length);
    } catch (error) {
      commit('setError', error);
    }
  },
  async addProposals({ commit, dispatch }, { status, offset }) {
    commit('setAdding', true);
    await dispatch('fetchProposals', { status, offset });
    commit('setAdding', false);
  },
  async searchTransactions({ commit, dispatch }, { status, offset }) {
    commit('setTransactions', []);
    commit('setOffset', 0);
    commit('setLoading', true);
    await dispatch('fetchProposals', { status, offset });
    commit('setLoading', false);
  },

  async initProposalsDetail({ commit, dispatch }, id) {
    commit('reset');
    commit('setLoading', true);
    const requests = [dispatch('fetchProposalsDetail', id)];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetchProposalsDetail({ commit }, id) {
    try {
      const response = governance.requestDetail(id);
      commit('setDetail', response.data);
    } catch (error) {
      commit('setError', error);
    }
  },
};
