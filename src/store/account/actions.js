import { bank, commercio, distribution, staking, tx } from '@/apis/http';
import { APIS } from '@/constants';

export default {
  async initAccount({ commit, dispatch }, address) {
    commit('setLoading', true);
    commit('setTransactions', []);
    const requests = [
      dispatch('fetchBalances', address),
      dispatch('fetchDelegations', address),
      dispatch('fetchMembership', address),
      dispatch('fetchMembershipTxs', address),
      dispatch('fetchRewards', address),
      dispatch('fetchTransactions', { address }),
      dispatch('fetchUnbondings', address),
    ];
    await Promise.all(requests);
    commit('setLoading', false);
  },

  async fetchBalances({ commit, dispatch }, address) {
    try {
      const response = await bank.requestBalancesLegacy(address);
      commit('setBalances', response.data.result);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },

  async fetchDelegations({ commit, dispatch }, address) {
    try {
      const response = await staking.requestDelegationsLegacy(address);
      commit('setDelegations', response.data.result);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },

  async fetchRewards({ commit, dispatch }, address) {
    try {
      const response = await distribution.requestRewards(address);
      commit('setRewards', response.data);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },

  async fetchUnbondings({ commit, dispatch, getters }, address) {
    commit('setUnbondings', []);
    await dispatch('getUnbondings', { address });
    while (getters['unbondingsNextKey']) {
      await dispatch('getUnbondings', {
        address,
        pagination: { key: getters['unbondingsNextKey'] },
      });
    }
  },

  async getUnbondings({ commit, dispatch }, { address, pagination }) {
    try {
      const response = await staking.requestUnbondings(address, pagination);
      commit('addUnbondings', response.data.unbonding_responses);
      commit('setUnbondingsPagination', response.data.pagination);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },

  async fetchMembership({ commit }, address) {
    try {
      const response = await commercio.requestMembership(address);
      commit('setMembership', response.data.result);
    } catch (error) {
      commit('setMembership', null);
    }
  },

  async fetchMembershipTxs({ commit, dispatch }, address) {
    const parameters = { events: `message.subscriber='${address}'` };
    try {
      const response = await tx.requestTxsList(parameters);
      commit('setMembershipTxs', response.data.tx_responses);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },

  async fetchTransactions({ commit, dispatch }, { address, pagination }) {
    const parameters = {
      events: `message.sender='${address}'`,
      order_by: APIS.SORTING_ORDERS.ORDER_BY_DESC,
    };
    try {
      const response = await tx.requestTxsList(parameters, pagination);
      commit('addTransactions', response.data.tx_responses);
      commit('setTransactionsPagination', response.data.pagination);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },

  async addTransactions({ commit, dispatch }, { address, pagination }) {
    commit('setAddingTxs', true);
    await dispatch('fetchTransactions', { address, pagination });
    commit('setAddingTxs', false);
  },
};
