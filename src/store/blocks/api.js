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
  requestBlockChain(min, max) {
    return instance.get(`${API.BLOCKCHAIN}?minHeight=${min}&maxHeight=${max}`);
  }
};
