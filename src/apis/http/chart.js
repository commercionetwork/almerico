import { APIS } from '@/constants';
import axios from 'axios';

const chart = {
  /**
   *
   * @returns {AxiosPromise}
   */
  requestTokens() {
    return axios({
      url: '/tokens',
      method: 'get',
      baseURL: `${APIS.HTTP.BACKEND_CHARTS}`,
    });
  },
};

export default chart;
