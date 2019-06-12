/**
 * Transactions  APIs
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
   * @param {string} tag // mandatory
   * @param {number} page 
   * @param {number} limit 
   * @return {Promise}
   */
  requestTransactions({
    tag,
    page = 1,
    limit = 20
  }) {
    return instance.get(`${API.TXS}?${tag}&page=${page}&limit=${limit}`);
  },
  /**
   * Handle ajax request to get the transactions concerning a height
   * 
   * @param {string} height
   * @return {Promise} 
   */
  requestTransactionsByHeight(height) {
    return instance.get(API.TXS, {
      params: {
        'tx.height': height
      }
    });
  },
  /**
   * Handle ajax request to get a transaction by hash
   * 
   * @param {string} hash 
   * @return {Promise}
   */
  requestTransaction(hash) {
    return instance.get(`${API.TXS}/${hash}`)
  },
};
