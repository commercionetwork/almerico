import { APIS } from '@/constants';
import axios from 'axios';

export default {
  /**
   *
   * @returns {AxiosPromise}
   */
  requestNodeInfo() {
    return axios({
      method: 'get',
      url: `${APIS.HTTP.NODE_INFO_GAIA}`,
    });
  },
};
