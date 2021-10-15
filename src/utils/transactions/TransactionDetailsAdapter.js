import { coinAdapter, txHandler } from '@/utils';

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

    // switch (this.details.version) {
    //   case '':
    //     item = current(this.details);
    //     break;
    //   case '0.38':
    //     item = v038(this.details);
    //     break;
    //   default:
    //     break;
    // }

    // this.clear();
    return current(this.details);
  }
}

const current = (details) => ({
  hash: details.data.tx_response.txhash,
  time: formatTimestamp(details.data.tx_response.timestamp),
  status: details.data.tx_response.code ? 0 : 1,
  rawLog: details.data.tx_response.raw_log,
  fee: formatFee(details.data.tx_response.tx.auth_info.fee.amount),
  gas: formatGas(details.data.tx_response),
  height: details.data.tx_response.height,
  type: txHandler.getTypeNew(details.data.tx.body.messages),
  msgs: details.data.tx.body.messages,
  ledger: details.ledger,
  version: details.version,
});

// const current = (details) => ({
//   hash: details.data.txhash,
//   time: formatTimestamp(details.data.timestamp),
//   status: details.data.code ? 0 : 1,
//   rawLog: details.data.raw_log,
//   fee: formatFee(details.data.tx.value.fee.amount),
//   gas: formatGas(details.data),
//   height: details.data.height,
//   type: txHandler.getType(details.data.tx.value.msg),
//   msgs: details.data.tx.value.msg,
//   ledger: details.ledger,
//   version: details.version,
// });

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
    if (counter > 0) {
      fee += '\n';
    }
    fee += coinAdapter.format({ amount: item.amount, denom: item.denom });
    counter++;
  }
  return fee;
};

const formatGas = (tx) => `${tx.gas_used}/${tx.gas_wanted}`;

export default new TransactionDetailsAdapter();
