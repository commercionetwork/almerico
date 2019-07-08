/**
 * Validators APIs
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
   * @param {String} status 
   * @param {Number} page 
   * @param {Number} limit
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
   * @param {String} address
   * @return {Promise}
   */
  requestValidator(address) {
    return instance.get(`${API.STAKING_VALIDATORS}/${address}`);
  },
  /**
   * Handle ajax request to get delegations by validator address
   * 
   * @param {String} address
   * @return {Promise}
   */
  requestValidatorDelegations(address) {
    return instance.get(`${API.STAKING_VALIDATORS}/${address}/delegations`);
  },
  /**
   * Handle ajax request to get outstanding rewards by validator address
   * 
   * @param {String} address
   * @return {Promise}
   */
  requestValidatorOutstandingRewards(address) {
    return instance.get(`${API.DISTRIBUTION_VALIDATORS}/${address}/outstanding_rewards`);
  },
  /**
   * Handle ajax request to get rewards by validator address
   * 
   * @param {String} address
   * @return {Promise}
   */
  requestValidatorRewards(address) {
    return instance.get(`${API.DISTRIBUTION_VALIDATORS}/${address}/rewards`);
  },
  /**
   * Handle ajax request to get unbonding delegations by validator address
   * 
   * @param {String} address
   * @return {Promise}
   */
  requestValidatorUnbondingDelegations(address) {
    return instance.get(`${API.STAKING_VALIDATORS}/${address}/unbonding_delegations`);
  },
  /**
   * Handle ajax request to get validator sets concerning an height
   * 
   * @param {Number} height
   * @return {Promise} 
   */
  requestValidatorsetsFromHeight(height) {
    return instance.get(`${API.VALIDATORSETS}/${height}`);
  }
};
