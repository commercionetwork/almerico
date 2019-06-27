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
