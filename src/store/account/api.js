import axios from 'axios';
import { API } from '@/constants';

export default {
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
   * @param {String} address
   * @returns {Promise}
   */
  requestDelegations(address) {
    return axios({
      method: 'get',
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
      baseURL: `${API.DISTRIBUTION}`,
      url: `/delegators/${address}/rewards`,
    });
  },
  /**
   * @param {String} query
   * @param {Number} page
   * @param {Number} limit
   * @returns {Promise}
   */
  requestSearchTransactions({ query, page, limit }) {
    return axios.get(`${API.TXS}?${query}&page=${page}&limit=${limit}`);
  },
  /**
   * @param {String} address
   * @returns {Promise}
   */
  requestUnbondings(address) {
    return axios({
      method: 'get',
      baseURL: `${API.STAKING}`,
      url: `/delegators/${address}/unbonding_delegations`,
    });
  },
};
