/**
 * Account APIs
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
   * Handle ajax request to get balances
   * 
   * @param {String} address
   * @return {Promise}
   */
  requestBalances(address) {
    return instance.get(`${API.BANK}/${address}`);
  },
};
