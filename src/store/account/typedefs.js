/**
 * Account type definitions
 */
/** @typedef {Object} AccountState
 * @property {Array.<Amount>} all
 * @property {Boolean} isFetching
 * @property {String} message
 */
/** @typedef {Object} Delegations
 * @property {String} delegator_address 
 * @property {String} shares 
 * @property {String} validator_address 
 */
/** @typedef {Object} Unbondings
 * @property {String} delegator_address 
 * @property {Array.<Entry>} entries 
 * @property {String} validator_address 
 */
/** @typedef {Object} Entry 
 * @property {String} balance 
 * @property {String} completion_time 
 * @property {String} creation_height 
 * @property {String} initial_balance 
 */
