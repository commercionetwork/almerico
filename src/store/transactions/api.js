import axios from 'axios';
import { API } from '@/constants';

const headers = {
  'Content-Type': 'application/json',
};

export default {
  /**
   * @param {String} query
   * @param {Number} page
   * @param {Number} limit
   * @returns {Promise}
   */
  requestSearchTransactions({ query, page, limit }) {
    return axios.get(`${API.TXS}?${query}&page=${page}&limit=${limit}`, {
      headers: headers,
    });
  },
  /**
   * @param {String} hash
   * @returns {Promise}
   */
  requestTransaction(hash) {
    return axios({
      method: 'get',
      headers: headers,
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
      headers: headers,
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
      headers: headers,
      baseURL: `${API.TXS}`,
      params: {
        'tx.height': height,
      },
    });
  },
};
