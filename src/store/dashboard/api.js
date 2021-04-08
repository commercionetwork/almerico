import axios from 'axios';
import { API } from '@/constants';

const headers = {
  'Content-Type': 'application/json',
};

export default {
  /**
   * @returns {Promise}
   */
  requestConversionRate() {
    return axios({
      method: 'get',
      baseURL: `${API.MINT}`,
      url: '/conversion_rate',
      headers: headers,
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
      headers: headers,
      baseURL: `${API.TXS}`,
      params: {
        'message.action': 'setEtpsConversionRate',
        page,
        limit,
      },
    });
  },
};
