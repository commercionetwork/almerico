import { OVERVIEW } from '@/constants';
import { numberIntlFormatter } from '@/utils';
import exchangeRateTableBuilder from './exchangeRateTableBuilder';

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

const exchangeRateTableCirculatingBuilder = {
  /**
   * @typedef {Object} ParamBuild
   * @property {Number} totalSupply
   * @property {Number} totalNonCirculatingSupply
   *
   * @param {ParamBuild} p
   * @returns {Promise}
   */
  build({ totalSupply, totalNonCirculatingSupply }) {
    const headers = exchangeRateTableBuilder.getHeaders({
      text: 'Circulating Supply',
      value: 'label',
      sortable: false,
      align: 'start',
    });
    const totalCirculatingSupply = totalSupply - totalNonCirculatingSupply;
    addTableRow({
      label: 'Max Supply',
      quantity: numberIntlFormatter.toDecimal({
        amount: totalSupply,
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }),
      percentage: numberIntlFormatter.toPercent({
        amount: 1,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }),
    });
    addTableRow({
      label: 'Total Non Circulating Supply',
      quantity: numberIntlFormatter.toDecimal({
        amount: totalNonCirculatingSupply,
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }),
      percentage: numberIntlFormatter.toPercent({
        amount: totalNonCirculatingSupply / totalSupply,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }),
    });
    addTableRow({
      label: 'Total Circulating Supply',
      quantity: numberIntlFormatter.toDecimal({
        amount: totalCirculatingSupply,
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }),
      percentage: numberIntlFormatter.toPercent({
        amount: totalCirculatingSupply / totalSupply,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }),
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

export default exchangeRateTableCirculatingBuilder;
