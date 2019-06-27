/**
 * Tendermint type definitions
 */
/** @typedef {Object} TendermintState
 * @property {Array.<Transaction>} transactions
 * @property {Boolean} isFetching
 * @property {String} message
 */
/** @typedef {Object} Transaction 
 * @property {String} txhash 
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
