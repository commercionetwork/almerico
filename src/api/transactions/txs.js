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

const api = {
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

const fetchTransactions = async (tag, limit) => {
  let txs = [];
  let err = null;
  try {
    const response = await api.requestTransactions({
      tag,
      page: 1,
      limit
    });
    const totalPage = parseInt(response.data.page_total);
    if (totalPage > 0) {
      txs.push(...response.data.txs);
      if (totalPage > 1) {
        let page = 2;
        while (page <= totalPage) {
          const res = await api.requestTransactions({
            tag,
            page,
            limit
          });
          txs.push(...res.data.txs);
          page++;
        }
      }
    }
  } catch (error) {
    err = error;
  }
  return {
    txs: txs,
    err: err
  };
};

const fetchTransaction = async (hash) => {
  let tx = null;
  let err = null;
  try {
    const response = await api.requestTransactionByHash(hash);
    tx = response.data;
  } catch (error) {
    err = error;
  }
  return {
    tx: tx,
    err: err
  };
};

export {
  fetchTransaction,
  fetchTransactions
};
