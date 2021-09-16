import { OVERVIEW } from '@/constants';
import { numberIntlFormatter } from '@/utils';
import exchangeRateOverviewBuilder from '../exchangeRateOverviewBuilder';
import TableRow from '../TableRow';

const circulatingTableBuilder = {
  /**
   * @typedef {Object} ParamBuild
   * @property {Number} maxSupply
   * @property {Number} totalNonCirculatingSupply
   *
   * @param {ParamBuild} p
   * @returns {Promise}
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
        quantity: numberIntlFormatter.toDecimal({
          amount: maxSupply,
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }),
        percentage: numberIntlFormatter.toPercent({
          amount: 1,
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }),
      }),
    );
    data.push(
      new TableRow({
        label: 'Total Non Circulating Supply',
        quantity: numberIntlFormatter.toDecimal({
          amount: totalNonCirculatingSupply,
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }),
        percentage: numberIntlFormatter.toPercent({
          amount: totalNonCirculatingSupply / maxSupply,
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }),
      }),
    );
    data.push(
      new TableRow({
        label: 'Total Circulating Supply',
        quantity: numberIntlFormatter.toDecimal({
          amount: totalCirculatingSupply,
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }),
        percentage: numberIntlFormatter.toPercent({
          amount: totalCirculatingSupply / maxSupply,
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }),
        type: OVERVIEW.ROW_STYLE.HIGHLIGHTED,
      }),
    );
    return new Promise((resolve) =>
      resolve({
        tableData: data,
        headers,
        totalCirculatingSupply,
      }),
    );
  },
};

export default circulatingTableBuilder;
