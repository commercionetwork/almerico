import { governance } from '@/apis/http';

export default {
  async initProposalsList({ commit, dispatch }) {
    commit('reset');
    commit('setLoading', true);
    const requests = [];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async initProposalsDetail({ commit, dispatch }, id) {
    commit('reset');
    commit('setLoading', true);
    const requests = [];
    await Promise.all(requests);
    commit('setLoading', false);
  },
};
