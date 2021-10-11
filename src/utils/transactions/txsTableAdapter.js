import { coinAdapter, dateHandler } from '@/utils';
import transactionsFilter from './txsFilter';

const transactionsTableAdapter = {
  /**
   *
   * @param {Array.<Object>} txs
   * @param {String} filter
   * @returns {Array.<Object>}
   */
  build(txs, filter) {
    const filteredTxs = transactionsFilter.filter(txs, filter);
    return _getTableRows(filteredTxs);
  },
};

export default transactionsTableAdapter;

const _getTableRows = (txs) => {
  return txs.map((tx) => {
    return {
      height: tx.height,
      type: _getType(tx.tx.value),
      msgs: _getMsgsNumber(tx.tx.value.msg),
      result: tx.code ? 0 : 1,
      fee: _formatFee(tx.tx.value.fee),
      hash: tx.txhash,
      date: _formatDate(tx.timestamp),
      time: _getTime(tx.timestamp),
    };
  });
};

const _getType = (txValue) =>
  txValue.msg.length > 1
    ? 'Multi types'
    : txValue.msg
        .find((msg) => typeof msg.type !== undefined)
        .type.split('/')
        .pop();

const _getMsgsNumber = (msgs) => msgs.length;

const _formatFee = (fee) => {
  if (fee.amount.length > 1) {
    return 'Multi values';
  }
  return coinAdapter.format({
    amount: fee.amount[0] ? fee.amount[0].amount : '0',
    denom: fee.amount[0] ? fee.amount[0].denom : '',
  });
};

const _formatDate = (timestamp) => new Date(timestamp).toLocaleString();

const _getTime = (timestamp) =>
  dateHandler.getFormattedDifference(new Date(timestamp), new Date());
