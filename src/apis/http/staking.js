import { APIS } from '@/constants';
import axios from 'axios';
import apisHelper from '../helpers/apisHelper';

export default {
  /**
   *
   * @returns {AxiosPromise}
   */
  requestParameters() {
    return axios({
      method: 'get',
      baseURL: `${APIS.HTTP.STAKING}`,
      url: '/params',
    });
  },
  /**
   *
   * @returns {AxiosPromise}
   */
  requestPool() {
    return axios({
      method: 'get',
      baseURL: `${APIS.HTTP.STAKING}`,
      url: '/pool',
    });
  },
  /**
   *
   * @param {Object} parameters
   * @param {Object} pagination
   * @returns {AxiosPromise}
   */
  requestValidatorsList(parameters, pagination) {
    const params = apisHelper.setupParams(parameters, pagination);
    return axios({
      method: 'get',
      baseURL: `${APIS.HTTP.STAKING}`,
      url: '/validators',
      params,
    });
  },
  /**
   *
   * @param {String} id
   * @returns {AxiosPromise}
   */
  requestValidatorsDetail(id) {
    return axios({
      method: 'get',
      baseURL: `${APIS.HTTP.STAKING}`,
      url: `/validators/${id}`,
    });
  },
  /**
   *
   * @param {String} address
   * @returns {AxiosPromise}
   */
  requestDelegations(address) {
    return axios({
      method: 'get',
      baseURL: `${APIS.HTTP.STAKING}`,
      url: `/delegations/${address}`,
    });
  },
  /**
   *
   * @param {String} address
   * @returns {AxiosPromise}
   */
  requestUnbondings(address) {
    return axios({
      method: 'get',
      baseURL: `${APIS.HTTP.STAKING}`,
      url: `/delegators/${address}/unbonding_delegations`,
    });
  },
  /**
   *
   * @param {String} address
   * @returns {AxiosPromise}
   */
  requestDelegationsLegacy(address) {
    return axios({
      method: 'get',
      baseURL: `${APIS.HTTP.STAKING_LEGACY}`,
      url: `/delegators/${address}/delegations`,
    });
  },
  /**
   *
   * @param {String} id
   * @returns {AxiosPromise}
   */
  requestValidatorsDetailLegacy(id) {
    return axios({
      method: 'get',
      baseURL: `${APIS.HTTP.STAKING_LEGACY}`,
      url: `/validators/${id}`,
    });
  },
  /**
   *
   * @param {String} id
   * @returns {Promise}
   */
  requestValidatorsDetailDelegations(id) {
    return axios({
      method: 'get',
      baseURL: `${APIS.HTTP.STAKING}`,
      url: `/validators/${id}/delegations`,
    });
  },
};
