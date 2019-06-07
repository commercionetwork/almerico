/**
 * Blocks type definitions
 */
/** @typedef {Object} Block 
* @property {Array.<String>} evidence 
* @property {Header} header 
* @property {LastCommit} last_commit 
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
/**  @typedef {Object} LastCommit 
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