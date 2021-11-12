import { coinAdapter, dateHandler } from '@/utils';
import txsFilter from './txsFilter';
import txHandler from './txHandler';
import { uniqBy } from 'lodash';

const txsTableAdapter = {
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
    return filteredTxs.map((tx) => {
      const row = new Row(tx, labels);
      return row.data;
    });
  },
};

export default txsTableAdapter;

class Row {
  constructor(tx, labels) {
    this.tx = tx;
    this.labels = labels;
  }

  get data() {
    return {
      height: this.height,
      type: this.type,
      msgs: this.msgs,
      result: this.result,
      fee: this.fee,
      hash: this.hash,
      date: this.date,
      time: this.time,
    };
  }

  get height() {
    return this.tx.height;
  }

  get type() {
    return txHandler.getType_current(
      this.tx.tx.body.messages,
      this.labels.multiTypes,
    );
  }

  get msgsNumber() {
    return this.tx.tx.body.messages.length;
  }

  get result() {
    return this.tx.code === 0 ? 1 : 0;
  }

  get fee() {
    const fee = this.tx.tx.auth_info.fee;
    if (fee.amount.length > 1) {
      return this.labels.multiValues;
    }
    return coinAdapter.format({
      amount: fee.amount[0] ? fee.amount[0].amount : '0',
      denom: fee.amount[0] ? fee.amount[0].denom : '',
    });
  }

  get hash() {
    return this.tx.txhash;
  }

  get date() {
    return new Date(this.tx.timestamp).toLocaleString();
  }

  get time() {
    return dateHandler.getFormattedDifference(
      new Date(this.tx.timestamp),
      new Date(),
    );
  }
}
