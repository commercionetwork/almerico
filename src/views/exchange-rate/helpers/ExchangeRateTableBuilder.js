import ExchangeRateTableCirculatingBuilder from './ExchangeRateTableCirculatingBuilder';
import ExchangeRateTableNonCirculatingBuilder from './ExchangeRateTableNonCirculatingBuilder';
import ExchangeRateTableTotalBuilder from './ExchangeRateTableTotalBuilder';

const ExchangeRateTableBuilder = {
  /**
   * @typedef {Object} ParamBuild
   * @property {Array.<Object>} accounts
   * @property {Array.<Object>} abrTokens
   * @property {Array.<Object>} allTokens
   * @property {Array.<Object>} vbrTokens
   * @property {String} bondedTokens
   * @property {String} denom
   *
   * @param {ParamBuild} p
   * @returns {Promise}
   */
  async build({
    accounts,
    abrTokens,
    allTokens,
    vbrTokens,
    bondedTokens,
    denom,
  }) {
    const totalData =
      (await ExchangeRateTableTotalBuilder.build({
        accounts,
        abrTokens,
        vbrTokens,
        denom,
      })) || [];
    const totalLiquidityPoolDistributed =
      totalData.liquidityPoolDistributed || 0;
    const totalSupply = totalData.totalSupply || 0;
    const nonCirculatingData =
      (await ExchangeRateTableNonCirculatingBuilder.build({
        abrTokens,
        vbrTokens,
        allTokens,
        totalLiquidityPoolDistributed,
        totalSupply,
        bondedTokens,
        denom,
      })) || [];
    const totalNonCirculatingSupply =
      nonCirculatingData.totalNonCirculatingSupply || 0;
    const circulatingData =
      (await ExchangeRateTableCirculatingBuilder.build({
        totalSupply,
        totalNonCirculatingSupply,
      })) || [];
    const exchangeRate = this.getExchangeRate(
      circulatingData.totalCirculatingSupply,
      totalSupply,
    );
    return {
      totalData: totalData.tableData,
      totalHeaders: totalData.headers,
      nonCirculatingData: nonCirculatingData.tableData,
      nonCirculatingHeaders: nonCirculatingData.headers,
      circulatingData: circulatingData.tableData,
      circulatingHeaders: circulatingData.headers,
      exchangeRate,
    };
  },
  /**
   * @param {Number} totalCirculatingSupply
   * @param {Number} totalSupply
   * @returns {String}
   */
  getExchangeRate(totalCirculatingSupply, totalSupply) {
    if (totalCirculatingSupply === 0 || totalSupply === 0) return 0;
    const rate = 1 / (totalCirculatingSupply / totalSupply);
    return toDecimal(rate, 2, 2);
  },
};

export default ExchangeRateTableBuilder;

/**
 * @typedef {Object} Header
 * @property {String} text
 * @property {String} value
 * @property {Boolean} sortable
 * @property {String} align
 *
 * @param {Header} header
 * @returns {Array.<Object>}
 */
export const getHeaders = (header) => [
  header,
  {
    text: 'Quantity',
    value: 'quantity',
    sortable: false,
    align: 'end',
  },
  {
    text: 'Percentage',
    value: 'percentage',
    sortable: false,
    align: 'end',
  },
];

/**
 * @typedef {Object} ParamGetTokensByDenom
 * @property {Array.<Object>} Balances
 * @property {String} denom
 *
 * @param {ParamGetTokensByDenom} p
 * @returns {Number}
 */
export const getTokensByDenom = ({ balances, denom }) => {
  if (balances.length < 1) return 0;
  const balance = balances.find((balance) => balance.denom === denom);
  return parseFloat(balance.amount) / 1000000;
};

/**
 * @param {Number} amount
 * @param {Number} maximumFractionDigits
 * @param {Number} minimumFractionDigits
 * @returns {String}
 */
export const toDecimal = (
  amount,
  maximumFractionDigits = 0,
  minimumFractionDigits = 0,
) => {
  return new Intl.NumberFormat(undefined, {
    style: 'decimal',
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(amount);
};

/**
 * @param {Number} amount
 * @param {Number} maximumFractionDigits
 * @param {Number} minimumFractionDigits
 * @returns {String}
 */
export const toPercent = (
  amount,
  maximumFractionDigits = 2,
  minimumFractionDigits = 2,
) => {
  return new Intl.NumberFormat(undefined, {
    style: 'percent',
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(amount);
};
