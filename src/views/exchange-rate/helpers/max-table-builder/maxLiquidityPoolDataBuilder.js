import { OVERVIEW } from '@/constants';
import { numberIntlFormatter } from '@/utils';
import TableRow from '../TableRow';
import maxTableBuilder, { LIQUIDITY_POOL_SUBTOTAL, MAX_SUPPLY } from './index';

const maxLiquidityPoolDataBuilder = {
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
      name: 'liquidityPool',
      denom: denom,
    });
    const distributed = LIQUIDITY_POOL_SUBTOTAL - notDistributed;
    data.push(
      new TableRow({
        label: 'Liquidity pool Tokens Distributed',
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
        label: 'Liquidity pool Tokens Not Distributed',
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
          amount: LIQUIDITY_POOL_SUBTOTAL,
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }),
        percentage: numberIntlFormatter.toPercent({
          amount: LIQUIDITY_POOL_SUBTOTAL / MAX_SUPPLY,
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }),
        type: OVERVIEW.ROW_STYLE.HIGHLIGHTED,
      }),
    );
    return new Promise((resolve) => resolve(data));
  },
};

export default maxLiquidityPoolDataBuilder;
