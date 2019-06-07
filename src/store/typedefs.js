/**
 * Common type definitions
 */
/** 
 * @typedef {Object} Node 
 * @property {String} channels 
 * @property {String} id 
 * @property {String} listen_addr 
 * @property {String} moniker 
 * @property {String} network 
 * @property {Other} other 
 * @property {ProtocolVersion} protocol_version 
 * @property {String} version 
 */
/** 
 * @typedef {Object} Other 
 * @property {String} rpc_address 
 * @property {String} tx_index 
 */
/** 
 * @typedef {Object} ProtocolVersion 
 * @property {Number} app 
 * @property {Number} block 
 * @property {Number} p2p 
 */


/** 
 * @typedef {Object} Validator 
 * @property {String} bond_height 
 * @property {Number} bond_intra_tx_counter 
 * @property {Commission} commission 
 * @property {String} consensus_pubkey 
 * @property {String} delegator_shares 
 * @property {Object} description 
 * @property {Boolean} jailed 
 * @property {String} operator_address 
 * @property {Number} status 
 * @property {String} tokens 
 * @property {String} unbonding_height 
 * @property {String} unbonding_time 
 */
/** 
 * @typedef {Object} Commission 
 * @property {String} max_change_rate 
 * @property {String} max_rate 
 * @property {String} rate 
 * @property {String} update_time 
 */
/** 
 * @typedef {Object} Description
 * @property {String} details 
 * @property {String} identity 
 * @property {String} moniker 
 * @property {String} website 
 */
/** 
 * @typedef {Object} proposal
 * @property {String} description 
 * @property {Object} final_tally_result 
 * @property {Number} proposal_id 
 * @property {String} proposal_status 
 * @property {String} proposal_type 
 * @property {String} submit_time 
 * @property {String} title 
 * @property {Array} total_deposit 
 * @property {String} voting_start_time 
 */
