import { governance, proposals, staking } from '@/apis/http';
import { PROPOSALS } from '@/constants';

export default {
  async initProposalsList({ commit, dispatch }, status) {
    commit('reset');
    commit('setLoading', true);
    const requests = [dispatch('fetchProposals', status)];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetchProposals({ commit }, status = PROPOSALS.STATUS.UNSPECIFIED) {
    try {
      const response = await proposals.requestList(status);
      commit('setList', response.data);
    } catch (error) {
      commit('setError', error);
    }
  },
  filterProposals({ commit }, filter) {
    commit('setFilter', filter);
  },

  async initProposalsDetail({ commit, dispatch }, id) {
    commit('reset');
    commit('setLoading', true);
    const requests = [
      dispatch('fetchPool'),
      dispatch('fetchProposalDetail', id),
      dispatch('fetchProposalTally', id),
      dispatch('fetchProposalVotes', id),
    ];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetchPool({ commit }) {
    try {
      const response = await staking.requestPool();
      commit('setPool', response.data.pool);
    } catch (error) {
      commit('setError', error);
    }
  },
  async fetchProposalDetail({ commit }, id) {
    try {
      const response = await proposals.requestDetail(id);
      commit('setDetail', { proposal: response.data });
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
