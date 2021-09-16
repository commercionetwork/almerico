import { OVERVIEW } from '@/constants';

export default class TableRow {
  /**
   * @typedef {Object} TableRow
   * @property {String} label
   * @property {String} quantity
   * @property {String} percentage
   * @property {String} type
   *
   * @param {TableRow}
   */
  constructor({ label, quantity, percentage, type }) {
    this.label = label;
    this.quantity = quantity;
    this.percentage = percentage;
    this.type = type ? type : OVERVIEW.ROW_STYLE.REGULAR;
  }
}
