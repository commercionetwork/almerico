import { APIS } from '@/constants';
import axios from 'axios';

const distribution = {
  /**
   *
   * @param {String} address
   * @returns {AxiosPromise}
   */
  requestRewards(address) {
    return axios({
      url: `/delegators/${address}/rewards`,
      method: 'get',
      baseURL: APIS.HTTP.DISTRIBUTION,
    });
  },
  /**
   *
   * @param {String} address
   * @returns {AxiosPromise}
   */
  requestCommission(address) {
    return axios({
      url: `/validators/${address}/commission`,
      method: 'get',
      baseURL: APIS.HTTP.DISTRIBUTION,
    });
  },
};

export default distribution;
