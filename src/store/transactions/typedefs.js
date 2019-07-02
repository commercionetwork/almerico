/**
 * Transactions type definitions
 */
/** @typedef {Object} TransactionsState
 * @property {Array.<Transaction>} transactions
 * @property {Boolean} isFetching
 * @property {String} message
 */
/** @typedef {Object} Transaction
 * @property {String} gas_used 
 * @property {String} gas_wanted 
 * @property {String} height 
 * @property {Array.<Log>} logs 
 * @property {String} raw_log 
 * @property {Array.<Tag>} tags 
 * @property {String} timestamp 
 * @property {Tx} tx 
 * @property {String} txhash 
 */
/** @typedef {Object} Log 
 * @property {String} log 
 * @property {String} msg_index 
 * @property {Boolean} success 
 */
/** @typedef {Object} Tag
 * @property {String} key 
 * @property {String} value 
 */
/** @typedef {Object} Tx 
 * @property {String} type 
 * @property {Value} value 
 */
/** @typedef {Object} Value
 * @property {Fee} fee 
 * @property {String} memo 
 * @property {Array.<Msg>} msg 
 * @property {Array.<Signature>} signatures 
 */
/** @typedef {Object} Fee
 * @property {String} amount 
 * @property {String} gas 
 */
/** @typedef {Object} Msg
 * @property {String} type 
 * @property {(ValueCreateValidator|ValueEditValidator|ValueSend|ValueUndelegate|ValueUnjail)} value 
 */
/** @typedef {Object} ValueCreateValidator
 * @property {String} commission 
 * @property {String} delegator_address
 * @property {String} description
 * @property {String} min_self_delegation
 * @property {String} pubkey
 * @property {String} validator_address
 * @property {Amount} value
 */
/** @typedef {Object} ValueEditValidator
 * @property {String} address
 * @property {String} commission_rate
 * @property {String} min_self_delegation
 */
/** @typedef {Object} ValueSend
 * @property {Array.<Amount>} amount 
 * @property {String} from_address 
 * @property {String} to_address 
 */
/** @typedef {Object} ValueUndelegate
 * @property {Amount} amount
 * @property {String} delegator_address 
 * @property {String} validator_address 
 */
/** @typedef {Object} ValueUnjail
 * @property {String} address 
 */
/** @typedef {Object} Amount 
 * @property {String} amount 
 * @property {String} denom 
 */
/** @typedef {Object} Signature
 * @property {PubKey} pub_key 
 * @property {String} signature 
 */
/** @typedef {Object} PubKey
 * @property {String} type 
 * @property {String} value 
 */
