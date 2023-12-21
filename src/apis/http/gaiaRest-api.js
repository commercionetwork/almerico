import { APIS } from '@/constants';
import axios from 'axios';

const gaiaRest = {
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

export default gaiaRest;
