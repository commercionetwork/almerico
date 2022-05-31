import { staking, validators } from '@/apis/http';

export default {
  async initValidatorsList({ commit, dispatch }) {
    commit('reset');
    commit('setLoading', true);
    const requests = [dispatch('fetchList')];
    await Promise.all(requests);
    commit('setLoading', false);
  },

  async fetchList({ commit }) {
    try {
      const response = await validators.requestList();
      console.log('FETCH_LIST', response.data);
      commit('setList', response.data);
    } catch (error) {
      commit('setError', error);
    }
  },

  async initValidatorsDetail({ commit, dispatch }, address) {
    commit('reset');
    commit('setLoading', true);
    const requests = [
      dispatch('fetchDetail', address),
      dispatch('fetchDetailDelegations', address),
    ];
    await Promise.all(requests);
    commit('setLoading', false);
  },

  async updateValidatorsDetail({ commit, dispatch }, address) {
    commit('setLoading', true);
    await dispatch('fetchDetail', address);
    commit('setNewUpdate', false);
    commit('setLoading', false);
  },

  async fetchDetail({ commit }, address) {
    try {
      const response = await validators.requestDetail(address);
      console.log('FETCH_DETAIL', response.data);
      commit('setDetail', response.data);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchDetailDelegations({ dispatch, getters }, id) {
    await dispatch('addDetailDelegations', { id });
    while (getters['delegationsTotal'] > getters['delegationsOffset']) {
      await dispatch('addDetailDelegations', {
        id,
        offset: getters['delegationsOffset'],
      });
    }
  },

  async addDetailDelegations({ commit }, { id, offset }) {
    const pagination = {
      offset: offset ? offset : 0,
    };
    try {
      const response = await staking.requestValidatorsDetailDelegations(
        id,
        pagination
      );
      commit('addDelegations', response.data.delegation_responses);
      commit('setDelegationsPagination', response.data.pagination);
      commit('sumDelegationsOffset', response.data.delegation_responses.length);
    } catch (error) {
      commit('setError', error);
    }
  },

  setValidatorsFilter({ commit }, filter) {
    commit('setFilter', filter);
  },
};
