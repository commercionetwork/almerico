import { APIS } from '@/constants';
import axios from 'axios';

const bank = {
  /**
   *
   * @returns {AxiosPromise}
   */
  requestSupply() {
    return axios({
      url: '/supply',
      method: 'get',
      baseURL: `${APIS.HTTP.BANK}`,
    });
  },
  /**
   *
   * @param {String} address
   * @returns {AxiosPromise}
   */
  requestBalances(address) {
    return axios({
      url: `/balances/${address}`,
      method: 'get',
      baseURL: `${APIS.HTTP.BANK}`,
    });
  },
  //TODO: remove when the new version will be available
  /**
   *
   * @param {String} address
   * @returns {AxiosPromise}
   */
  requestBalancesLegacy(address) {
    return axios({
      url: `/balances/${address}`,
      method: 'get',
      baseURL: `${APIS.HTTP.BANK_LEGACY}`,
    });
  },
};

export default bank;
