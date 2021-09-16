import { OVERVIEW } from '@/constants';
import { numberIntlFormatter } from '@/utils';
import exchangeRateOverviewBuilder from '../exchangeRateOverviewBuilder';
import TableRow from '../TableRow';

const nonCirculatingTableBuilder = {
  /**
   * @typedef {Object} ParamBuild
   * @property {Array.<Object>} abrTokens
   * @property {Array.<Object>} vbrTokens
   * @property {Array.<Object>} allTokens
   * @property {Array.<Object>} freezedTokens
   * @property {Number} maxSupply
   * @property {String} bondedTokens
   * @property {String} denom
   *
   * @param {ParamBuild} p
   * @returns {Promise}
   */
  build({
    abrTokens,
    vbrTokens,
    allTokens,
    freezedTokens,
    maxSupply,
    bondedTokens,
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
        balances: allTokens,
        denom: denom,
      });
    const bondedQuantity = parseFloat(bondedTokens) / 1000000;
    const freezedQuantity = exchangeRateOverviewBuilder.getTokensByDenom({
      balances: freezedTokens,
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
        quantity: numberIntlFormatter.toDecimal({
          amount: vbrQuantity,
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }),
        percentage: numberIntlFormatter.toPercent({
          amount: vbrQuantity / totalNonCirculatingSupply,
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }),
      }),
    );
    data.push(
      new TableRow({
        label: 'ABR Tokens Not Distributed',
        quantity: numberIntlFormatter.toDecimal({
          amount: abrQuantity,
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }),
        percentage: numberIntlFormatter.toPercent({
          amount: abrQuantity / totalNonCirculatingSupply,
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }),
      }),
    );
    data.push(
      new TableRow({
        label: 'Burned',
        quantity: numberIntlFormatter.toDecimal({
          amount: burnedQuantity,
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }),
        percentage: numberIntlFormatter.toPercent({
          amount: burnedQuantity / totalNonCirculatingSupply,
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }),
      }),
    );
    data.push(
      new TableRow({
        label: 'Bonded Tokens',
        quantity: numberIntlFormatter.toDecimal({
          amount: bondedQuantity,
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }),
        percentage: numberIntlFormatter.toPercent({
          amount: bondedQuantity / totalNonCirculatingSupply,
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }),
      }),
    );
    data.push(
      new TableRow({
        label: 'Freezed Tokens',
        quantity: numberIntlFormatter.toDecimal({
          amount: freezedQuantity,
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }),
        percentage: numberIntlFormatter.toPercent({
          amount: freezedQuantity / totalNonCirculatingSupply,
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }),
      }),
    );
    data.push(
      new TableRow({
        label: 'Unclaimed Rewards',
        quantity: 'Coming soon',
        percentage: '-',
        type: OVERVIEW.ROW_STYLE.COMING_SOON,
      }),
    );
    data.push(
      new TableRow({
        label: 'Total Non Circulating Supply',
        quantity: numberIntlFormatter.toDecimal({
          amount: totalNonCirculatingSupply,
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }),
        percentage: numberIntlFormatter.toPercent({
          amount: 1,
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }),
        type: OVERVIEW.ROW_STYLE.HIGHLIGHTED,
      }),
    );

    return new Promise((resolve) =>
      resolve({
        tableData: data,
        headers,
        totalNonCirculatingSupply,
      }),
    );
  },
};

export default nonCirculatingTableBuilder;
