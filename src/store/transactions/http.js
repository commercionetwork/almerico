import axios from 'axios';
import { API } from '@/constants';

export default {
  /**
   * @param {String} query
   * @param {Number} page
   * @param {Number} limit
   * @returns {Promise}
   */
  requestSearchTransactionsDEPRECATED({ query, page, limit }) {
    return axios.get(
      `${API.TXS_DEPRECATED}?${query}&page=${page}&limit=${limit}`,
    );
  },
  /**
   * @param {String} events
   * @param {Object} pagination
   * @param {String} orderBy
   * @returns {Promise}
   */
  requestSearchTransactions({ events, pagination, orderBy }) {
    const params = {
      events,
      'pagination.key': pagination.key || undefined,
      'pagination.offset': pagination.offset || undefined,
      'pagination.limit': pagination.limit || undefined,
      'pagination.count_total': pagination.count_total || undefined,
      'pagination.reverse': pagination.reverse || undefined,
      order_by: orderBy || undefined,
    };
    return axios({
      method: 'get',
      baseURL: `${API.TXS}`,
      params,
    });
  },
  /**
   * @param {String} hash
   * @returns {Promise}
   */
  requestTransaction(hash) {
    return axios({
      method: 'get',
      baseURL: `${API.TXS}`,
      url: `/${hash}`,
    });
  },
  /**
   * @param {String} lcd
   * @param {String} hash
   * @returns {Promise}
   */
  requestAncestorTransaction({ lcd, hash }) {
    return axios({
      method: 'get',
      baseURL: lcd,
      url: `/txs/${hash}`,
    });
  },
  /**
   * @param {Number} height
   * @returns {Promise}
   */
  requestBlockTransactions(height) {
    return axios({
      method: 'get',
      baseURL: `${API.TXS}`,
      params: {
        'tx.height': height,
      },
    });
  },
};
