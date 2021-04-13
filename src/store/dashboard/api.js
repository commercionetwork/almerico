import axios from 'axios';
import { API } from '@/constants';

export default {
  /**
   * @returns {Promise}
   */
  requestConversionRate() {
    return axios({
      method: 'get',
      baseURL: `${API.MINT}`,
      url: '/conversion_rate',
    });
  },
  /**
   * @param {String} query
   * @param {Number} page
   * @param {Number} limit
   * @returns {Promise}
   */
  requestRateUpdates({ page, limit }) {
    return axios({
      method: 'get',
      baseURL: `${API.TXS}`,
      params: {
        'message.action': 'setEtpsConversionRate',
        page,
        limit,
      },
    });
  },
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
};
