import { APIS } from '@/constants';
import axios from 'axios';
import apisHelper from '../helpers/apisHelper';

const staking = {
  /**
   *
   * @returns {AxiosPromise}
   */
  requestParameters() {
    return axios({
      url: '/params',
      method: 'get',
      baseURL: APIS.HTTP.STAKING,
    });
  },
  /**
   *
   * @returns {AxiosPromise}
   */
  requestPool() {
    return axios({
      url: '/pool',
      method: 'get',
      baseURL: APIS.HTTP.STAKING,
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
      url: '/validators',
      method: 'get',
      baseURL: APIS.HTTP.STAKING,
      params,
    });
  },
  /**
   *
   * @param {String} address
   * @returns {AxiosPromise}
   */
  requestValidatorsDetail(address) {
    return axios({
      url: `/validators/${address}`,
      method: 'get',
      baseURL: APIS.HTTP.STAKING,
    });
  },
  /**
   *
   * @param {String} address
   * @param {Object} pagination
   * @returns {AxiosPromise}
   */
  requestDelegations(address, pagination) {
    const params = apisHelper.setupPagination(pagination);
    return axios({
      url: `/delegations/${address}`,
      method: 'get',
      baseURL: APIS.HTTP.STAKING,
      params,
    });
  },
  /**
   *
   * @param {String} address
   * @param {Object} pagination
   * @returns {AxiosPromise}
   */
  requestUnbondings(address, pagination) {
    const params = apisHelper.setupPagination(pagination);
    return axios({
      url: `/delegators/${address}/unbonding_delegations`,
      method: 'get',
      baseURL: APIS.HTTP.STAKING,
      params,
    });
  },
  /**
   *
   * @param {String} address
   * @param {Object} pagination
   * @returns {Promise}
   */
  requestValidatorsDetailDelegations(address, pagination) {
    const params = apisHelper.setupPagination(pagination);
    return axios({
      url: `/validators/${address}/delegations`,
      method: 'get',
      baseURL: APIS.HTTP.STAKING,
      params,
    });
  },
};

export default staking;
