import circulatingSupply from './overview/circulating-supply';
import exchangeRate from './overview/exchange-rate';
import maxSupply from './overview/max-supply';
import nonCirculatingSupply from './overview/non-circulating-supply';

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
  getOverviewTables({
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
