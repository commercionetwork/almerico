import { numberIntlFormatter } from '@/utils';
import circulatingTableBuilder from './circulating-table-builder/index';
import nonCirculatingTableBuilder from './non-circulating-table-builder/index';
import maxTableBuilder from './max-table-builder/index';

const exchangeRateOverviewBuilder = {
  /**
   * @typedef {Object} ParamBuild
   * @property {Array.<Object>} accounts
   * @property {Array.<Object>} abrTokens
   * @property {Array.<Object>} allTokens
   * @property {Array.<Object>} freezedTokens
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
    freezedTokens,
    vbrTokens,
    bondedTokens,
    denom,
  }) {
    const maxData = await maxTableBuilder.build({
      accounts,
      abrTokens,
      vbrTokens,
      denom,
    });
    const maxSupply = maxData.maxSupply;
    const nonCirculatingData = await nonCirculatingTableBuilder.build({
      abrTokens,
      vbrTokens,
      allTokens,
      freezedTokens,
      maxSupply,
      bondedTokens,
      denom,
    });
    const totalNonCirculatingSupply =
      nonCirculatingData.totalNonCirculatingSupply;
    const circulatingData = await circulatingTableBuilder.build({
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
    return numberIntlFormatter.toDecimal({
      amount: rate,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
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

export default exchangeRateOverviewBuilder;
