import { APIS } from '@/constants';
import axios from 'axios';

const overview = {
  /**
   *
   * @returns {AxiosPromise}
   */
  requestExchangeRate() {
    return axios({
      url: '/exchange-rate',
      method: 'get',
      baseURL: APIS.HTTP.BACKEND_OVERVIEWS,
    });
  },
};

export default overview;
