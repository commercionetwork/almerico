import { OVERVIEW } from '@/constants';
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
  { label, quantity, percentage, type = OVERVIEW.ROW_STYLE.REGULAR } = {
    type: OVERVIEW.ROW_STYLE.REGULAR,
  },
) => {
  data.push({ label, quantity, percentage, type });
};

const ExchangeRateTableCirculatingBuilder = {
  /**
   * @typedef {Object} ParamBuild
   * @property {Number} totalSupply
   * @property {Number} totalNonCirculatingSupply
   *
   * @param {ParamBuild} p
   * @returns {Promise}
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
      type: OVERVIEW.ROW_STYLE.HIGHLIGHTED,
    });
    return new Promise((resolve) =>
      resolve({
        tableData: data,
        headers,
        totalCirculatingSupply,
      }),
    );
  },
};

export default ExchangeRateTableCirculatingBuilder;
