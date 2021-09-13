import ExchangeRateTableCirculatingBuilder from './ExchangeRateTableCirculatingBuilder';
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
    const totalData =
      (await ExchangeRateTableTotalBuilder.build({
        accounts,
        abrTokens,
        vbrTokens,
        denom,
      })) || [];
    const totalSupply = totalData.totalSupply || 0;
    const nonCirculatingData =
      (await ExchangeRateTableNonCirculatingBuilder.build({
        abrTokens,
        vbrTokens,
        allTokens,
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
    const exchangeRate =
      1 / (circulatingData.totalCirculatingSupply / totalSupply);
    return {
      totalData: totalData.tableData,
      totalHeaders: totalData.headers,
      nonCirculatingData: nonCirculatingData.tableData,
      nonCirculatingHeaders: nonCirculatingData.headers,
      circulatingData: circulatingData.tableData,
      circulatingHeaders: circulatingData.headers,
      exchangeRate: toDecimal(exchangeRate, 2, 2),
    };
  },
};

export default ExchangeRateTableBuilder;

/**
 * @param {Object} header
 * @returns
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
 * @returns {String}
 */
export const toPercent = (amount) => {
  return new Intl.NumberFormat(undefined, {
    style: 'percent',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);
};
