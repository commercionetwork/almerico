import { EXCHANGE_RATE } from '@/constants';
import exchangeRateOverviewBuilder from '../exchangeRateOverviewBuilder';
import TableRow from '../TableRow';

export default {
  /**
   * @typedef {Object} ParamBuild
   * @property {Array.<Object>} abrTokens
   * @property {Array.<Object>} freezedTokens
   * @property {Array.<Object>} supply
   * @property {Array.<Object>} vbrTokens
   * @property {Number} maxSupply
   * @property {String} bondedTokens
   * @property {String} denom
   *
   * @param {ParamBuild} p
   * @returns {Object}
   */
  build({
    abrTokens,
    bondedTokens,
    // freezedTokens,
    maxSupply,
    supply,
    vbrTokens,
    denom,
  }) {
    const data = [];
    const headers = exchangeRateOverviewBuilder.getHeaders({
      text: 'Non Circulating Supply',
      value: 'label',
      sortable: false,
      align: 'start',
    });
    const abrQuantity = exchangeRateOverviewBuilder.getTokensByDenom({
      balances: abrTokens,
      denom: denom,
    });
    const vbrQuantity = exchangeRateOverviewBuilder.getTokensByDenom({
      balances: vbrTokens,
      denom: denom,
    });
    const burnedQuantity =
      maxSupply -
      exchangeRateOverviewBuilder.getTokensByDenom({
        balances: supply,
        denom: denom,
      });
    const bondedQuantity = parseFloat(bondedTokens) / 1000000;
    const freezedQuantity = exchangeRateOverviewBuilder.getTokensByDenom({
      // TODO: enable when ready
      // balances: freezedTokens,
      balances: [],
      denom: denom,
    });
    const totalNonCirculatingSupply =
      abrQuantity +
      vbrQuantity +
      burnedQuantity +
      bondedQuantity +
      freezedQuantity;
    data.push(
      new TableRow({
        label: 'VBR Tokens Not Distributed',
        quantity: new Intl.NumberFormat(undefined, {
          style: 'decimal',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(vbrQuantity),
        percentage: new Intl.NumberFormat(undefined, {
          style: 'percent',
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(vbrQuantity / totalNonCirculatingSupply),
      }),
    );
    data.push(
      new TableRow({
        label: 'ABR Tokens Not Distributed',
        quantity: new Intl.NumberFormat(undefined, {
          style: 'decimal',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(abrQuantity),
        percentage: new Intl.NumberFormat(undefined, {
          style: 'percent',
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(abrQuantity / totalNonCirculatingSupply),
      }),
    );
    data.push(
      new TableRow({
        label: 'Burned',
        quantity: new Intl.NumberFormat(undefined, {
          style: 'decimal',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(burnedQuantity),
        percentage: new Intl.NumberFormat(undefined, {
          style: 'percent',
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(burnedQuantity / totalNonCirculatingSupply),
      }),
    );
    data.push(
      new TableRow({
        label: 'Bonded Tokens',
        quantity: new Intl.NumberFormat(undefined, {
          style: 'decimal',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(bondedQuantity),
        percentage: new Intl.NumberFormat(undefined, {
          style: 'percent',
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(bondedQuantity / totalNonCirculatingSupply),
      }),
    );
    data.push(
      new TableRow({
        label: 'Freezed Tokens',
        quantity: new Intl.NumberFormat(undefined, {
          style: 'decimal',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(freezedQuantity),
        percentage: new Intl.NumberFormat(undefined, {
          style: 'percent',
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(freezedQuantity / totalNonCirculatingSupply),
      }),
    );
    data.push(
      new TableRow({
        label: 'Unclaimed Rewards',
        quantity: 'Coming soon',
        percentage: '-',
        type: EXCHANGE_RATE.ROW_STYLE.COMING_SOON,
      }),
    );
    data.push(
      new TableRow({
        label: 'Total Non Circulating Supply',
        quantity: new Intl.NumberFormat(undefined, {
          style: 'decimal',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(totalNonCirculatingSupply),
        percentage: new Intl.NumberFormat(undefined, {
          style: 'percent',
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(1),
        type: EXCHANGE_RATE.ROW_STYLE.HIGHLIGHTED,
      }),
    );

    return {
      tableData: data,
      headers,
      totalNonCirculatingSupply,
    };
  },
};
