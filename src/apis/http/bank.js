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
};

export default bank;
