/**
 * Blocks APIs
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
   * @param {Number} height
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
  }
};
