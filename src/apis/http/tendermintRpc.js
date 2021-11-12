import { APIS } from '@/constants';
import axios from 'axios';

export default {
  /**
   *
   * @param {Number} height
   * @returns {AxiosPromise}
   */
  requestBlock(height) {
    return axios({
      method: 'get',
      baseURL: `${APIS.HTTP.BLOCKS_RPC}`,
      url: `/${height}`,
    });
  },
  /**
   *
   * @returns {AxiosPromise}
   */
  requestBlockLatest() {
    return axios({
      method: 'get',
      baseURL: `${APIS.HTTP.BLOCKS_RPC}`,
      url: '/latest',
    });
  },
  /**
   *
   * @param {Number} height
   * @returns {AxiosPromise}
   */
  requestValidatorSets(height) {
    return axios({
      method: 'get',
      baseURL: `${APIS.HTTP.VALIDATORSETS_RPC}`,
      url: `/${height}`,
    });
  },
  /**
   *
   * @returns {AxiosPromise}
   */
  requestValidatorSetsLatest() {
    return axios({
      method: 'get',
      baseURL: `${APIS.HTTP.VALIDATORSETS_RPC}`,
      url: '/latest',
    });
  },
};
