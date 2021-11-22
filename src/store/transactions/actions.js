import { tx } from '@/apis/http';
import { APIS, SETTINGS, TRANSACTIONS } from '@/constants';

export default {
  async initTransactionsList({ commit, dispatch }) {
    commit('reset');
    commit('setLoading', true);
    const requests = [
      dispatch('fetchTransactions', { query: 'tx.height >= 1', offset: 0 }),
    ];
    await Promise.all(requests);
    commit('setLoading', false);
  },

  async searchTransactions({ commit, dispatch }, { query, offset }) {
    commit('setTransactions', []);
    commit('setLoading', true);
    await dispatch('fetchTransactions', { query, offset });
    commit('setLoading', false);
  },

  async fetchTransactions({ commit, dispatch }, { query, offset }) {
    const params = {
      events: query,
      order_by: APIS.SORTING_ORDERS.ORDER_BY_DESC,
    };
    const pagination = {
      limit: TRANSACTIONS.TABLE_ITEMS,
      offset: offset,
    };
    try {
      const response = await tx.requestTxsList(params, pagination);
      commit('addTransactions', response.data.tx_responses);
      commit('setPagination', response.data.pagination);
      commit('sumOffset', response.data.tx_responses.length);
    } catch (error) {
      dispatch('handleError', error);
    }
  },

  async addTransactions({ commit, dispatch }, { query, offset }) {
    commit('setAddingTxs', true);
    await dispatch('fetchTransactions', { query, offset });
    commit('setAddingTxs', false);
  },

  async refreshTransactions({ commit, dispatch }) {
    commit('setTransactions', []);
    commit('setRefreshing', true);
    await dispatch('fetchTransactions', { query: 'tx.height >= 1', offset: 0 });
    commit('setRefreshing', false);
    commit('setTxEventHeight', '');
  },

  async initTransactionsDetail({ commit, dispatch }, hash) {
    commit('reset');
    commit('setLoading', true);
    const requests = [dispatch('fetchTransactionByHash', hash)];
    await Promise.all(requests);
    commit('setLoading', false);
  },

  async fetchTransactionByHash({ commit, dispatch }, hash) {
    try {
      const response = await tx.requestTxByHash(hash);
      commit('setDetail', {
        data: response.data,
        ledger: APIS.HTTP.LCD,
        version: '',
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        await dispatch('fetchAncestorTransaction', hash);
      } else {
        dispatch('handleError', error);
      }
    }
  },

  async fetchAncestorTransaction({ dispatch, commit }, hash) {
    const ancestors =
      SETTINGS.ANCESTORS !== '' ? JSON.parse(SETTINGS.ANCESTORS) : [];
    if (ancestors.length === 0) return;
    for (const ancestor of ancestors) {
      try {
        const response = await _searchTransactionByVersion(hash, ancestor);
        commit('setDetail', {
          data: response.data,
          ledger: ancestor.lcd_ledger,
          version: ancestor.ver,
        });
      } catch (error) {
        if (error.response && error.response.status === 404) {
          continue;
        } else {
          dispatch('handleError', error);
        }
      }
    }
  },

  handleError({ commit }, error) {
    commit('setError', error);
  },
};

const _searchTransactionByVersion = async (hash, ancestor) => {
  const version = ancestor.ver;
  switch (version) {
    case SETTINGS.LEGACY_VERSIONS.V_038:
      return await tx.requestTxByHashLegacy(hash, ancestor.lcd);
    default:
      return await tx.requestTxByHash(hash);
  }
};
