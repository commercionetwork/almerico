import { OVERVIEW } from '@/constants';
import {
  getHeaders,
  getTokensByDenom,
  toDecimal,
  toPercent,
} from './ExchangeRateTableBuilder';

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

const ExchangeRateTableNonCirculatingBuilder = {
  /**
   * @typedef {Object} ParamBuild
   * @property {Array.<Object>} abrTokens
   * @property {Array.<Object>} vbrTokens
   * @property {Array.<Object>} allTokens
   * @property {Number} totalLiquidityPoolDistributed
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
    totalLiquidityPoolDistributed,
    totalSupply,
    bondedTokens,
    denom,
  }) {
    const headers = getHeaders({
      text: 'Non Circulating Supply',
      value: 'label',
      sortable: false,
      align: 'start',
    });
    const abrQuantity = getTokensByDenom({ balances: abrTokens, denom: denom });
    const vbrQuantity = getTokensByDenom({ balances: vbrTokens, denom: denom });
    const burnedQuantity =
      totalSupply - getTokensByDenom({ balances: allTokens, denom: denom });
    const bondedQuantity = parseFloat(bondedTokens) / 1000000;
    const totalNonCirculatingSupply =
      abrQuantity +
      vbrQuantity +
      burnedQuantity +
      bondedQuantity +
      totalLiquidityPoolDistributed;
    addTableRow({
      label: 'VBR Tokens Not Distributed',
      quantity: toDecimal(vbrQuantity),
      percentage: toPercent(vbrQuantity / totalNonCirculatingSupply),
    });
    addTableRow({
      label: 'ABR Tokens Not Distributed',
      quantity: toDecimal(abrQuantity),
      percentage: toPercent(abrQuantity / totalNonCirculatingSupply),
    });
    addTableRow({
      label: 'Burned',
      quantity: toDecimal(burnedQuantity),
      percentage: toPercent(burnedQuantity / totalNonCirculatingSupply),
    });
    addTableRow({
      label: 'Bonded Tokens',
      quantity: toDecimal(bondedQuantity),
      percentage: toPercent(bondedQuantity / totalNonCirculatingSupply),
    });
    addTableRow({
      label: 'Freezed Tokens',
      quantity: toDecimal(totalLiquidityPoolDistributed),
      percentage: toPercent(
        totalLiquidityPoolDistributed / totalNonCirculatingSupply,
      ),
    });
    addTableRow({
      label: 'Unclaimed Rewards',
      quantity: 'Coming soon',
      percentage: '-',
      type: OVERVIEW.ROW_STYLE.COMING_SOON,
    });
    addTableRow({
      label: 'Total Non Circulating Supply',
      quantity: toDecimal(totalNonCirculatingSupply),
      percentage: toPercent(1),
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

export default ExchangeRateTableNonCirculatingBuilder;
