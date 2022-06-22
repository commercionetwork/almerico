import { APIS } from '@/constants';
import axios from 'axios';

const commercio = {
  /**
   *
   * @returns {AxiosPromise}
   */
  requestParams() {
    return axios({
      url: '/params',
      method: 'get',
      baseURL: `${APIS.HTTP.MINT}`,
    });
  },
  /**
   *
   * @returns {AxiosPromise}
   */
  requestAbrTokens() {
    return axios({
      url: `/funds`,
      method: 'get',
      baseURL: `${APIS.HTTP.KYC}`,
    });
  },
  /**
   *
   * @returns {AxiosPromise}
   */
  requestVbrTokens() {
    return axios({
      url: `/funds`,
      method: 'get',
      baseURL: `${APIS.HTTP.VBR}`,
    });
  },
  /**
   *
   * @param {String} address
   * @returns {AxiosPromise}
   */
  requestMembership(address) {
    return axios({
      url: `/${address}/membership`,
      method: 'get',
      baseURL: `${APIS.HTTP.KYC}`,
    });
  },
};

export default commercio;
