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
 * @typedef {Object} Block
 * @property {Header} header
 * @property {Array.<string>} txs
 * @property {Array.<string>} evidence 
 * @property {LastCommit} last_commit 
 */
/** 
 * @typedef {Object} Header * 
 * @property {String} chain_id 
 * @property {Number} height 
 * @property {String} time 
 * @property {Number} num_txs 
 * @property {BlockId} last_block_id 
 * @property {Number} total_txs 
 * @property {String} last_commit_hash 
 * @property {String} data_hash 
 * @property {String} validators_hash 
 * @property {String} next_validators_hash 
 * @property {String} consensus_hash  * 
 * @property {String} app_hash 
 * @property {String} last_results_hash  * 
 * @property {String} evidence_hash 
 * @property {String} proposer_address 
 * @property {Version} version 
 */
/** 
 * @typedef {Object} Version 
 * @property {Number} app 
 * @property {Number} block 
 */
/** 
 * @typedef {Object} BlockId 
 * @property {String} hash 
 * @property {Parts} parts 
 */
/** 
 * @typedef {Object} Parts 
 * @property {String} hash 
 * @property {Number} total 
 */
/** 
 * @typedef {Object} LastCommit 
 * @property {BlockId} block_id 
 * @property {Array.<PreCommit>} precommits 
 */
/** 
 * @typedef {Object} PreCommit 
 * @property {BlockId} block_id 
 * @property {String} height 
 * @property {String} round 
 * @property {String} signature 
 * @property {String} timestamp 
 * @property {Number} type 
 * @property {String} validator_address 
 * @property {String} validator_index 
 */
/** 
 * @typedef {Object} Tx
 * @property {Fee} fee 
 * @property {String} memo 
 * @property {Array} msg 
 * @property {Signature} signature 
 */
/** 
 * @typedef {Object} Fee
 * @property {Array.<Amount>} amount 
 * @property {String} gas 
 */
/** 
 * @typedef {Object} Amount
 * @property {String} amount 
 * @property {String} denom 
 */
/** 
 * @typedef {Object} Signature
 * @property {String} account_number 
 * @property {PubKey} pub_key 
 * @property {String} sequence 
 * @property {String} signature 
 */
/** 
 * @typedef {Object} PubKey 
 * @property {String} type 
 * @property {String} value 
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
