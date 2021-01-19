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
    let details;

    switch (this.version) {
      case '':
        details = current();
        break;
      case '0.38':
        details = v038();
        break;
      default:
        details = null;
        break;
    }

    return details;
  }
}

const current = () => ({
  hash: this.tx.txhash,
  time: formatTimestamp(this.tx.timestamp),
  status: this.tx.code ? 0 : 1,
  fee: formatFee(this.tx.tx.value.fee.amount),
  gas: formatGas(),
  height: this.tx.height,
  type: txHandler.getType(this.tx.tx.value.msg),
  msgs: this.tx.tx.value.msg,
});

const v038 = () => ({
  hash: this.tx.txhash,
  time: formatTimestamp(this.tx.timestamp),
  status: this.tx.code ? 0 : 1,
  fee: formatFee(this.tx.tx.value.fee.amount),
  gas: formatGas(),
  height: this.tx.height,
  type: txHandler.getType(this.tx.tx.value.msg),
  msgs: this.tx.tx.value.msg,
});

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

const formatGas = () => `${this.tx.gas_used}/${this.tx.gas_wanted}`;

export default new TransactionDetailsAdapter();
