import circulatingSupply from './overview/circulating-supply';
import maxSupply from './overview/max-supply';
import nonCirculatingSupply from './overview/non-circulating-supply';
import exchangeRate from './overview/exchange-rate';

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
    const $t = translator.bind(ctx);

    return new Promise((resolve) => {
      const maxSupplyRows = maxSupply.getRows({
        accounts,
        abrTokens,
        vbrTokens,
        denom,
        translator: $t,
      });
      const maxSupplyAmount = maxSupply.getTotal();

      const bondedTokens = pool ? pool.bonded_tokens : '0';
      const nonCirculatingSupplyRows = nonCirculatingSupply.getRows({
        abrTokens,
        bondedTokens,
        freezedTokens,
        maxSupply: maxSupplyAmount,
        supply,
        vbrTokens,
        denom,
        translator: $t,
      });
      const nonCirculatingSupplyAmount = nonCirculatingSupply.getTotal({
        abrTokens,
        bondedTokens,
        freezedTokens,
        maxSupply: maxSupplyAmount,
        supply,
        vbrTokens,
        denom,
      });

      const circulatingSupplyRows = circulatingSupply.getRows({
        maxSupply: maxSupplyAmount,
        nonCirculatingSupply: nonCirculatingSupplyAmount,
        translator: $t,
      });
      const circulatingSupplyAmount = circulatingSupply.getTotal(
        maxSupplyAmount,
        nonCirculatingSupplyAmount,
      );

      const rate = exchangeRate.getRate(
        maxSupplyAmount,
        circulatingSupplyAmount,
      );

      resolve({
        maxSupply: {
          headers: _getHeaders(
            {
              text: $t('labels.maxSupply'),
              value: 'label',
              sortable: false,
              align: 'start',
            },
            $t,
          ),
          rows: maxSupplyRows,
        },
        nonCirculatingSupply: {
          headers: _getHeaders(
            {
              text: $t('labels.nonCirculatingSupply'),
              value: 'label',
              sortable: false,
              align: 'start',
            },
            $t,
          ),
          rows: nonCirculatingSupplyRows,
        },
        circulatingSupply: {
          headers: _getHeaders(
            {
              text: $t('labels.circulatingSupply'),
              value: 'label',
              sortable: false,
              align: 'start',
            },
            $t,
          ),
          rows: circulatingSupplyRows,
        },
        exchangeRate: rate,
      });
    });
  },
};

/**
 *
 * @property {String} text
 * @property {String} value
 * @property {Boolean} sortable
 * @property {String} align
 * @returns {Array.<Object>}
 */
const _getHeaders = (header, translator) => {
  const $t = translator;
  return [
    header,
    {
      text: $t('labels.quantity'),
      value: 'quantity',
      sortable: false,
      align: 'end',
    },
    {
      text: $t('labels.percentage'),
      value: 'percentage',
      sortable: false,
      align: 'end',
    },
  ];
};
