import { getHeaders, toDecimal, toPercent } from './ExchangeRateTableBuilder';

const data = [];
/** Row
 * @typedef {Object} TableRow
 * @property {String} type
 * @property {String} quantity
 * @property {String} percentage
 *
 * @param {TableRow}
 */
const addTableRow = ({ label, quantity, percentage }) => {
  data.push({ label, quantity, percentage });
};

const ExchangeRateTableCirculatingBuilder = {
  /**
   *
   * @param {*} param0
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
      label: 'Supply (total)',
      quantity: toDecimal(totalSupply),
      percentage: toPercent(1),
    });
    addTableRow({
      label: 'Non Circulating Supply (total)',
      quantity: toDecimal(totalNonCirculatingSupply),
      percentage: toPercent(totalNonCirculatingSupply / totalSupply),
    });
    addTableRow({
      label: 'Total Circulating Supply',
      quantity: toDecimal(totalCirculatingSupply),
      percentage: toPercent(totalCirculatingSupply / totalSupply),
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
