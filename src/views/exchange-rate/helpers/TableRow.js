import { EXCHANGE_RATE } from '@/constants';

export default class TableRow {
  constructor({ label, quantity, percentage, type }) {
    /** @type {String} */
    this.label = label;
    /** @type {String} */
    this.quantity = quantity;
    /** @type {String} */
    this.percentage = percentage;
    /** @type {String} */
    this.type = type ? type : EXCHANGE_RATE.ROW_STYLE.REGULAR;
  }
}
