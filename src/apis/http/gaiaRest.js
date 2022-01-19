import { APIS } from '@/constants';
import axios from 'axios';

export default {
  /**
   *
   * @returns {AxiosPromise}
   */
  requestNodeInfo() {
    return axios({
      url: `${APIS.HTTP.NODE_INFO_GAIA}`,
      method: 'get',
    });
  },
};
