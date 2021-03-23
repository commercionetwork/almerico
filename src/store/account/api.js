/**
 * ACCOUNT APIS
 */

import axios from "axios";
import {
  API
} from "@/constants";

const headers = {
  'Content-Type': 'application/json'
};

export default {
  /**
   * @param {String} address
   * @returns {Promise}
   */
  requestBalances(address) {
    return axios({
      method: 'get',
      headers: headers,
      baseURL: `${API.BANK}`,
      url: `/${address}`,
    });
  },
  /**
   * @param {String} address
   * @returns {Promise}
   */
  requestDelegations(address) {
    return axios({
      method: 'get',
      headers: headers,
      baseURL: `${API.STAKING}`,
      url: `/delegators/${address}/delegations`,
    });
  },
  /**
   * @param {String} address
   * @returns {Promise}
   */
  requestMembership(address) {
    return axios({
      method: 'get',
      headers: headers,
      baseURL: `${API.KYC}`,
      url: `/membership/${address}`,
    });
  },
  /**
   * @param {String} address
   * @returns {Promise}
   */
  requestRewards(address) {
    return axios({
      method: 'get',
      headers: headers,
      baseURL: `${API.DISTRIBUTION}`,
      url: `/delegators/${address}/rewards`,
    });
  },
  /**
   * @param {String} address
   * @returns {Promise}
   */
  requestUnbondings(address) {
    return axios({
      method: 'get',
      headers: headers,
      baseURL: `${API.STAKING}`,
      url: `/delegators/${address}/unbonding_delegations`,
    });
  },
};