import { APIS } from '@/constants';
import axios from 'axios';

export default {
  /**
   *
   * @returns {AxiosPromise}
   */
  requestSupply() {
    return axios({
      method: 'get',
      baseURL: `${APIS.HTTP.BANK}`,
      url: '/supply',
    });
  },
  /**
   *
   * @param {String} address
   * @returns {AxiosPromise}
   */
  requestBalances(address) {
    return axios({
      method: 'get',
      baseURL: `${APIS.HTTP.BANK}`,
      url: `/balances/${address}`,
    });
  },
  /**
   *
   * @param {String} address
   * @returns {AxiosPromise}
   */
  requestBalancesLegacy(address) {
    return axios({
      method: 'get',
      baseURL: `${APIS.HTTP.BANK_LEGACY}`,
      url: `/balances/${address}`,
    });
  },
};
