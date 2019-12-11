/**
 * Tendermint type definitions
 */
/** @typedef {Object} TendermintState
 * @property {Genesis} genesis
 * @property {Boolean} isFetching
 * @property {String} message
 */
/** @typedef {Object} Genesis
* @property {String} app_hash 
* @property {AppState} app_state 
* @property {String} chain_id 
* @property {Object} consensus_params 
* @property {String} genesis_time 
*/
/** @typedef {Object} AppState
* @property {Array.<GenesisAccount>} accounts 
* @property {Object} auth 
* @property {Object} bank 
* @property {Object} commerciodocs 
* @property {Object} commercioid 
* @property {Object} crisis 
* @property {Object} distribution 
* @property {Object} genutil 
* @property {Object} gov 
* @property {Object} mint 
* @property {Null} params 
* @property {Object} slashing 
* @property {Object} staking 
* @property {Object} supply 
*/
/** @typedef {Object} GenesisAccount
* @property {String} account_number 
* @property {String} address 
* @property {Array} coins 
* @property {Array} delegated_free 
* @property {Array} delegated_vesting 
* @property {String} end_time 
* @property {String} module_name 
* @property {Array} module_permissions 
* @property {Array} original_vesting 
* @property {String} sequence_number 
* @property {String} start_time 
*/