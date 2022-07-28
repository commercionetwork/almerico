import { APIS } from '@/constants';
import axios from 'axios';

const cosmwasm = {
  /**
   *
   * @param {String} code_id
   * @returns {AxiosPromise}
   */
  requestContracts(code_id) {
    return axios({
      url: `/code/${code_id}/contracts`,
      method: 'get',
      baseURL: `${APIS.HTTP.WASM}`,
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
   * @returns {AxiosPromise}
   */
  requestContractHistory(address) {
    return axios({
      url: `/contract/${address}/history`,
      method: 'get',
      baseURL: `${APIS.HTTP.WASM}`,
    });
  },
};

export default cosmwasm;
