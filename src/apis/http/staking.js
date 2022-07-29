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
      baseURL: `${APIS.HTTP.STAKING}`,
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
      baseURL: `${APIS.HTTP.STAKING}`,
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
      baseURL: `${APIS.HTTP.STAKING}`,
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
      url: `/validators/${id}`,
      method: 'get',
      baseURL: `${APIS.HTTP.STAKING}`,
    });
  },
  /**
   *
   * @param {String} address
   * @returns {AxiosPromise}
   */
  requestDelegations(address) {
    return axios({
      url: `/delegations/${address}`,
      method: 'get',
      baseURL: `${APIS.HTTP.STAKING}`,
    });
  },
  /**
   *
   * @param {String} address
   * @returns {AxiosPromise}
   */
  requestUnbondings(address) {
    return axios({
      url: `/delegators/${address}/unbonding_delegations`,
      method: 'get',
      baseURL: `${APIS.HTTP.STAKING}`,
    });
  },
  /**
   *
   * @param {String} id
   * @returns {Promise}
   */
  requestValidatorsDetailDelegations(id) {
    return axios({
      url: `/validators/${id}/delegations`,
      method: 'get',
      baseURL: `${APIS.HTTP.STAKING}`,
    });
  },
};

export default staking;
