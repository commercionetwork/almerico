import circulatingSupply from './overview/circulatingSupply';
import exchangeRate from './overview/exchangeRate';
import maxSupply from './overview/maxSupply';
import nonCirculatingSupply from './overview/nonCirculatingSupply';

export default {
  /**
   * @param {Array.<Object>} abrTokens
   * @param {Array.<Object>} accounts
   * @param {Array.<Object>} freezedTokens
   * @param {Array.<Object>} supply
   * @param {Array.<Object>} vbrTokens
   * @param {Function} translator
   * @param {Object} context The context to bind to the translator function
   * @param {Object} pool
   * @param {String} denom
   * @returns {Promise}
   */
  getOverview({
    abrTokens,
    accounts,
    freezedTokens,
    pool,
    supply,
    vbrTokens,
    denom,
    translator,
    ctx,
  }) {
    return new Promise((resolve) => {
      const maxSupplyTable = maxSupply.getTable({
        accounts,
        abrTokens,
        vbrTokens,
        denom,
        translator: translator.bind(ctx),
      });

      const bondedTokens = pool ? pool.bonded_tokens : '0';
      const nonCirculatingSupplyTable = nonCirculatingSupply.getTable({
        abrTokens,
        bondedTokens,
        freezedTokens,
        maxSupply: maxSupplyTable.total,
        supply,
        vbrTokens,
        denom,
        translator: translator.bind(ctx),
      });

      const circulatingSupplyTable = circulatingSupply.getTable({
        maxSupply: maxSupplyTable.total,
        nonCirculatingSupply: nonCirculatingSupplyTable.total,
        translator: translator.bind(ctx),
      });

      const rate = exchangeRate.getRate(
        maxSupplyTable.total,
        circulatingSupplyTable.total,
      );

      resolve({
        maxSupplyTable,
        nonCirculatingSupplyTable,
        circulatingSupplyTable,
        exchangeRate: rate,
      });
    });
  },
};
