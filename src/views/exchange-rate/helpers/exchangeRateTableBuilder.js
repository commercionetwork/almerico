import { numberIntlFormatter } from '@/utils';
import exchangeRateTableCirculatingBuilder from './exchangeRateTableCirculatingBuilder';
import exchangeRateTableNonCirculatingBuilder from './exchangeRateTableNonCirculatingBuilder';
import exchangeRateTableTotalBuilder from './exchangeRateTableTotalBuilder';

const exchangeRateTableBuilder = {
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
    const totalData =
      (await exchangeRateTableTotalBuilder.build({
        accounts,
        abrTokens,
        vbrTokens,
        denom,
      })) || [];
    const totalSupply = totalData.totalSupply || 0;
    const nonCirculatingData =
      (await exchangeRateTableNonCirculatingBuilder.build({
        abrTokens,
        vbrTokens,
        allTokens,
        freezedTokens,
        totalSupply,
        bondedTokens,
        denom,
      })) || [];
    const totalNonCirculatingSupply =
      nonCirculatingData.totalNonCirculatingSupply || 0;
    const circulatingData =
      (await exchangeRateTableCirculatingBuilder.build({
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

export default exchangeRateTableBuilder;
