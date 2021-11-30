import { EXCHANGE_RATE } from '@/constants';

/**
 *
 * @property {Array.<Object>} accounts
 * @property {String} name
 * @property {String} denom
 * @returns {Number}
 */
export const getTokensByAccount = ({ accounts, name, denom }) => {
  if (!accounts.length || !name || !denom) return 0;
  const account = accounts.find((account) => account.name === name);
  const tokens = getTokensByDenom(account.balances, denom);
  return tokens;
};

/**
 *
 * @property {Array.<Object>} Balances
 * @property {String} denom
 * @returns {Number}
 */
export const getTokensByDenom = (balances, denom) => {
  if (!balances.length) return 0;
  const balance = balances.find((balance) => balance.denom === denom);
  return parseFloat(balance.amount) / 1000000;
};

/**
 *
 * @property {String} text
 * @property {String} value
 * @property {Boolean} sortable
 * @property {String} align
 * @returns {Array.<Object>}
 */
export const getCommonHeaders = (translator) => {
  const $t = translator;
  return [
    new Header({
      text: $t('labels.quantity'),
      value: 'quantity',
      sortable: false,
      align: 'end',
    }),
    new Header({
      text: $t('labels.percentage'),
      value: 'percentage',
      sortable: false,
      align: 'end',
    }),
  ];
};

export class Table {
  /**
   *
   * @param {Array.<Header>} headers
   * @param {Array.<Row>} rows
   * @param {Number} total
   */
  constructor({ headers, rows, total }) {
    this.headers = headers;
    this.rows = rows;
    this.total = total;
  }
}

export class Header {
  constructor({ text, value, sortable, align }) {
    this.text = text;
    this.value = value;
    this.sortable = sortable;
    this.align = align;
  }
}

export class Row {
  constructor({ rank, label, value, total, style }) {
    this.rank = rank;
    this.label = label;
    this.value = value;
    this.total = total;
    this.style = style || EXCHANGE_RATE.ROW_STYLE.REGULAR;
  }

  get quantity() {
    if (isNaN(this.value)) return this.value;
    return new Intl.NumberFormat(undefined, {
      style: 'decimal',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(this.value);
  }

  get percentage() {
    if (isNaN(this.value)) return this.value;
    return new Intl.NumberFormat(undefined, {
      style: 'percent',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(this.value / this.total);
  }
}
