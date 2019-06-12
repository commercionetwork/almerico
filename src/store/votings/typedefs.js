/**
 * Votings type definitions
 */
/** @typedef {Object} Proposal
 * @property {String} description 
 * @property {TallyResult} final_tally_result 
 * @property {Number} proposal_id 
 * @property {String} proposal_status 
 * @property {String} proposal_type 
 * @property {String} submit_time 
 * @property {String} title 
 * @property {Array.<Deposit>} total_deposit 
 * @property {String} voting_start_time 
 */
/** @typedef {Object} TallyResult
 * @property {String} abstain 
 * @property {String} no 
 * @property {String} no_with_veto 
 * @property {String} yes 
 */
/** @typedef {Object} Deposit
 * @property {String} amount 
 * @property {String} denom 
 */
