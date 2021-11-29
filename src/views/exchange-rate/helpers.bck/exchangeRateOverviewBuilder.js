import circulatingTableBuilder from './circulating-table-builder/index';
import maxTableBuilder from './max-table-builder/index';
import nonCirculatingTableBuilder from './non-circulating-table-builder/index';

export default {
  /**
   * @typedef {Object} ParamBuild
   * @property {Array.<Object>} abrTokens
   * @property {Array.<Object>} accounts
   * @property {Array.<Object>} freezedTokens
   * @property {Array.<Object>} supply
   * @property {Array.<Object>} vbrTokens
   * @property {Object} pool
   * @property {String} denom
   *
   * @param {ParamBuild} p
   * @returns {Object}
   */
  build({
    abrTokens,
    accounts,
    // freezedTokens,
    pool,
    supply,
    vbrTokens,
    denom,
  }) {
    const maxData = maxTableBuilder.build({
      accounts,
      abrTokens,
      vbrTokens,
      denom,
    });
    const maxSupply = maxData.maxSupply;
    const bondedTokens = pool ? pool.bonded_tokens : '0';
    const nonCirculatingData = nonCirculatingTableBuilder.build({
      abrTokens,
      bondedTokens,
      // freezedTokens,
      maxSupply,
      supply,
      vbrTokens,
      denom,
    });
    const totalNonCirculatingSupply =
      nonCirculatingData.totalNonCirculatingSupply;
    const circulatingData = circulatingTableBuilder.build({
      maxSupply,
      totalNonCirculatingSupply,
    });
    const exchangeRate = this.getExchangeRate(
      circulatingData.totalCirculatingSupply,
      maxSupply,
    );
    return {
      maxData: maxData.tableData,
      maxHeaders: maxData.headers,
      nonCirculatingData: nonCirculatingData.tableData,
      nonCirculatingHeaders: nonCirculatingData.headers,
      circulatingData: circulatingData.tableData,
      circulatingHeaders: circulatingData.headers,
      exchangeRate,
    };
  },
  /**
   * @param {Number} totalCirculatingSupply
   * @param {Number} maxSupply
   * @returns {String}
   */
  getExchangeRate(totalCirculatingSupply, maxSupply) {
    if (totalCirculatingSupply === 0 || maxSupply === 0) return 0;
    const rate = 1 / (totalCirculatingSupply / maxSupply);
    return new Intl.NumberFormat(undefined, {
      style: 'decimal',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(rate);
  },
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
  getHeaders(header) {
    return [
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
  },
  /**
   * @typedef {Object} ParamGetTokensByDenom
   * @property {Array.<Object>} Balances
   * @property {String} denom
   *
   * @param {ParamGetTokensByDenom} p
   * @returns {Number}
   */
  getTokensByDenom({ balances, denom }) {
    if (balances.length < 1) return 0;
    const balance = balances.find((balance) => balance.denom === denom);
    return parseFloat(balance.amount) / 1000000;
  },
};
