/**
 * Stake APIs
 */

import axios from "axios";
import {
  API
} from "Constants";

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  /**
   * Handle ajax request to get a validators list
   * 
   * @param {string} status 
   * @param {number} page 
   * @param {number} limit
   * @return {Promise}
   */
  requestValidators({
    status,
    page,
    limit
  }) {
    return instance.get(API.STAKING_VALIDATORS, {
      params: {
        status,
        page,
        limit
      }
    });
  },
  /**
   * Handle ajax request to get a validator by address
   * 
   * @param {string} address
   * @return {Promise}
   */
  requestValidator(address) {
    return instance.get(`${API.STAKING_VALIDATORS}/${address}`);
  },
  /**
   * Handle ajax request to get delegations by validator address
   * 
   * @param {string} address
   * @return {Promise}
   */
  requestValidatorDelegations(address) {
    return instance.get(`${API.STAKING_VALIDATORS}/${address}/delegations`);
  },
  /**
   * Handle ajax request to get unbonding delegations by validator address
   * 
   * @param {string} address
   * @return {Promise}
   */
  requestValidatorUnbondingDelegations(address) {
    return instance.get(`${API.STAKING_VALIDATORS}/${address}/unbonding_delegations`);
  },
  /**
   * Handle ajax request to get rewards by validator address
   * 
   * @param {string} address
   * @return {Promise}
   */
  requestValidatorRewards(address) {
    return instance.get(`${API.DISTRIBUTION_VALIDATORS}/${address}/rewards`);
  },
  /**
   * Handle ajax request to get outstanding rewards by validator address
   * 
   * @param {string} address
   * @return {Promise}
   */
  requestValidatorOutstandingRewards(address) {
    return instance.get(`${API.DISTRIBUTION_VALIDATORS}/${address}/outstanding_rewards`);
  },
  /**
   * Handle ajax request to get staking pool
   * 
   * @return {Promise}
   */
  requestPool() {
    return instance.get(API.STAKING_POOL);
  }
};
