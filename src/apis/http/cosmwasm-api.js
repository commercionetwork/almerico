import { APIS } from '@/constants';
import axios from 'axios';

const cosmwasm = {
  /**
   *
   * @param {String} codeId
   * @returns {AxiosPromise}
   */
  requestContracts(codeId, nextKey) {
    const params = { 'pagination.limit': APIS.LIMIT };
    if (nextKey) {
      params['pagination.key'] = nextKey;
    }
    return axios({
      url: `/code/${codeId}/contracts`,
      method: 'get',
      baseURL: APIS.HTTP.WASM,
      params,
    });
  },
  /**
   *
   * @param {String} address
   * @param {String} nextKey
   * @returns {AxiosPromise}
   */
  requestContractHistory(address, nextKey) {
    const params = { 'pagination.limit': APIS.LIMIT };
    if (nextKey) {
      params['pagination.key'] = nextKey;
    }
    return axios({
      url: `/contract/${address}/history`,
      method: 'get',
      baseURL: APIS.COSWMWASM,
      params,
    });
  },
  /**
   *
   * @param {String} address
   * @param {String} queryData
   * @returns {AxiosPromise}
   */
  requestContractSmartQuery({ address, queryData }) {
    return axios({
      url: `/contract/${address}/smart/${queryData}`,
      method: 'get',
      baseURL: APIS.HTTP.WASM,
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
      baseURL: APIS.HTTP.WASM,
    });
  },
};

export default cosmwasm;
