import { numberIntlFormatter } from '@/utils';
import TransactionsFilter from './TransactionsFilter';

class TransactionsTableAdapter {
  constructor() {
    this.clear();
  }

  clear() {
    this.txs = null;
    this.multiTypes = null;
    this.filter = null;
  }

  setTxs(txs) {
    this.txs = txs;
    return this;
  }

  setMultiTypes(multiTypes) {
    this.multiTypes = multiTypes;
    return this;
  }

  setFilter(filter) {
    this.filter = filter;
    return this;
  }

  get() {
    const txs = TransactionsFilter.setTxs(this.txs)
      .setFilter(this.filter)
      .get();

    let transactionsTable = [];
    for (const tx of txs) {
      transactionsTable.push({
        height: tx.height,
        type: getType(tx.tx.value, this.multiTypes),
        result: tx.code ? 0 : 1,
        fee: formatFee(tx.tx.value.fee),
        hash: tx.txhash,
        date: new Date(tx.timestamp).toLocaleString(),
      });
    }

    this.clear();
    return transactionsTable;
  }
}

const getType = (txValue, multiTypes) =>
  txValue.msg.length > 1
    ? multiTypes
    : txValue.msg
        .find((msg) => typeof msg.type !== undefined)
        .type.split('/')
        .pop();

const formatFee = (fee) => {
  if (fee.amount.length > 1) {
    return 'Multi values';
  }
  let result = '';
  for (const item of fee.amount) {
    const amount = numberIntlFormatter.toDecimal({
      amount: item.amount,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    result = `${amount} ${item.denom}`;
  }
  return result;
};

export default new TransactionsTableAdapter();
