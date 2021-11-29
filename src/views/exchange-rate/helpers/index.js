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
   * @returns {Object}
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
    const maxSupplyRows = model.maxSupply.getRows({
      accounts,
      abrTokens,
      vbrTokens,
      denom,
    });
    console.log(maxSupplyRows);
  },
};
