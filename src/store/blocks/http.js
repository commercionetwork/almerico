import axios from 'axios';
import { API } from '@/constants';

export default {
  /**
   * @param {Number} height
   * @returns {Promise}
   */
  requestBlock(height) {
    return axios({
      method: 'get',
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
      baseURL: `${API.BLOCKS}`,
      url: '/latest',
    });
  },
};
