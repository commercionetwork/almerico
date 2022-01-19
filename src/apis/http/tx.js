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
      method: 'get',
      url: `${APIS.HTTP.TXS}`,
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
      method: 'get',
      baseURL: `${APIS.HTTP.TXS}`,
      url: `/${hash}`,
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
      method: 'get',
      baseURL: lcd,
      url: `/txs/${hash}`,
    });
  },
};
