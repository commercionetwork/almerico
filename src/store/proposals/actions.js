import { governance } from '@/apis/http';
import { PROPOSALS } from '@/constants';

export default {
  async initProposalsList({ commit, dispatch }) {
    commit('reset');
    commit('setLoading', true);
    const requests = [dispatch('fetchProposals', PROPOSALS.STATUS.UNSPECIFIED)];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetchProposals({ commit }, status) {
    try {
      const response = await governance.requestList(status);
      commit('setList', response.data.proposals);
    } catch (error) {
      commit('setError', error);
    }
  },
  async searchProposals({ commit, dispatch }, status) {
    commit('setList', []);
    commit('setLoading', true);
    await dispatch('fetchProposals', status);
    commit('setLoading', false);
  },

  async initProposalsDetail({ commit, dispatch }, id) {
    commit('reset');
    commit('setLoading', true);
    const requests = [
      dispatch('fetchProposalDetail', id),
      dispatch('fetchProposalTally', id),
      dispatch('fetchProposalVotes', id),
    ];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetchProposalDetail({ commit }, id) {
    try {
      const response = await governance.requestDetail(id);
      commit('setDetail', response.data);
    } catch (error) {
      commit('setError', error);
    }
  },
  async fetchProposalTally({ commit }, id) {
    try {
      const response = await governance.requestTally(id);
      commit('setDetail', { tally: response.data.tally });
    } catch (error) {
      commit('setError', error);
    }
  },
  async fetchProposalVotes({ commit }, id) {
    try {
      const response = await governance.requestVotes(id);
      commit('setDetail', { votes: response.data.votes });
    } catch (error) {
      commit('setError', error);
    }
  },
};
