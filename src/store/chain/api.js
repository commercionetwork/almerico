/**
 * Chain APIs
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
   * Handle ajax request to get node info
   * 
   * @returns {Promise}
   */
  requestNodeInfo() {
    return instance.get(API.NODE_INFO);
  }
};
