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
   * Handle ajax request to get genesis
   * 
   * @returns {Promise}
   */
  requestGenesis() {
    return instance.get(API.GENESIS);
  }
};
