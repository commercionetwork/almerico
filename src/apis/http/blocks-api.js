import { APIS } from '@/constants';
import axios from 'axios';

const blocks = {
  /**
   *
   * @param {Number} height
   * @returns {AxiosPromise}
   */
  requestSupposedTime(height) {
    return axios({
      url: `/${height}/supposed-time`,
      method: 'get',
      baseURL: APIS.HTTP.BACKEND_BLOCKS,
    });
  },
};

export default blocks;
