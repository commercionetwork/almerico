import { tx } from '@/apis/http';
import { APIS, CONFIG, TRANSACTIONS } from '@/constants';

export default {
  async initTransactionsList({ commit, dispatch }) {
    commit('reset');
    commit('setLoading', true);
    const requests = [dispatch('fetchTransactions', APIS.SORTING_ORDERS.DESC)];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async refreshTransactions({ commit, dispatch }) {
    commit('setTransactions', []);
    commit('setRefreshing', true);
    await dispatch('fetchTransactions', APIS.SORTING_ORDERS.DESC);
    commit('setRefreshing', false);
  },
  async fetchTransactions({ commit }, order) {
    try {
      const response = await tx.requestTxs(order, TRANSACTIONS.AMOUNT_TO_LOAD);
      commit('setTransactions', response.data.txs);
    } catch (error) {
      commit('setError', error);
    }
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
      // Use the env variable and not a constant to make the action testable
      const ancestors = JSON.parse(process.env.VUE_APP_ANCESTORS);
      if (!ancestors.length) {
        commit('setError', error);
      } else {
        await dispatch('fetchAncestorsTransaction', { hash, ancestors });
      }
    }
  },
  async fetchAncestorsTransaction({ commit }, { hash, ancestors }) {
    // Query each ancestor in order and stop at the first hit. A failing
    // ancestor (404, non-404 status, or a CORS/network error that leaves
    // the response unreadable) must not abort the chain: only commit the
    // error once every ancestor has been tried without success.
    let lastError;
    for (const ancestor of ancestors) {
      try {
        const response = await _requestToAncestor(hash, ancestor);
        commit('setDetail', {
          data: response.data,
          ledger: ancestor.lcd_ledger,
          version: ancestor.ver,
        });
        return;
      } catch (error) {
        lastError = error;
      }
    }
    commit('setError', lastError);
  },
};

const _requestToAncestor = (hash, ancestor) => {
  const version = ancestor.ver;
  switch (version) {
    case CONFIG.SDK_VERSIONS.V_045:
      return tx.requestTxByHashArchive(hash, ancestor.lcd);
    case CONFIG.SDK_VERSIONS.V_038:
      return tx.requestTxByHashLegacy(hash, ancestor.lcd);
    default:
      return tx.requestTxByHashLegacy(hash, ancestor.lcd);
  }
};
