import { EXCHANGE_RATE } from '@/constants';

/**
 *
 * @param {Array.<Object>} accounts
 * @param {String} denom
 * @param {String} name
 * @returns {Number}
 */
export const getTokensByAccount = ({ accounts, name, denom }) => {
  if (!accounts.length || !name || !denom) return 0;
  const index = accounts.findIndex((account) => account.name === name);
  if (index === -1) return 0;
  const tokens = getTokensByDenom(accounts[index]['balances'], denom);
  return tokens;
};

/**
 *
 * @param {Array.<Object>} Balances
 * @param {String} denom
 * @returns {Number}
 */
export const getTokensByDenom = (balances, denom) => {
  if (!balances.length) return 0;
  const balance = balances.find((balance) => balance.denom === denom);
  return parseFloat(balance.amount) / 1000000;
};

/**
 *
 * @param {Function} translator
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
