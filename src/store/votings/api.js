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
   * @param {String} voter 
   * @param {String} depositor 
   * @param {String} status valid values can be "deposit_period", "voting_period", "passed", "rejected"
   * @return {Promise}
   */
  requestProposals({
    voter,
    depositor,
    status
  }) {
    return instance.get(API, {
      params: {
        voter,
        depositor,
        status
      }
    });
  },
  /**
   * Handle ajax request to get a proposal by id
   * 
   * @param {String} proposalId 
   * @return {Promise}
   */
  requestProposal(proposalId) {
    return instance.get(`${API}/${proposalId}`);
  },
  /**
   * Handle ajax request to get a proposer by proposal id
   * 
   * @param {String} proposalId 
   * @return {Promise}
   */
  requestProposer(proposalId) {
    return instance.get(`${API}/${proposalId}/proposer`);
  },
  /**
   * Handle ajax request to get deposits by proposal id
   * 
   * @param {String} proposalId 
   * @return {Promise}
   */
  requestDeposits(proposalId) {
    return instance.get(`${API}/${proposalId}/deposits`);
  },
  /**
   * Handle ajax request to get votes by proposal id
   * 
   * @param {String} proposalId 
   * @return {Promise}
   */
  requestVotes(proposalId) {
    return instance.get(`${API}/${proposalId}/votes`);
  },
  /**
   * Handle ajax request to get tally result by proposal id
   * 
   * @param {String} proposalId 
   * @return {Promise}
   */
  requestTally(proposalId) {
    return instance.get(`${API}/${proposalId}/tally`);
  },
};
