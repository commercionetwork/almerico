import { EXCHANGE_RATE } from '@/constants';
import exchangeRateOverviewBuilder from '../exchangeRateOverviewBuilder';
import TableRow from '../TableRow';
import { MAX_SUPPLY, SUBTOTAL } from './index';

export default {
  /**
   * @typedef {Object} ParamBuild
   * @property {Array.<Object>} vbrTokens
   * @property {Array.<Object>} abrTokens
   * @property {String} denom
   *
   * @param {ParamBuild} p
   * @returns {Array.<Object>}
   */
  build({ vbrTokens, abrTokens, denom }) {
    const data = [];
    const vbrDistributed =
      SUBTOTAL.FUNDS / 2 -
      exchangeRateOverviewBuilder.getTokensByDenom({
        balances: vbrTokens,
        denom: denom,
      });
    const abrDistributed =
      SUBTOTAL.FUNDS / 2 -
      exchangeRateOverviewBuilder.getTokensByDenom({
        balances: abrTokens,
        denom: denom,
      });
    const rewardsNotDistributed =
      SUBTOTAL.FUNDS - vbrDistributed - abrDistributed;
    data.push(
      new TableRow({
        label: 'VBR Tokens Distributed',
        quantity: new Intl.NumberFormat(undefined, {
          style: 'decimal',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(vbrDistributed),
        percentage: new Intl.NumberFormat(undefined, {
          style: 'percent',
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(vbrDistributed / MAX_SUPPLY),
      }),
    );
    data.push(
      new TableRow({
        label: 'ABR Tokens Distributed',
        quantity: new Intl.NumberFormat(undefined, {
          style: 'decimal',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(abrDistributed),
        percentage: new Intl.NumberFormat(undefined, {
          style: 'percent',
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(abrDistributed / MAX_SUPPLY),
      }),
    );
    data.push(
      new TableRow({
        label: 'ABR and VBR Rewards Not Distributed',
        quantity: new Intl.NumberFormat(undefined, {
          style: 'decimal',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(rewardsNotDistributed),
        percentage: new Intl.NumberFormat(undefined, {
          style: 'percent',
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(rewardsNotDistributed / MAX_SUPPLY),
      }),
    );
    data.push(
      new TableRow({
        label: 'Subtotal',
        quantity: new Intl.NumberFormat(undefined, {
          style: 'decimal',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(SUBTOTAL.FUNDS),
        percentage: new Intl.NumberFormat(undefined, {
          style: 'percent',
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(SUBTOTAL.FUNDS / MAX_SUPPLY),
        type: EXCHANGE_RATE.ROW_STYLE.HIGHLIGHTED,
      }),
    );
    return data;
  },
};
