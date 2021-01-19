import { txHandler } from '@/utils';

class TransactionDetailsAdapter {
  constructor() {
    this.clear();
  }

  clear() {
    this.tx = null;
    this.version = null;
  }

  setTx(tx) {
    this.tx = tx;
    return this;
  }

  setVersion(version) {
    this.version = version;
    return this;
  }

  get() {
    let item;

    switch (this.version) {
      case '':
        item = current(this.tx);
        break;
      case '0.38':
        item = v038(this.tx);
        break;
      default:
        item = null;
        break;
    }

    this.clear();
    return item;
  }
}

function current(tx) {
  return {
    hash: tx.txhash,
    time: formatTimestamp(tx.timestamp),
    status: tx.code ? 0 : 1,
    fee: formatFee(tx.tx.value.fee.amount),
    gas: formatGas(tx),
    height: tx.height,
    type: txHandler.getType(tx.tx.value.msg),
    msgs: tx.tx.value.msg,
  };
}

function v038(tx) {
  return {
    hash: tx.txhash,
    time: formatTimestamp(tx.timestamp),
    status: tx.code ? 0 : 1,
    fee: formatFee(tx.tx.value.fee.amount),
    gas: formatGas(tx),
    height: tx.height,
    type: txHandler.getType(tx.tx.value.msg),
    msgs: tx.tx.value.msg,
  };
}

const formatTimestamp = (tms) => new Date(tms).toLocaleString();

const formatFee = (amounts) => {
  const total =
    amounts.reduce((acc, amount) => acc + parseFloat(amount.amount), 0) /
    1000000;
  return total !== 0
    ? new Intl.NumberFormat(undefined, {
        minimumFractionDigits: 6,
        maximumFractionDigits: 6,
      }).format(total) + ' Commercio'
    : '0';
};

const formatGas = (tx) => `${tx.gas_used}/${tx.gas_wanted}`;

export default new TransactionDetailsAdapter();
