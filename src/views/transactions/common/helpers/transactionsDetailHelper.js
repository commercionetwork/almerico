import { CONFIG } from '@/constants';
import { coinAdapter, txHandler } from '@/utils';

/**
 *
 * @typedef {Object} TxDetail
 * @property {String} hash
 * @property {String} time
 * @property {Object} status
 * @property {String} rawLog
 * @property {String} fee
 * @property {String} gas
 * @property {String} height
 * @property {String} type
 * @property {Array.<Object>} msgs
 * @property {String} ledger
 * @property {String} version
 *
 * @param {Object} detail
 * @param {Object} detail
 * @returns {TxDetail}
 */
const transactionsDetailHelper = {
  build({ detail, labels }) {
    const converter = new Converter({ detail, labels });
    return converter.data;
  },
};

export default transactionsDetailHelper;

class Converter {
  constructor({ detail, labels }) {
    this.detail = detail;
    this.labels = labels;
  }

  get data() {
    switch (this.detail.version) {
      case '':
        return _getCurrent({ detail: this.detail, labels: this.labels });
      case CONFIG.LEGACY_VERSIONS.V_038:
        return _getV038({ detail: this.detail, labels: this.labels });
      default:
        return null;
    }
  }
}

const _getCurrent = ({ detail, labels }) => {
  const data = detail.data.tx_response;
  return {
    hash: data.txhash,
    time: _getTime(data.timestamp),
    status:
      data.code === 0
        ? { label: labels.success, code: 1 }
        : { label: labels.failed, code: 0 },
    rawLog: data.raw_log,
    fee: _getFee(data.tx.auth_info.fee.amount),
    gas: _getGas(data.gas_used, data.gas_wanted),
    height: data.height,
    type: txHandler.getType_current(data.tx.body.messages, labels.multiTypes),
    msgs: data.tx.body.messages,
    ledger: detail.ledger,
    version: detail.version,
  };
};

const _getV038 = ({ detail, labels }) => {
  const data = detail.data;
  return {
    hash: data.txhash,
    time: _getTime(data.timestamp),
    status: data.code
      ? { label: labels.failed, code: 0 }
      : { label: labels.success, code: 1 },
    rawLog: data.raw_log,
    fee: _getFee(data.tx.value.fee.amount),
    gas: _getGas(data.gas_used, data.gas_wanted),
    height: data.height,
    type: txHandler.getType_v038(data.tx.value.msg),
    msgs: data.tx.value.msg.map((msg) =>
      Object.assign({}, { type: msg.type }, { ...msg.value }),
    ),
    ledger: detail.ledger,
    version: detail.version,
  };
};

const _getTime = (timestamp) => new Date(timestamp).toLocaleString();

const _getFee = (items) => {
  let fee = '';
  let counter = 0;
  for (const item of items) {
    if (counter > 0) {
      fee += '\n';
    }
    fee += coinAdapter.format({ amount: item.amount, denom: item.denom });
    counter++;
  }
  return fee;
};

const _getGas = (used, wanted) => `${used}/${wanted}`;
