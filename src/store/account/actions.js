import { bank, commercio, distribution, staking, tx } from '@/apis/http';
import { ACCOUNT, APIS, CONFIG } from '@/constants';
import { bech32Manager } from '@/utils';

export default {
  async initAccountDashboard({ commit, dispatch }, address) {
    commit('reset');
    commit('setLoading', true);
    const requests = [
      dispatch('fetchBalances', address),
      dispatch('fetchCommission', address),
      dispatch('fetchDelegations', address),
      dispatch('fetchMembership', address),
      dispatch('fetchMembershipTxs', address),
      dispatch('fetchRewards', address),
      dispatch('fetchUnbondings', address),
    ];
    await Promise.all(requests);
    commit('setLoading', false);
    await dispatch('fetchTransactions', { address });
  },
  async fetchBalances({ commit }, address) {
    try {
      const response = await bank.requestBalances(address);
      commit('setBalances', response.data.balances);
    } catch (error) {
      commit('setError', error);
    }
  },
  async fetchCommission({ commit }, address) {
    try {
      const hex = bech32Manager.decode(address);
      const validator = bech32Manager.encode(
        hex,
        CONFIG.PREFIXES.VALIDATOR.OPERATOR.ADDRESS
      );
      const response = await distribution.requestCommission(validator);
      commit('setCommission', response.data.commission);
    } catch (error) {
      commit('setError', error);
    }
  },
  async fetchDelegations({ dispatch, getters }, address) {
    await dispatch('addDelegations', { address });
    while (getters['delegationsNextKey']) {
      await dispatch('addDelegations', {
        address,
        key: getters['delegationsNextKey'],
      });
    }
  },
  async addDelegations({ commit }, { address, key }) {
    const pagination = {
      key: key ? key : undefined,
    };
    try {
      const response = await staking.requestDelegations(address, pagination);
      commit('addDelegations', response.data.delegation_responses);
      commit('setDelegationsPagination', response.data.pagination);
    } catch (error) {
      commit('setError', error);
    }
  },
  async fetchRewards({ commit }, address) {
    try {
      const response = await distribution.requestRewards(address);
      commit('setRewards', response.data);
    } catch (error) {
      commit('setError', error);
    }
  },
  async fetchUnbondings({ dispatch, getters }, address) {
    await dispatch('addUnbondings', { address });
    while (getters['unbondingsNextKey']) {
      await dispatch('addUnbondings', {
        address,
        key: getters['unbondingsNextKey'],
      });
    }
  },
  async addUnbondings({ commit }, { address, key }) {
    const pagination = {
      key: key ? key : undefined,
    };
    try {
      const response = await staking.requestUnbondings(address, pagination);
      commit('addUnbondings', response.data.unbonding_responses);
      commit('setUnbondingsPagination', response.data.pagination);
    } catch (error) {
      commit('setError', error);
    }
  },
  async fetchMembership({ commit }, address) {
    try {
      const response = await commercio.requestMembership(address);
      commit('setMembership', response.data.membership);
    } catch (error) {
      commit('setMembership', null);
    }
  },
  async fetchMembershipTxs({ commit }, address) {
    const parameters = { events: `assign_membership.owner='${address}'` };
    try {
      const response = await tx.requestTxsList(parameters);
      commit('setMembershipTxs', response.data.tx_responses);
    } catch (error) {
      commit('setError', error);
    }
  },
  async fetchTransactions(
    { commit },
    { address, offset = 0, sent = true } = {}
  ) {
    const parameters = {
      events: sent
        ? `transfer.sender='${address}'`
        : `transfer.recipient='${address}'`,
      order_by: APIS.SORTING_ORDERS.ORDER_BY_DESC,
    };
    const pagination = {
      limit: ACCOUNT.TRANSACTIONS_NUMBER,
      offset,
    };
    commit('setAddingTxs', true);
    try {
      const response = await tx.requestTxsList(parameters, pagination);
      commit('addTransactions', response.data.tx_responses);
      commit('setTransactionsPagination', response.data.pagination);
      commit('sumTransactionsOffset', response.data.tx_responses.length);
    } catch (error) {
      commit('setTransactions', []);
    }
    commit('setAddingTxs', false);
  },
  async addTransactions({ dispatch }, { address, offset, sent = true } = {}) {
    await dispatch('fetchTransactions', { address, offset, sent });
  },
  resetTransactions({ commit }) {
    commit('setTransactions', []);
    commit('setTransactionsPagination', []);
    commit('setTransactionsOffset', 0);
  },
};
