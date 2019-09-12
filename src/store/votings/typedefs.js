/**
 * Votings type definitions
 */
/** @typedef {Object} VotingsState
 * @property {Array.<Proposal>} all
 * @property {Boolean} isFetching 
 * @property {String} message
 */
/** @typedef {Object} Proposal
 * @property {String} deposit_end_time 
 * @property {Tally} final_tally_result 
 * @property {ProposalContent} proposal_content 
 * @property {String} proposal_id 
 * @property {String} proposal_status 
 * @property {String} submit_time 
 * @property {Array.<Amount>} total_deposit 
 * @property {String} voting_end_time 
 * @property {String} voting_start_time 
 */
/** @typedef {Object} ProposalContent
 * @property {String} type 
 * @property {ProposalValue} value 
 */
/** @typedef {Object} ProposalValue 
 * @property {String} description 
 * @property {String} title 
 */
/** @typedef {Object} Tally
 * @property {String} abstain 
 * @property {String} no 
 * @property {String} no_with_veto 
 * @property {String} yes 
 */
/** @typedef {Object} Proposer
 * @property {String}proposal_id
 * @property {String} proposer
 */
/** @typedef {Object} Deposit
 * @property {Array.<Amount>} amount 
 * @property {String} depositor 
 * @property {Number} proposal_id 
 */
/** @typedef {Object} Vote
 * @property {String} option 
 * @property {Number} proposal_id 
 * @property {String} voter 
 */
