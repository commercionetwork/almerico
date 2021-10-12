import axios from 'axios';
import { API } from '@/constants';

export default {
  /**
   * @param {String} status
   * @param {Number} page
   * @param {Number} limit
   * @returns {Promise}
   */
  requestValidatorsList({ status, pagination }) {
    const params = {
      status: status || undefined,
      pagination: pagination || undefined,
    };
    return axios({
      method: 'get',
      baseURL: `${API.STAKING}`,
      url: '/validators',
      params,
    });
  },
  /**
   * @returns {Promise}
   */
  requestLatestValidatorSets() {
    return axios({
      method: 'get',
      baseURL: `${API.VALIDATORSETS}`,
      url: '/latest',
    });
  },
  /**
   * @param {Number} height
   * @returns {Promise}
   */
  requestValidatorsetsFromHeight(height) {
    return axios({
      method: 'get',
      baseURL: `${API.VALIDATORSETS}`,
      url: `/${height}`,
    });
  },
  /**
   * @param {String} address
   * @returns {Promise}
   */
  requestValidatorDetails(address) {
    return axios({
      method: 'get',
      baseURL: `${API.STAKING}`,
      url: `/validators/${address}`,
    });
  },
  /**
   * @param {String} address
   * @returns {Promise}
   */
  requestValidatorDelegations(address) {
    return axios({
      method: 'get',
      baseURL: `${API.STAKING}`,
      url: `/validators/${address}/delegations`,
    });
  },
  /**
   * @param {String} id
   * @return {Promise}
   */
  requestValidatorPictures(id) {
    return axios({
      method: 'get',
      baseURL: `${API.USER_LOOKUP}`,
      params: {
        key_suffix: id,
        fields: 'pictures',
      },
    });
  },
};
