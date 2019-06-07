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
