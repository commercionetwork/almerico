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
   * @param {string} action // mandatory
   * @param {string} sender // mandatory
   * @param {number} page 
   * @param {number} limit 
   * @return {Promise}
   */
  requestTransactions({
    action,
    sender,
    page = 1,
    limit = 20
  }) {
    return instance.get(API.TXS, {
      params: {
        action,
        sender,
        page,
        limit
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
  /**
   * Handle ajax request to search transactions
   * 
   * @param {string} query // mandatory 
   * @param {boolean} prove
   * @param {number} page
   * @param {number} per_page
   * @return {Promise}
   */
  requestSearchTransactions({
    query,
    prove = false,
    page = 1,
    per_page = 20
  }){
    return instance.get(API.TX_SEARCH, {
      params: {
        query,
        prove,
        page,
        per_page
      }
    });
  }
};
