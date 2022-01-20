import { APIS } from '@/constants';
import axios from 'axios';

export default {
  /**
   *
   * @returns {AxiosPromise}
   */
  requestNodeInfo() {
    return axios({
      url: '/node_info',
      method: 'get',
      baseURL: `${APIS.HTTP.LCD}`,
    });
  },
};
