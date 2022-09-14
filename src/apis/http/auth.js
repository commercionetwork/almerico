import { APIS } from '@/constants';
import axios from 'axios';

const auth = {
  /**
   *
   * @returns {AxiosPromise}
   */
  requestAccounts(limit) {
    return axios({
      url: '/accounts',
      method: 'get',
      baseURL: `${APIS.HTTP.AUTH}`,
      params: {
        'pagination.limit': limit,
      },
    });
  },
};

export default auth;
