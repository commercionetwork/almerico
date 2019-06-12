/**
 * Votings APIs
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
   * Handle ajax request to get a proposals list
   * 
   * @param {string} voter 
   * @param {string} depositor 
   * @param {string} status valid values can be "deposit_period", "voting_period", "passed", "rejected"
   * @return {Promise}
   */
  requestProposals({
    voter,
    depositor,
    status
  }) {
    return instance.get(API.GOV_PROPOSALS, {
      params: {
        voter,
        depositor,
        status
      }
    });
  },
  /**
   * handle ajax request to get a proposal by id
   * 
   * @param {string} proposalId 
   * @return {Promise}
   */
  requestProposal(proposalId) {
    return instance.get(`${API.GOV_PROPOSALS}/${proposalId}`);
  }
};
