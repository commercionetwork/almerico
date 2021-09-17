import { OVERVIEW } from '@/constants';
import { numberIntlFormatter } from '@/utils';
import exchangeRateOverviewBuilder from '../exchangeRateOverviewBuilder';
import TableRow from '../TableRow';
import maxCommunityDataBuilder from './maxCommunityDataBuilder';
import maxFundsDataBuilder from './maxFundsDataBuilder';
import maxLiquidityPoolDataBuilder from './maxLiquidityPoolDataBuilder';
import maxValidatorDataBuilder from './maxValidatorDataBuilder';

export const SUBTOTAL = {
  VALIDATOR: 10000000,
  LIQUIDITY_POOL: 15000000,
  COMMUNITY: 10000000,
  FUNDS: 25000000,
};
export const MAX_SUPPLY =
  SUBTOTAL.VALIDATOR +
  SUBTOTAL.LIQUIDITY_POOL +
  SUBTOTAL.COMMUNITY +
  SUBTOTAL.FUNDS;

const maxTableBuilder = {
  /**
   * @typedef {Object} ParamBuild
   * @property {Array.<Object>} accounts
   * @property {Array.<Object>} abrTokens
   * @property {Array.<Object>} vbrTokens
   * @property {String} denom
   *
   * @param {ParamBuild} p
   * @returns {Promise}
   */
  async build({ accounts, abrTokens, vbrTokens, denom }) {
    const headers = exchangeRateOverviewBuilder.getHeaders({
      text: 'Max Supply',
      value: 'label',
      sortable: false,
      align: 'start',
    });
    const data = [];
    const maxValidatorData = await maxValidatorDataBuilder.build({
      accounts,
      denom,
    });
    const maxLiquidityPoolData = await maxLiquidityPoolDataBuilder.build({
      accounts,
      denom,
    });
    const maxCommunityData = await maxCommunityDataBuilder.build({
      accounts,
      denom,
    });
    const maxFundsData = await maxFundsDataBuilder.build({
      vbrTokens,
      abrTokens,
      denom,
    });
    data.push(
      ...maxValidatorData,
      ...maxLiquidityPoolData,
      ...maxCommunityData,
      ...maxFundsData,
    );

    data.push(
      new TableRow({
        label: 'Max Supply',
        quantity: numberIntlFormatter.toDecimal({
          amount: MAX_SUPPLY,
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
    return {
      tableData: data,
      headers,
      maxSupply: MAX_SUPPLY,
    };
  },
  /**
   * @typedef {Object} ParamGetTokensByAccount
   * @property {Array.<Object>} accounts
   * @property {String} name
   * @property {String} denom
   *
   * @param {ParamGetTokensByAccount} p
   * @returns {Number}
   */
  getTokensByAccount({ accounts, name, denom }) {
    if (!accounts.length || !name || !denom) return 0;
    const account = accounts.find((account) => account.name === name);
    return exchangeRateOverviewBuilder.getTokensByDenom({
      balances: account.balances,
      denom: denom,
    });
  },
};

export default maxTableBuilder;