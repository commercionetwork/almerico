import { APIS } from '@/constants';
import axios from 'axios';

const cosmwasm = {
  /**
   *
   * @param {String} codeId
   * @param {number} limit
   * @param {String} nextKey
   * @returns {AxiosPromise}
   */
  requestContracts({ codeId, nextKey, limit = APIS.LIMIT } = {}) {
    const params = { 'pagination.limit': limit };
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
