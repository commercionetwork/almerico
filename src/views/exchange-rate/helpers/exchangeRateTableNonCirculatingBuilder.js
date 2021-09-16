import { OVERVIEW } from '@/constants';
import { numberIntlFormatter } from '@/utils';
import exchangeRateTableBuilder from './exchangeRateTableBuilder';

const data = [];
/** Row
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

const exchangeRateTableNonCirculatingBuilder = {
  /**
   * @typedef {Object} ParamBuild
   * @property {Array.<Object>} abrTokens
   * @property {Array.<Object>} vbrTokens
   * @property {Array.<Object>} allTokens
   * @property {Array.<Object>} freezedTokens
   * @property {Number} totalSupply
   * @property {String} bondedTokens
   * @property {String} denom
   *
   * @param {ParamBuild} p
   * @returns {Promise}
   */
  build({
    abrTokens,
    vbrTokens,
    allTokens,
    freezedTokens,
    totalSupply,
    bondedTokens,
    denom,
  }) {
    const headers = exchangeRateTableBuilder.getHeaders({
      text: 'Non Circulating Supply',
      value: 'label',
      sortable: false,
      align: 'start',
    });
    const abrQuantity = exchangeRateTableBuilder.getTokensByDenom({
      balances: abrTokens,
      denom: denom,
    });
    const vbrQuantity = exchangeRateTableBuilder.getTokensByDenom({
      balances: vbrTokens,
      denom: denom,
    });
    const burnedQuantity =
      totalSupply -
      exchangeRateTableBuilder.getTokensByDenom({
        balances: allTokens,
        denom: denom,
      });
    const bondedQuantity = parseFloat(bondedTokens) / 1000000;
    const freezedQuantity = exchangeRateTableBuilder.getTokensByDenom({
      balances: freezedTokens,
      denom: denom,
    });
    const totalNonCirculatingSupply =
      abrQuantity +
      vbrQuantity +
      burnedQuantity +
      bondedQuantity +
      freezedQuantity;
    addTableRow({
      label: 'VBR Tokens Not Distributed',
      quantity: numberIntlFormatter.toDecimal({
        amount: vbrQuantity,
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }),
      percentage: numberIntlFormatter.toPercent({
        amount: vbrQuantity / totalNonCirculatingSupply,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }),
    });
    addTableRow({
      label: 'ABR Tokens Not Distributed',
      quantity: numberIntlFormatter.toDecimal({
        amount: abrQuantity,
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }),
      percentage: numberIntlFormatter.toPercent({
        amount: abrQuantity / totalNonCirculatingSupply,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }),
    });
    addTableRow({
      label: 'Burned',
      quantity: numberIntlFormatter.toDecimal({
        amount: burnedQuantity,
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }),
      percentage: numberIntlFormatter.toPercent({
        amount: burnedQuantity / totalNonCirculatingSupply,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }),
    });
    addTableRow({
      label: 'Bonded Tokens',
      quantity: numberIntlFormatter.toDecimal({
        amount: bondedQuantity,
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }),
      percentage: numberIntlFormatter.toPercent({
        amount: bondedQuantity / totalNonCirculatingSupply,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }),
    });
    addTableRow({
      label: 'Freezed Tokens',
      quantity: numberIntlFormatter.toDecimal({
        amount: freezedQuantity,
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }),
      percentage: numberIntlFormatter.toPercent({
        amount: freezedQuantity / totalNonCirculatingSupply,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }),
    });
    addTableRow({
      label: 'Unclaimed Rewards',
      quantity: 'Coming soon',
      percentage: '-',
      type: OVERVIEW.ROW_STYLE.COMING_SOON,
    });
    addTableRow({
      label: 'Total Non Circulating Supply',
      quantity: numberIntlFormatter.toDecimal({
        amount: totalNonCirculatingSupply,
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }),
      percentage: numberIntlFormatter.toPercent({
        amount: 1,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }),
      type: OVERVIEW.ROW_STYLE.HIGHLIGHTED,
    });

    return new Promise((resolve) =>
      resolve({
        tableData: data,
        headers,
        totalNonCirculatingSupply,
      }),
    );
  },
};

export default exchangeRateTableNonCirculatingBuilder;
