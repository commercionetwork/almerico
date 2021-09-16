import { OVERVIEW } from '@/constants';
import { numberIntlFormatter } from '@/utils';
import exchangeRateOverviewBuilder from '../exchangeRateOverviewBuilder';
import { FUNDS_SUBTOTAL, MAX_SUPPLY } from './index';
import TableRow from '../TableRow';

const maxFundsDataBuilder = {
  /**
   * @typedef {Object} ParamBuild
   * @property {Array.<Object>} vbrTokens
   * @property {Array.<Object>} abrTokens
   * @property {String} denom
   *
   * @param {ParamBuild} p
   * @returns {Promise}
   */
  build({ vbrTokens, abrTokens, denom }) {
    const data = [];
    const vbrDistributed =
      FUNDS_SUBTOTAL / 2 -
      exchangeRateOverviewBuilder.getTokensByDenom({
        balances: vbrTokens,
        denom: denom,
      });
    const abrDistributed =
      FUNDS_SUBTOTAL / 2 -
      exchangeRateOverviewBuilder.getTokensByDenom({
        balances: abrTokens,
        denom: denom,
      });
    const rewardsNotDistributed =
      FUNDS_SUBTOTAL - vbrDistributed - abrDistributed;
    data.push(
      new TableRow({
        label: 'VBR Tokens Distributed',
        quantity: numberIntlFormatter.toDecimal({
          amount: vbrDistributed,
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }),
        percentage: numberIntlFormatter.toPercent({
          amount: vbrDistributed / MAX_SUPPLY,
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }),
      }),
    );
    data.push(
      new TableRow({
        label: 'ABR Tokens Distributed',
        quantity: numberIntlFormatter.toDecimal({
          amount: abrDistributed,
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }),
        percentage: numberIntlFormatter.toPercent({
          amount: abrDistributed / MAX_SUPPLY,
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }),
      }),
    );
    data.push(
      new TableRow({
        label: 'ABR and VBR Rewards Not Distributed',
        quantity: numberIntlFormatter.toDecimal({
          amount: rewardsNotDistributed,
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }),
        percentage: numberIntlFormatter.toPercent({
          amount: rewardsNotDistributed / MAX_SUPPLY,
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }),
      }),
    );
    data.push(
      new TableRow({
        label: 'Subtotal',
        quantity: numberIntlFormatter.toDecimal({
          amount: FUNDS_SUBTOTAL,
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }),
        percentage: numberIntlFormatter.toPercent({
          amount: FUNDS_SUBTOTAL / MAX_SUPPLY,
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }),
        type: OVERVIEW.ROW_STYLE.HIGHLIGHTED,
      }),
    );
    return new Promise((resolve) => resolve(data));
  },
};

export default maxFundsDataBuilder;
