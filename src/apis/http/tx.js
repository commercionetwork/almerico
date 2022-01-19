import { APIS } from '@/constants';
import axios from 'axios';
import apisHelper from '../helpers/apisHelper';

export default {
  /**
   *
   * @param {Object} parameters
   * @param {Object} pagination
   * @returns {AxiosPromise}
   */
  requestTxsList(parameters, pagination) {
    const params = apisHelper.setupParams(parameters, pagination);
    return axios({
      url: `${APIS.HTTP.TXS}`,
      method: 'get',
      params,
    });
  },
  /**
   *
   * @param {String} hash
   * @returns {AxiosPromise}
   */
  requestTxByHash(hash) {
    return axios({
      url: `/${hash}`,
      method: 'get',
      baseURL: `${APIS.HTTP.TXS}`,
    });
  },
  /**
   *
   * @param {String} hash
   * @param {String} lcd
   * @returns {AxiosPromise}
   */
  requestTxByHashLegacy(hash, lcd) {
    return axios({
      url: `/txs/${hash}`,
      method: 'get',
      baseURL: lcd,
    });
  },
};
