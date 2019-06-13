/**
 * Tendermint APIs
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
   * Handle ajax request to get a block by id
   * 
   * @param {number} height
   * @return {Promise}
   */
  requestBlock(height) {
    return instance.get(`${API.BLOCKS}/${height}`);
  },
  /**
   * Handle ajax request to get last block
   * 
   * @return {Promise}
   */
  requestLastBlock() {
    return instance.get(`${API.BLOCKS}/latest`);
  },
  /**
   *Handle ajax request to get a blocks list
   *  
   * @param {number} min 
   * @param {number} max
   * @return {Promise}
   */
  requestBlockChain(minHeight, maxHeight) {
    return instance.get(API.BLOCKCHAIN, {
      params: {
        minHeight,
        maxHeight
      }
    });
  },
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
  requestTransactionByHash(hash) {
    return instance.get(`${API.TXS}/${hash}`)
  },
  /**
   * Handle ajax request to get latest validator sets
   * 
   * @return {Promise}
   */
  requestValidatorsetsLatest() {
    return instance.get(API.VALIDATORSETS_LATEST);
  },
  /**
   * Handle ajax request to get validator sets concerning an height
   * 
   * @param {number} height
   * @return {Promise} 
   */
  requestValidatorsetsFromHeight(height) {
    return instance.get(`${API.VALIDATORSETS}/${height}`);
  }
};
