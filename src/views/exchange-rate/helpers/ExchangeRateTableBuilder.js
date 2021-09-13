import ExchangeRateTableNonCirculatingBuilder from './ExchangeRateTableNonCirculatingBuilder';
import ExchangeRateTableTotalBuilder from './ExchangeRateTableTotalBuilder';

const ExchangeRateTableBuilder = {
  /**
   *
   * @param {*} param0
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
    const totalData = await ExchangeRateTableTotalBuilder.build({
      accounts,
      abrTokens,
      vbrTokens,
      denom,
    });
    const totalSupply = totalData.totalSupply;
    const nonCirculatingData = await ExchangeRateTableNonCirculatingBuilder.build(
      {
        abrTokens,
        vbrTokens,
        allTokens,
        totalSupply,
        bondedTokens,
        denom,
      },
    );
    const totalNonCirculatingSupply =
      nonCirculatingData.totalNonCirculatingSupply;

    //FIXME: update params
    const exchangeRate = getExchangeRate(1, 1);
    return {
      totalData: totalData.tableData,
      nonCirculatingData: nonCirculatingData.tableData,
      circulatingData: {}, // circulatingData.tableData,
      exchangeRate,
    };
  },
};

export default ExchangeRateTableBuilder;

/**
 *
 * @param {Number} totalCirculating
 * @param {Number} total
 * @returns {Number}
 */
const getExchangeRate = (totalCirculating, total) =>
  1 / (totalCirculating / total);

/**
 * @param {Array.<Object>} Balances
 * @param {String} denom
 * @returns {Number}
 */
export const getTokensByDenom = ({ balances, denom }) => {
  if (balances.length < 1) return 0;
  const balance = balances.find((balance) => balance.denom === denom);
  return parseFloat(balance.amount) / 1000000;
};

/**
 * @param {Number} amount
 * @returns {String}
 */
export const toDecimal = (amount) => {
  return new Intl.NumberFormat(undefined, {
    style: 'decimal',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * @param {Number} amount
 * @returns {String}
 */
export const toPercent = (amount) => {
  return new Intl.NumberFormat(undefined, {
    style: 'percent',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);
};
