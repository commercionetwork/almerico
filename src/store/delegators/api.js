/**
 * Delegators APIs
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
   * Handle ajax request to get delegations by delegator address
   * 
   * @param {String} address
   * @return {Promise}
   */
  requestDelegatorDelegations(address) {
    return instance.get(`${API.STAKING_DELEGATORS}/${address}/delegations`);
  },
  /**
   * Handle ajax request to get unbonding delegations by delegator address
   * 
   * @param {String} address
   * @return {Promise}
   */
  requestDelegatorUnbondingDelegations(address) {
    return instance.get(`${API.STAKING_DELEGATORS}/${address}/unbonding_delegations`);
  },
  /**
   * Handle ajax request to get rewards by delegator address
   * 
   * @param {String} address
   * @return {Promise}
   */
  requestDelegatorRewards(address) {
    return instance.get(`${API.DISTRIBUTION_DELEGATORS}/${address}/rewards`);
  }
};
