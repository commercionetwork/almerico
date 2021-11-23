import { APIS } from '@/constants';
import axios from 'axios';

export default {
  /**
   *
   * @param {String} address
   * @returns {AxiosPromise}
   */
  requestRewards(address) {
    return axios({
      method: 'get',
      baseURL: `${APIS.HTTP.DISTRIBUTION}`,
      url: `/delegators/${address}/rewards`,
    });
  },
  /**
   *
   * @param {String} address
   * @returns {AxiosPromise}
   */
  requestCommission(address) {
    return axios({
      method: 'get',
      baseURL: `${APIS.HTTP.DISTRIBUTION}`,
      url: `/validators/${address}/commission`,
    });
  },
};
