import { APIS } from '@/constants';
import axios from 'axios';

const monitor = {
  /**
   *
   * @returns {AxiosPromise}
   */
  requestBackendHealth() {
    return axios({
      method: 'get',
      baseURL: APIS.HTTP.BACKEND_HEALTHCHECK,
    });
  },
};

export default monitor;
