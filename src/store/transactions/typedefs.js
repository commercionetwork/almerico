/**
 * Transactions type definitions
 */
/** @typedef {Object} TransactionsState
 * @property {Array.<Transaction>} transactions
 * @property {Boolean} isFetching
 * @property {String} message
 */
/** @typedef {Object} Transaction
 * @property {Array.<TxEvent>} events 
 * @property {String} gas_used 
 * @property {String} gas_wanted 
 * @property {String} height 
 * @property {Array.<Log>} logs 
 * @property {String} raw_log 
 * @property {String} timestamp 
 * @property {Tx} tx 
 * @property {String} txhash 
 */
/** @typedef {Object} TxEvent
 * @property {Array.<Attribute>} attributes 
 * @property {String} type 
 */
/** @typedef {Object} Attribute
 * @property {String} key 
 * @property {String} value 
 */
/** @typedef {Object} Log 
 * @property {String} log 
 * @property {String} msg_index 
 * @property {Boolean} success 
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
 * @property {Array.<Amount>} amount 
 * @property {String} gas 
 */
/** @typedef {Object} Msg
 * @property {String} type 
 * @property {(
 * ValueCreateAccount|
 * ValueCreateConnection|
 * ValueCreateValidator|
 * ValueDelegate|
 * ValueEditValidator|
 * ValueRedelegate|
 * ValueSend|
 * ValueSetIdentity|
 * ValueShareDocument|
 * ValueStoreDocument|
 * ValueUnbonding|
 * ValueUnjail
 * )} value 
 */
/** @typedef {Object} ValueCreateAccount
 * @property {String} address 
 * @property {String} key_type 
 * @property {String} key_value 
 * @property {String} signer 
 */
/** @typedef {Object} ValueCreateConnection
 * @property {String} FirstUser 
 * @property {String} SecondUser 
 * @property {String} Signer 
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
/** @typedef {Object} ValueDelegate
 * @property {Amount} amount
 * @property {String} delegator_address 
 * @property {String} validator_address 
 */
/** @typedef {Object} ValueEditValidator
 * @property {String} address
 * @property {String} commission_rate
 * @property {String} min_self_delegation
 */
/** @typedef {Object} ValueRedelegate
 * @property {Amount} amount
 * @property {String} delegator_address 
 * @property {String} validator_dst_address
 * @property {String} validator_src_address
 */
/** @typedef {Object} ValueSend
 * @property {Array.<Amount>} amount 
 * @property {String} from_address 
 * @property {String} to_address 
 */
/** @typedef {Object} ValueSetIdentity
 * @property {String} ddo_reference 
 * @property {String} did 
 * @property {String} owner 
 */
/** @typedef {Object} ValueShareDocument 
 * @property {String} owner 
 * @property {String} receiver 
 * @property {String} reference 
 * @property {String} sender 
 */
/** @typedef {Object} ValueStoreDocument
 * @property {String} identity 
 * @property {String} metadata 
 * @property {String} owner 
 * @property {String} reference 
 */
/** @typedef {Object} ValueUnbonding
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
