import { OVERVIEW } from '@/constants';
import { numberIntlFormatter } from '@/utils';
import ExchangeRateTableBuilder from './ExchangeRateTableBuilder';

const VALIDATOR_SUBTOTAL = 10000000;
const LIQUIDITY_POOL_SUBTOTAL = 15000000;
const COMMUNITY_SUBTOTAL = 10000000;
const FUNDS_SUBTOTAL = 25000000;

const totalSupply =
  VALIDATOR_SUBTOTAL +
  LIQUIDITY_POOL_SUBTOTAL +
  COMMUNITY_SUBTOTAL +
  FUNDS_SUBTOTAL;

const data = [];
/**
 * @typedef {Object} TableRow
 * @property {String} label
 * @property {String} quantity
 * @property {String} percentage
 * @property {String} type
 *
 * @param {TableRow}
 */
const addTableRow = (
  { label, quantity, percentage, type = OVERVIEW.ROW_STYLE.REGULAR } = {
    type: OVERVIEW.ROW_STYLE.REGULAR,
  },
) => {
  data.push({ label, quantity, percentage, type });
};

const ExchangeRateTableTotalBuilder = {
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
  build({ accounts, abrTokens, vbrTokens, denom }) {
    const headers = ExchangeRateTableBuilder.getHeaders({
      text: 'Max Supply',
      value: 'label',
      sortable: false,
      align: 'start',
    });
    addTotalValidatorData(accounts, denom);
    addTotalLiquidityPoolData(accounts, denom);
    addTotalCommunityData(accounts, denom);
    addTotalFundsData(vbrTokens, abrTokens, denom);
    addTableRow({
      label: 'Max Supply',
      quantity: numberIntlFormatter.toDecimal({
        amount: totalSupply,
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }),
      percentage: numberIntlFormatter.toPercent({
        amount: 1,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }),
      type: OVERVIEW.ROW_STYLE.HIGHLIGHTED,
    });
    return new Promise((resolve) =>
      resolve({
        tableData: data,
        headers,
        totalSupply,
      }),
    );
  },
};

export default ExchangeRateTableTotalBuilder;

/**
 * @param {Array.<object>} accounts
 * @param {String} denom
 */
const addTotalValidatorData = (accounts, denom) => {
  const notDistributed = getTokensByAccount({
    accounts: accounts,
    name: 'validator',
    denom: denom,
  });
  const distributed = VALIDATOR_SUBTOTAL - notDistributed;
  addTableRow({
    label: 'Validator Tokens Distributed',
    quantity: numberIntlFormatter.toDecimal({
      amount: distributed,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }),
    percentage: numberIntlFormatter.toPercent({
      amount: distributed / totalSupply,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }),
  });
  addTableRow({
    label: 'Validator Tokens Not Distributed',
    quantity: numberIntlFormatter.toDecimal({
      amount: notDistributed,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }),
    percentage: numberIntlFormatter.toPercent({
      amount: notDistributed / totalSupply,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }),
  });
  addTableRow({
    label: 'Subtotal',
    quantity: numberIntlFormatter.toDecimal({
      amount: VALIDATOR_SUBTOTAL,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }),
    percentage: numberIntlFormatter.toPercent({
      amount: VALIDATOR_SUBTOTAL / totalSupply,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }),
    type: OVERVIEW.ROW_STYLE.HIGHLIGHTED,
  });
};

/**
 * @param {Array.<object>} accounts
 * @param {String} denom
 * @returns {Number}
 */
const addTotalLiquidityPoolData = (accounts, denom) => {
  const notDistributed = getTokensByAccount({
    accounts: accounts,
    name: 'liquidityPool',
    denom: denom,
  });
  const distributed = LIQUIDITY_POOL_SUBTOTAL - notDistributed;
  addTableRow({
    label: 'Liquidity pool Tokens Distributed',
    quantity: numberIntlFormatter.toDecimal({
      amount: distributed,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }),
    percentage: numberIntlFormatter.toPercent({
      amount: distributed / totalSupply,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }),
  });
  addTableRow({
    label: 'Liquidity pool Tokens Not Distributed',
    quantity: numberIntlFormatter.toDecimal({
      amount: notDistributed,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }),
    percentage: numberIntlFormatter.toPercent({
      amount: notDistributed / totalSupply,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }),
  });
  addTableRow({
    label: 'Subtotal',
    quantity: numberIntlFormatter.toDecimal({
      amount: LIQUIDITY_POOL_SUBTOTAL,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }),
    percentage: numberIntlFormatter.toPercent({
      amount: LIQUIDITY_POOL_SUBTOTAL / totalSupply,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }),
    type: OVERVIEW.ROW_STYLE.HIGHLIGHTED,
  });
};

