import model from './model';

export default {
  /**
   * @property {Array.<Object>} abrTokens
   * @property {Array.<Object>} accounts
   * @property {Array.<Object>} freezedTokens
   * @property {Array.<Object>} supply
   * @property {Array.<Object>} vbrTokens
   * @property {Object} pool
   * @property {String} denom
   * @returns {Promise}
   */
  getOverviewData({
    abrTokens,
    accounts,
    freezedTokens,
    pool,
    supply,
    vbrTokens,
    denom,
  }) {
    return new Promise((resolve) => {
      const maxSupplyRows = model.maxSupply.getRows({
        accounts,
        abrTokens,
        vbrTokens,
        denom,
      });
      const maxSupplyAmount = model.maxSupply.getTotal();

      const bondedTokens = pool ? pool.bonded_tokens : '0';
      const nonCirculatingSupplyRows = model.nonCirculatingSupply.getRows({
        abrTokens,
        bondedTokens,
        freezedTokens,
        maxSupply: maxSupplyAmount,
        supply,
        vbrTokens,
        denom,
      });
      const nonCirculatingSupplyAmount = model.nonCirculatingSupply.getTotal({
        abrTokens,
        bondedTokens,
        freezedTokens,
        maxSupply: maxSupplyAmount,
        supply,
        vbrTokens,
        denom,
      });

      const circulatingSupplyRows = model.circulatingSupply.getRows(
        maxSupplyAmount,
        nonCirculatingSupplyAmount,
      );
      const circulatingSupplyAmount = model.circulatingSupply.getTotal(
        maxSupplyAmount,
        nonCirculatingSupplyAmount,
      );

      const exchangeRate = _getExchangeRate(
        maxSupplyAmount,
        circulatingSupplyAmount,
      );

      resolve({
        maxSupplyRows,
        nonCirculatingSupplyRows,
        circulatingSupplyRows,
        exchangeRate,
      });
    });
  },
};

/**
 * @param {Number} totalCirculatingSupply
 * @param {Number} maxSupply
 * @returns {String}
 */
const _getExchangeRate = (maxSupply, circulatingSupply) => {
  if (circulatingSupply === 0 || maxSupply === 0) return 0;
  const rate = 1 / (circulatingSupply / maxSupply);
  return new Intl.NumberFormat(undefined, {
    style: 'decimal',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(rate);
};
