import axios from 'axios';
import { API } from '@/constants';

const headers = {
  'Content-Type': 'application/json',
};

export default {
  /**
   * @param {Number} height
   * @returns {Promise}
   */
  requestBlock(height) {
    return axios({
      method: 'get',
      headers: headers,
      baseURL: `${API.BLOCKS}`,
      url: `/${height}`,
    });
  },
  /**
   * @returns {Promise}
   */
  requestLatestBlock() {
    return axios({
      method: 'get',
      headers: headers,
      baseURL: `${API.BLOCKS}`,
      url: '/latest',
    });
  },
};
