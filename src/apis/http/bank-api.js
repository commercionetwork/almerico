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
      baseURL: APIS.HTTP.BANK,
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
      baseURL: APIS.HTTP.BANK,
    });
  },
  /**
   *
   * @param {String} address
   * @param {String} baseURL
   * @param {String} denom
   * @returns {AxiosPromise}
   */
  requestTokenBalance({ address, baseURL, denom }) {
    return axios({
      url: `/balances/${address}/by_denom`,
      method: 'get',
      baseURL,
      params: { denom },
    });
  },
};

export default bank;
