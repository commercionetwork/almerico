import { APIS } from '@/constants';
import axios from 'axios';
import apisHelper from '../helpers/apisHelper';

const tx = {
  /**
   *
   * @param {String} order
   * @param {Number} limit
   * @returns {AxiosPromise}
   */
  requestTxs(order, limit) {
    return axios({
      method: 'get',
      baseURL: APIS.HTTP.BACKEND_TXS,
      params: {
        order: order || undefined,
        limit: limit || undefined,
      },
    });
  },
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
      baseURL: APIS.HTTP.TXS,
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
      baseURL: APIS.HTTP.TXS,
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
  /**
   *
   * @param {String} hash
   * @param {String} lcd
   * @returns {AxiosPromise}
   */
  requestTxByHashArchive(hash, lcd) {
    return axios({
      url: `/txs/${hash}`,
      method: 'get',
      baseURL: `${lcd}/${APIS.HTTP.TXS_PATH}`,
    });
  },
};

export default tx;
