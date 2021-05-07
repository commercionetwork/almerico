import axios from 'axios';
import { API } from '@/constants';

export default {
  /**
   * @returns {Promise}
   */
  requestAllTokens() {
    return axios({
      method: 'get',
      baseURL: `${API.SUPPLY}`,
      url: '/total',
    });
  },
  /**
   * @returns {Promise}
   */
  requestNodeInfo() {
    return axios({
      method: 'get',
      baseURL: `${API.NODE_INFO}`,
    });
  },
  /**
   * @returns {Promise}
   */
  requestPool() {
    return axios({
      method: 'get',
      baseURL: `${API.STAKING}`,
      url: '/pool',
    });
  },
  /**
   * @returns {Promise}
   */
  requestStakingParameters() {
    return axios({
      method: 'get',
      baseURL: `${API.STAKING}`,
      url: '/parameters',
    });
  },
};
