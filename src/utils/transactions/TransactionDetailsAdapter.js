import { numberIntlFormatter, txHandler } from '@/utils';

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
  let fee = '';
  let counter = 0;
  for (const item of amounts) {
    const amount = numberIntlFormatter.toDecimal({
      amount: item.amount,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    if (counter > 0) {
      fee += '\n';
    }
    fee += `${amount} ${item.denom}`;
    counter++;
  }
  return fee;
};

const formatGas = (tx) => `${tx.gas_used}/${tx.gas_wanted}`;

export default new TransactionDetailsAdapter();
