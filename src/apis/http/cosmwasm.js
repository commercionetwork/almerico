import axios from 'axios';

import apisHelper from '../helpers/apisHelper';
import { APIS } from '@/constants';

const cosmwasm = {
  /**
   *
   * @param {String} code_id
   * @param {Object} pagination
   * @returns {AxiosPromise}
   */
  requestContracts(code_id, pagination) {
    const params = apisHelper.setupPagination(pagination);
    return axios({
      url: `/code/${code_id}/contracts`,
      method: 'get',
      baseURL: `${APIS.HTTP.WASM}`,
      params,
    });
  },
  /**
   *
   * @param {String} address
   * @param {String} query_data
   * @returns {AxiosPromise}
   */
  requestContractBalance(address, query_data) {
    return axios({
      url: `/contract/${address}/smart/${query_data}`,
      method: 'get',
      baseURL: `${APIS.HTTP.WASM}`,
    });
  },
  /**
   *
   * @param {String} address
   * @param {Object} pagination
   * @returns {AxiosPromise}
   */
  requestContractHistory(address, pagination) {
    const params = apisHelper.setupPagination(pagination);
    return axios({
      url: `/contract/${address}/history`,
      method: 'get',
      baseURL: `${APIS.HTTP.WASM}`,
      params,
    });
  },
  /**
   *
   * @param {String} address
   * @returns {AxiosPromise}
   */
  requestContractState(address) {
    return axios({
      url: `/contract/${address}/state`,
      method: 'get',
      baseURL: `${APIS.HTTP.WASM}`,
    });
  },
};

export default cosmwasm;
