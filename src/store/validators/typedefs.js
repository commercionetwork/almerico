/**
 * Validators type definitions
 */
/** @typedef {Object} ValidatorsState
 * @property {Array.<Validator>} all
 * @property {Boolean} isFetching
 * @property {String} message
 */
/** @typedef {Object} Validator 
 * @property {String} bond_height 
 * @property {Number} bond_intra_tx_counter 
 * @property {Commission} commission 
 * @property {String} consensus_pubkey 
 * @property {String} delegator_shares 
 * @property {Description} description 
 * @property {Boolean} jailed 
 * @property {String} operator_address 
 * @property {Number} status 
 * @property {String} tokens 
 * @property {String} unbonding_height 
 * @property {String} unbonding_time 
 */
/** @typedef {Object} Commission
 * @property {CommissionRates} commission_rates
 * @property {String} update_time
 * /
/** @typedef {Object} CommissionRates
 * @property {String} max_change_rate 
 * @property {String} max_rate 
 * @property {String} rate 
 */
/** @typedef {Object} Description
 * @property {String} details 
 * @property {String} identity 
 * @property {String} moniker 
 * @property {String} website 
 */
