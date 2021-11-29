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
    translator,
    ctx,
  }) {
    const $t = translator.bind(ctx);

    return new Promise((resolve) => {
      const maxSupplyRows = model.maxSupply.getRows({
        accounts,
        abrTokens,
        vbrTokens,
        denom,
        translator: $t,
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
        $t,
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
        $t,
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
