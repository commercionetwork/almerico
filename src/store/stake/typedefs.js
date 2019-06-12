/**
 * Stake type definitions
 */
/** @typedef {Object} StakeState
 * @property {Array.<Validator>} validators
 * @property {boolean} isFetching
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
 * @property {String} max_change_rate 
 * @property {String} max_rate 
 * @property {String} rate 
 * @property {String} update_time 
 */
/** @typedef {Object} Description
 * @property {String} details 
 * @property {String} identity 
 * @property {String} moniker 
 * @property {String} website 
 */
