import { txHandler } from '@/utils';

class TransactionDetailsAdapter {
  constructor() {
    this.clear();
  }

  clear() {
    this.details = null;
  }

  setDetails(details) {
    this.details = details;
    return this;
  }

  get() {
    let item;

    switch (this.details.version) {
      case '':
        item = current(this.details);
        break;
      case '0.38':
        item = v038(this.details);
        break;
      default:
        break;
    }

    this.clear();
    return item;
  }
}

const current = (details) => ({
  hash: details.data.txhash,
  time: formatTimestamp(details.data.timestamp),
  status: details.data.code ? 0 : 1,
  rawLog: details.data.raw_log,
  fee: formatFee(details.data.tx.value.fee.amount),
  gas: formatGas(details.data),
  height: details.data.height,
  type: txHandler.getType(details.data.tx.value.msg),
  msgs: details.data.tx.value.msg,
  ledger: details.ledger,
  version: details.version,
});

const v038 = (details) => ({
  hash: details.data.txhash,
  time: formatTimestamp(details.data.timestamp),
  status: details.data.code ? 0 : 1,
  rawLog: details.data.raw_log,
  fee: formatFee(details.data.tx.value.fee.amount),
  gas: formatGas(details.data),
  height: details.data.height,
  type: txHandler.getType(details.data.tx.value.msg),
  msgs: details.data.tx.value.msg,
  ledger: details.ledger,
  version: details.version,
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

const formatGas = (tx) => `${tx.gas_used}/${tx.gas_wanted}`;

export default new TransactionDetailsAdapter();
