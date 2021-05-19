import axios from 'axios';
import { API } from '@/constants';

export default {
  /**
   * @returns {Promise}
   */
  requestAbrTokens() {
    return axios({
      method: 'get',
      baseURL: `${API.KYC}`,
      url: `/funds`,
    });
  },
  /**
   * @returns {Promise}
   */
  requestVbrTokens() {
    return axios({
      method: 'get',
      baseURL: `${API.VBR}`,
      url: `/funds`,
    });
  },
  /**
   * @param {String} address
   * @returns {Promise}
   */
  requestBalances(address) {
    return axios({
      method: 'get',
      baseURL: `${API.BANK}`,
      url: `/${address}`,
    });
  },
  /**
   * @returns {Promise}
   */
  requestAllTokens() {
    return axios({
      method: 'get',
      baseURL: `${API.SUPPLY}`,
      url: '/total',
    });
  },
};
