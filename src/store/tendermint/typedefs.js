/**
 * Tendermint type definitions
 */
/** @typedef {Object} TendermintState
 * @property {Array.<Block>} blocks
 * @property {Array.<Transaction>} transactions
 * @property {boolean} isFetching
 */
/** @typedef {Object} Block 
 * @property {Array.<String>} evidence 
 * @property {Header} header 
 * @property {Commit} last_commit 
 * @property {Array.<String>} txs 
 */
/** @typedef {Object} Header 
 * @property {String} app_hash 
 * @property {String} chain_id 
 * @property {String} consensus_hash 
 * @property {String} data_hash 
 * @property {String} evidence_hash 
 * @property {Number} height 
 * @property {BlockId} last_block_id 
 * @property {String} last_commit_hash 
 * @property {String} last_results_hash 
 * @property {String} next_validators_hash 
 * @property {Number} num_txs 
 * @property {String} proposer_address 
 * @property {String} time 
 * @property {Number} total_txs 
 * @property {String} validators_hash 
 * @property {Version} version 
 */
/** @typedef {Object} BlockId 
 * @property {String} hash 
 * @property {Parts} parts 
 */
/**  @typedef {Object} Parts 
 * @property {String} hash 
 * @property {Number} total 
 */
/** @typedef {Object} Version 
 * @property {Number} app 
 * @property {Number} block 
 */
/**  @typedef {Object} Commit 
 * @property {BlockId} block_id 
 * @property {Array.<PreCommit>} precommits 
 */
/**  @typedef {Object} PreCommit 
 * @property {BlockId} block_id 
 * @property {String} height 
 * @property {String} round 
 * @property {String} signature 
 * @property {String} timestamp 
 * @property {Number} type 
 * @property {String} validator_address 
 * @property {String} validator_index 
 */
/** @typedef {Object} Transaction 
 * @property {String} hash 
 * @property {Number} height 
 * @property {Result} result 
 * @property {Tx} tx 
 */
/** @typedef {Object} Result 
 * @property {String} gas_used 
 * @property {String} gas_wanted 
 * @property {String} log 
 * @property {Array.<Tag>} tags 
 */
/** @typedef {Object} Tag
 * @property {String} key 
 * @property {String} value 
 */
/** @typedef {Object} Tx
 * @property {Fee} fee 
 * @property {String} memo 
 * @property {Array.<String>} msg 
 * @property {Signature} signature 
 */
/** @typedef {Object} Fee
 * @property {Array.<Amount>} amount 
 * @property {String} gas 
 */
/** @typedef {Object} Amount
 * @property {String} amount 
 * @property {String} denom 
 */
/** @typedef {Object} Signature
 * @property {String} account_number 
 * @property {PubKey} pub_key 
 * @property {String} sequence 
 * @property {String} signature 
 */
/** @typedef {Object} PubKey 
 * @property {String} type 
 * @property {String} value 
 */
