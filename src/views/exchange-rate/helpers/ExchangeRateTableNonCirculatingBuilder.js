import {
  getTokensByDenom,
  toDecimal,
  toPercent,
} from './ExchangeRateTableBuilder';

const FREEZED_TOKENS = 10001;
const UNCLAIMED_REWARDS = 0;

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

const ExchangeRateTableNonCirculatingBuilder = {
  /**
   * @param {Array.<Object>} abrTokens
   * @param {Array.<Object>} vbrTokens
   * @param
   * @param
   * @param
   * @param {String} denom
   * @returns {Promise}
   */
  build({ abrTokens, vbrTokens, allTokens, totalSupply, bondedTokens, denom }) {
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
      FREEZED_TOKENS +
      UNCLAIMED_REWARDS;
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
      quantity: toDecimal(FREEZED_TOKENS),
      percentage: toPercent(FREEZED_TOKENS / totalNonCirculatingSupply),
    });
    addTableRow({
      label: 'Unclaimed Rewards',
      quantity: toDecimal(UNCLAIMED_REWARDS),
      percentage: toPercent(UNCLAIMED_REWARDS / totalNonCirculatingSupply),
    });
    addTableRow({
      label: 'Total Non Circulating Supply',
      quantity: toDecimal(totalNonCirculatingSupply),
      percentage: toPercent(1),
    });

    return new Promise((resolve) =>
      resolve({
        tableData: data,
        totalNonCirculatingSupply: totalNonCirculatingSupply,
      }),
    );
  },
};

export default ExchangeRateTableNonCirculatingBuilder;
