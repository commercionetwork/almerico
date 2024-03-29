import { EXCHANGE_RATE } from '@/constants';

const overviewHelper = {
  /**
   * @param {Function} translator
   * @param {Object} context The context to bind to the translator function
   * @param {Array.<Object>} rows
   */
  buildRows(translator, context, rows) {
    const $t = translator.bind(context);
    return rows.map((row) => {
      const quantity =
        row.style === EXCHANGE_RATE.ROW_STYLE.COMING_SOON
          ? $t('msgs.comingSoon')
          : new Intl.NumberFormat(undefined, {
              style: 'decimal',
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            }).format(row.amount);
      const percentage =
        row.style === EXCHANGE_RATE.ROW_STYLE.COMING_SOON
          ? $t('msgs.comingSoon')
          : (row.percentage * 100).toFixed(2) + '%';
      return {
        label: $t(`labels.${row.label}`),
        quantity: quantity,
        percentage: percentage,
        style: row.style,
      };
    });
  },
  /**
   * @param {Function} translator
   * @param {Object} context The context to bind to the translator function
   */
  getHeaders(translator, context) {
    const $t = translator.bind(context);
    const commonHeaders = _getCommonHeaders($t);
    const circulatingSupply = [
      {
        text: $t('labels.circulatingSupply'),
        value: 'label',
        sortable: false,
        align: 'start',
      },
    ].concat(commonHeaders);
    const maxSupply = [
      {
        text: $t('labels.maxSupply'),
        value: 'label',
        sortable: false,
        align: 'start',
      },
    ].concat(commonHeaders);
    const nonCirculatingSupply = [
      {
        text: $t('labels.nonCirculatingSupply'),
        value: 'label',
        sortable: false,
        align: 'start',
      },
    ].concat(commonHeaders);
    return { circulatingSupply, maxSupply, nonCirculatingSupply };
  },
};

export default overviewHelper;

const _getCommonHeaders = (translator) => {
  const $t = translator;
  return [
    {
      text: $t('labels.quantity'),
      value: 'quantity',
      sortable: false,
      align: 'end',
      width: '20%',
    },
    {
      text: $t('labels.percentage'),
      value: 'percentage',
      sortable: false,
      align: 'end',
      width: '20%',
    },
  ];
};
