import { OVERVIEW } from '@/constants';
import { numberIntlFormatter } from '@/utils';
import maxTableBuilder, { MAX_SUPPLY, COMMUNITY_SUBTOTAL } from './index';
import TableRow from '../TableRow';

const maxCommunityDataBuilder = {
  /**
   * @typedef {Object} ParamBuild
   * @property {Array.<Object>} accounts
   * @property {String} denom
   *
   * @param {ParamBuild} p
   * @returns {Promise}
   */
  build({ accounts, denom }) {
    const data = [];
    const notDistributed = maxTableBuilder.getTokensByAccount({
      accounts: accounts,
      name: 'community',
      denom: denom,
    });
    const distributed = COMMUNITY_SUBTOTAL - notDistributed;
    data.push(
      new TableRow({
        label: 'Community Tokens Distributed',
        quantity: numberIntlFormatter.toDecimal({
          amount: distributed,
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }),
        percentage: numberIntlFormatter.toPercent({
          amount: distributed / MAX_SUPPLY,
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }),
      }),
    );
    data.push(
      new TableRow({
        label: 'Community Tokens Not Distributed',
        quantity: numberIntlFormatter.toDecimal({
          amount: notDistributed,
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }),
        percentage: numberIntlFormatter.toPercent({
          amount: notDistributed / MAX_SUPPLY,
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }),
      }),
    );
    data.push(
      new TableRow({
        label: 'Subtotal',
        quantity: numberIntlFormatter.toDecimal({
          amount: COMMUNITY_SUBTOTAL,
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }),
        percentage: numberIntlFormatter.toPercent({
          amount: COMMUNITY_SUBTOTAL / MAX_SUPPLY,
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }),
        type: OVERVIEW.ROW_STYLE.HIGHLIGHTED,
      }),
    );
    return new Promise((resolve) => resolve(data));
  },
};

export default maxCommunityDataBuilder;
