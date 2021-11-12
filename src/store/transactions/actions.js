import { tx } from '@/apis/http';
import { APIS, SETTINGS, TRANSACTIONS } from '@/constants';

export default {
  async initTransactionsList({ commit, dispatch }) {
    commit('setLoading', true);
    commit('setTransactions', []);
    const requests = [dispatch('fetchTransactions')];
    await Promise.all(requests);
    commit('setLoading', false);
  },

  async fetchTransactions({ commit, dispatch }, key) {
    const params = {
      events: 'tx.height >= 1',
      order_by: APIS.SORTING_ORDERS.ORDER_BY_DESC,
    };
    const pagination = {
      key: key,
      limit: TRANSACTIONS.TABLE_ITEMS,
    };
    try {
      const response = await tx.requestTxsList(params, pagination);
      commit('addTransactions', response.data.tx_responses);
      commit('setPagination', response.data.pagination);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },

  async addTransactions({ commit, dispatch }, key) {
    commit('setAddingTxs', true);
    await dispatch('fetchTransactions', key);
    commit('setAddingTxs', false);
  },

  async initTransactionsDetail({ commit, dispatch }, hash) {
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
        dispatch('handleError', error, { root: true });
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
          dispatch('handleError', error, { root: true });
        }
      }
    }
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