/**
 * @param {Array.<object>} accounts
 * @param {String} denom
 */
const addTotalCommunityData = (accounts, denom) => {
  const notDistributed = getTokensByAccount({
    accounts: accounts,
    name: 'community',
    denom: denom,
  });
  const distributed = COMMUNITY_SUBTOTAL - notDistributed;
  addTableRow({
    label: 'Community Tokens Distributed',
    quantity: numberIntlFormatter.toDecimal({
      amount: distributed,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }),
    percentage: numberIntlFormatter.toPercent({
      amount: distributed / totalSupply,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }),
  });
  addTableRow({
    label: 'Community Tokens Not Distributed',
    quantity: numberIntlFormatter.toDecimal({
      amount: notDistributed,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }),
    percentage: numberIntlFormatter.toPercent({
      amount: notDistributed / totalSupply,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }),
  });
  addTableRow({
    label: 'Subtotal',
    quantity: numberIntlFormatter.toDecimal({
      amount: COMMUNITY_SUBTOTAL,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }),
    percentage: numberIntlFormatter.toPercent({
      amount: COMMUNITY_SUBTOTAL / totalSupply,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }),
    type: OVERVIEW.ROW_STYLE.HIGHLIGHTED,
  });
};

/**
 * @param {Array.<object>} vbrTokens
 * @param {Array.<object>} abrTokens
 * @param {String} denom
 */
const addTotalFundsData = (vbrTokens, abrTokens, denom) => {
  const vbrDistributed =
    FUNDS_SUBTOTAL / 2 -
    ExchangeRateTableBuilder.getTokensByDenom({
      balances: vbrTokens,
      denom: denom,
    });
  const abrDistributed =
    FUNDS_SUBTOTAL / 2 -
    ExchangeRateTableBuilder.getTokensByDenom({
      balances: abrTokens,
      denom: denom,
    });
  const rewardsNotDistributed =
    FUNDS_SUBTOTAL - vbrDistributed - abrDistributed;
  addTableRow({
    label: 'VBR Tokens Distributed',
    quantity: numberIntlFormatter.toDecimal({
      amount: vbrDistributed,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }),
    percentage: numberIntlFormatter.toPercent({
      amount: vbrDistributed / totalSupply,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }),
  });
  addTableRow({
    label: 'ABR Tokens Distributed',
    quantity: numberIntlFormatter.toDecimal({
      amount: abrDistributed,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }),
    percentage: numberIntlFormatter.toPercent({
      amount: abrDistributed / totalSupply,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }),
  });
  addTableRow({
    label: 'ABR and VBR Rewards Not Distributed',
    quantity: numberIntlFormatter.toDecimal({
      amount: rewardsNotDistributed,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }),
    percentage: numberIntlFormatter.toPercent({
      amount: rewardsNotDistributed / totalSupply,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }),
  });
  addTableRow({
    label: 'Subtotal',
    quantity: numberIntlFormatter.toDecimal({
      amount: FUNDS_SUBTOTAL,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }),
    percentage: numberIntlFormatter.toPercent({
      amount: FUNDS_SUBTOTAL / totalSupply,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }),
    type: OVERVIEW.ROW_STYLE.HIGHLIGHTED,
  });
};

/**
 * @typedef {Object} ParamGetTokensByAccount
 * @property {Array.<Object>} accounts
 * @property {String} name
 * @property {String} denom
 *
 * @param {ParamGetTokensByAccount} p
 * @returns {Number}
 */
const getTokensByAccount = ({ accounts, name, denom }) => {
  const account = accounts.find((account) => account.name === name);
  return ExchangeRateTableBuilder.getTokensByDenom({
    balances: account.balances,
    denom: denom,
  });
};
