import { APIS } from '@/constants';
import axios from 'axios';

export default {
  /**
   *
   * @returns {AxiosPromise}
   */
  requestConversionRate() {
    return axios({
      method: 'get',
      baseURL: `${APIS.HTTP.MINT}`,
      url: '/params',
    });
  },
  /**
   *
   * @returns {AxiosPromise}
   */
  requestAbrTokens() {
    return axios({
      method: 'get',
      baseURL: `${APIS.HTTP.KYC}`,
      url: `/funds`,
    });
  },
  /**
   *
   * @returns {AxiosPromise}
   */
  requestVbrTokens() {
    return axios({
      method: 'get',
      baseURL: `${APIS.HTTP.VBR}`,
      url: `/funds`,
    });
  },
  /**
   *
   * @returns {AxiosPromise}
   */
  requestAllTokens() {
    return axios({
      method: 'get',
      baseURL: `${APIS.HTTP.SUPPLY}`,
      url: '/total',
    });
  },
  /**
   *
   * @param {String} address
   * @returns {AxiosPromise}
   */
  requestMembership(address) {
    return axios({
      method: 'get',
      baseURL: `${APIS.HTTP.KYC}`,
      url: `/membership/${address}`,
    });
  },
};
