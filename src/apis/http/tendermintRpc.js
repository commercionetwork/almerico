import { APIS } from '@/constants';
import axios from 'axios';

const tendermintRpc = {
  /**
   *
   * @param {Number} height
   * @returns {AxiosPromise}
   */
  requestBlock(height) {
    return axios({
      url: `/${height}`,
      method: 'get',
      baseURL: APIS.HTTP.BLOCKS_RPC,
    });
  },
  /**
   *
   * @returns {AxiosPromise}
   */
  requestBlockLatest() {
    return axios({
      url: '/latest',
      method: 'get',
      baseURL: APIS.HTTP.BLOCKS_RPC,
    });
  },
  /**
   *
   * @param {Number} height
   * @returns {AxiosPromise}
   */
  requestValidatorSets(height) {
    return axios({
      url: `/${height}`,
      method: 'get',
      baseURL: APIS.HTTP.VALIDATORSETS_RPC,
    });
  },
  /**
   *
   * @returns {AxiosPromise}
   */
  requestValidatorSetsLatest() {
    return axios({
      url: '/latest',
      method: 'get',
      baseURL: APIS.HTTP.VALIDATORSETS_RPC,
    });
  },
};

export default tendermintRpc;
