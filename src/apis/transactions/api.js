/**
 * Transactions APIs
 */

import axios from "axios";
import {
  API
} from "Constants";

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  /**
   * Handle ajax request to get a transactions list
   * 
   * @param {String} tag // mandatory
   * @param {Number} page 
   * @param {Number} limit 
   * @return {Promise}
   */
  requestTransactions({
    tag,
    page,
    limit
  }) {
    return instance.get(`${API.TXS}?${tag}&page=${page}&limit=${limit}`);
  },
  /**
   * Handle ajax request to get a transaction by hash
   * 
   * @param {String} hash 
   * @return {Promise}
   */
  requestTransactionByHash(hash) {
    return instance.get(`${API.TXS}/${hash}`)
  }
};
