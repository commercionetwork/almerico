import { EXCHANGE_RATE } from '@/constants';
import { getHeaders, toDecimal, toPercent } from './ExchangeRateTableBuilder';

const data = [];
/**
 * @typedef {Object} TableRow
 * @property {String} label
 * @property {String} quantity
 * @property {String} percentage
 * @property {String} type
 *
 * @param {TableRow}
 */
const addTableRow = (
  { label, quantity, percentage, type = EXCHANGE_RATE.ROW_STYLE.REGULAR } = {
    type: EXCHANGE_RATE.ROW_STYLE.REGULAR,
  },
) => {
  data.push({ label, quantity, percentage, type });
};

export default {
  /**
   * @typedef {Object} ParamBuild
   * @property {Number} totalSupply
   * @property {Number} totalNonCirculatingSupply
   *
   * @param {ParamBuild} p
   * @returns {Object}
   */
  build({ totalSupply, totalNonCirculatingSupply }) {
    const headers = getHeaders({
      text: 'Circulating Supply',
      value: 'label',
      sortable: false,
      align: 'start',
    });
    const totalCirculatingSupply = totalSupply - totalNonCirculatingSupply;
    addTableRow({
      label: 'Max Supply',
      quantity: toDecimal(totalSupply),
      percentage: toPercent(1),
    });
    addTableRow({
      label: 'Total Non Circulating Supply',
      quantity: toDecimal(totalNonCirculatingSupply),
      percentage: toPercent(totalNonCirculatingSupply / totalSupply),
    });
    addTableRow({
      label: 'Total Circulating Supply',
      quantity: toDecimal(totalCirculatingSupply),
      percentage: toPercent(totalCirculatingSupply / totalSupply),
      type: EXCHANGE_RATE.ROW_STYLE.HIGHLIGHTED,
    });

    return {
      tableData: data,
      headers,
      totalCirculatingSupply,
    };
  },
};
