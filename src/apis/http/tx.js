import { APIS } from '@/constants';
import axios from 'axios';
import apisHelper from '../helpers/apisHelper';

const tx = {
  /**
   *
   * @param {Object} parameters
   * @param {Object} pagination
   * @returns {AxiosPromise}
   */
  requestTxsList(parameters, pagination) {
    const params = apisHelper.setupParams(parameters, pagination);
    return axios({
      url: '/txs',
      method: 'get',
      baseURL: `${APIS.HTTP.TXS}`,
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
      url: `/txs/${hash}`,
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

export default tx;
