/**
 * STARTING APIS
 */

import axios from "axios";
import {
  API
} from "@/constants";

const headers = {
  'Content-Type': 'application/json'
};

export default {
  /**
   * @returns {Promise}
   */
  requestGenesis() {
    return axios({
      method: 'get',
      baseURL: `${API.GENESIS}`,
      headers: headers,
    });
  },
  /**
   * @returns {Promise}
   */
  requestNodeInfo() {
    return axios({
      method: 'get',
      baseURL: `${API.NODE_INFO}`,
      headers: headers,
    });
  },
  /**
   * @returns {Promise}
   */
  requestPool() {
    return axios({
      method: 'get',
      baseURL: `${API.STAKING}`,
      url: '/pool',
      headers: headers,
    });
  },
};