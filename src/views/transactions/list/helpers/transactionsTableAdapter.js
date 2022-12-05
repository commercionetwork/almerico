import { coinAdapter, dateHandler, txHandler, txsFilter } from '@/utils';
import { uniqBy } from 'lodash';

const transactionsTableAdapter = {
  /**
   *
   * @param {Array.<Object>} txs
   * @param {Object} labels
   * @param {String} type
   * @returns {Array.<Object>}
   */
  build({ txs, labels, type }) {
    const uniqTxs = uniqBy(txs, 'txhash');
    const filteredTxs = txsFilter.filter(uniqTxs, type);
    return filteredTxs.map((tx) => getRow(tx, labels));
  },
};

export default transactionsTableAdapter;

const getRow = (tx, labels) => {
  const type = txHandler.getType_current(
    tx.tx.body.messages,
    labels.multiTypes
  );
  const result = tx.code === 0 ? 1 : 0;
  const fee = getFee(tx, labels);
  const msgs = tx.tx.body.messages.length;
  const time = getTime(tx);

  return {
    height: tx.height,
    type,
    result,
    fee,
    msgs,
    hash: tx.txhash,
    date: tx.timestamp,
    time,
  };
};

const getFee = (tx, labels) => {
  const fee = tx.tx.auth_info.fee;
  if (fee.amount.length > 1) {
    return labels.multiValues;
  }
  return coinAdapter.format({
    amount: fee.amount[0] ? fee.amount[0].amount : '0',
    denom: fee.amount[0] ? fee.amount[0].denom : '',
  });
};

const getTime = (tx) =>
  dateHandler.getFormattedDifference(new Date(tx.timestamp), new Date());
