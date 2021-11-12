import { EXCHANGE_RATE } from '@/constants';
import TableRow from '../TableRow';
import maxTableBuilder, { MAX_SUPPLY, SUBTOTAL } from './index';

export default {
  /**
   * @typedef {Object} ParamBuild
   * @property {Array.<Object>} accounts
   * @property {String} denom
   *
   * @param {ParamBuild} p
   * @returns {Array.<Object>}
   */
  build({ accounts, denom }) {
    const data = [];
    const notDistributed = maxTableBuilder.getTokensByAccount({
      accounts: accounts,
      name: 'community',
      denom: denom,
    });
    const distributed = SUBTOTAL.COMMUNITY - notDistributed;
    data.push(
      new TableRow({
        label: 'Community Tokens Distributed',
        quantity: new Intl.NumberFormat(undefined, {
          style: 'decimal',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(distributed),
        percentage: new Intl.NumberFormat(undefined, {
          style: 'percent',
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(distributed / MAX_SUPPLY),
      }),
    );
    data.push(
      new TableRow({
        label: 'Community Tokens Not Distributed',
        quantity: new Intl.NumberFormat(undefined, {
          style: 'decimal',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(notDistributed),
        percentage: new Intl.NumberFormat(undefined, {
          style: 'percent',
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(notDistributed / MAX_SUPPLY),
      }),
    );
    data.push(
      new TableRow({
        label: 'Subtotal',
        quantity: new Intl.NumberFormat(undefined, {
          style: 'decimal',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(SUBTOTAL.COMMUNITY),
        percentage: new Intl.NumberFormat(undefined, {
          style: 'percent',
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(SUBTOTAL.COMMUNITY / MAX_SUPPLY),
        type: EXCHANGE_RATE.ROW_STYLE.HIGHLIGHTED,
      }),
    );
    return data;
  },
};
