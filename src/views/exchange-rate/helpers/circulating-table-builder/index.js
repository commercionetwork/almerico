import { EXCHANGE_RATE } from '@/constants';
import exchangeRateOverviewBuilder from '../exchangeRateOverviewBuilder';
import TableRow from '../TableRow';

export default {
  /**
   * @typedef {Object} ParamBuild
   * @property {Number} maxSupply
   * @property {Number} totalNonCirculatingSupply
   *
   * @param {ParamBuild} p
   * @returns {Object}
   */
  build({ maxSupply, totalNonCirculatingSupply }) {
    const data = [];
    const headers = exchangeRateOverviewBuilder.getHeaders({
      text: 'Circulating Supply',
      value: 'label',
      sortable: false,
      align: 'start',
    });
    const totalCirculatingSupply = maxSupply - totalNonCirculatingSupply;
    data.push(
      new TableRow({
        label: 'Max Supply',
        quantity: new Intl.NumberFormat(undefined, {
          style: 'decimal',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(maxSupply),
        percentage: new Intl.NumberFormat(undefined, {
          style: 'percent',
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(1),
      }),
    );
    data.push(
      new TableRow({
        label: 'Total Non Circulating Supply',
        quantity: new Intl.NumberFormat(undefined, {
          style: 'decimal',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(totalNonCirculatingSupply),
        percentage: new Intl.NumberFormat(undefined, {
          style: 'percent',
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(totalNonCirculatingSupply / maxSupply),
      }),
    );
    data.push(
      new TableRow({
        label: 'Total Circulating Supply',
        quantity: new Intl.NumberFormat(undefined, {
          style: 'decimal',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(totalCirculatingSupply),
        percentage: new Intl.NumberFormat(undefined, {
          style: 'percent',
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(totalCirculatingSupply / maxSupply),
        type: EXCHANGE_RATE.ROW_STYLE.HIGHLIGHTED,
      }),
    );
    return {
      tableData: data,
      headers,
      totalCirculatingSupply,
    };
  },
};
