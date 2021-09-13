import {
  getTokensByDenom,
  toDecimal,
  toPercent,
} from './ExchangeRateTableBuilder';

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
/** Row
 * @typedef {Object} TableRow
 * @property {String} type
 * @property {String} quantity
 * @property {String} percentage
 *
 * @param {TableRow}
 */
const addTableRow = ({ label, quantity, percentage }) => {
  data.push({ label, quantity, percentage });
};

const ExchangeRateTableTotalBuilder = {
  build({ accounts, abrTokens, vbrTokens, denom }) {
    addTotalValidatorData(accounts, denom);
    addTotalLiquidityPoolData(accounts, denom);
    addTotalCommunityData(accounts, denom);
    addTotalFundsData(vbrTokens, abrTokens, denom);
    addTableRow({
      label: 'Total Supply',
      quantity: totalSupply,
      percentage: toPercent(1),
    });
    return { tableData: data, totalSupply: totalSupply };
  },
};

export default ExchangeRateTableTotalBuilder;

const addTotalValidatorData = (accounts, denom) => {
  const notDistributed = getTokensByAccount({
    accounts: accounts,
    name: 'validator',
    denom: denom,
  });
  const distributed = VALIDATOR_SUBTOTAL - notDistributed;
  addTableRow({
    label: 'Validator Tokens Distributed',
    quantity: toDecimal(distributed),
    percentage: toPercent(distributed / totalSupply),
  });
  addTableRow({
    label: 'Validator Tokens Not Distributed',
    quantity: toDecimal(notDistributed),
    percentage: toPercent(notDistributed / totalSupply),
  });
  addTableRow({
    label: 'Subtotal',
    quantity: toDecimal(VALIDATOR_SUBTOTAL),
    percentage: toPercent(VALIDATOR_SUBTOTAL / totalSupply),
  });
};

const addTotalLiquidityPoolData = (accounts, denom) => {
  const notDistributed = getTokensByAccount({
    accounts: accounts,
    name: 'liquidityPool',
    denom: denom,
  });
  const distributed = LIQUIDITY_POOL_SUBTOTAL - notDistributed;
  addTableRow({
    label: 'Liquidity pool Tokens Distributed',
    quantity: toDecimal(distributed),
    percentage: toPercent(distributed / totalSupply),
  });
  addTableRow({
    label: 'Liquidity pool Tokens Not Distributed',
    quantity: toDecimal(notDistributed),
    percentage: toPercent(notDistributed / totalSupply),
  });
  addTableRow({
    label: 'Subtotal',
    quantity: toDecimal(LIQUIDITY_POOL_SUBTOTAL),
    percentage: toPercent(LIQUIDITY_POOL_SUBTOTAL / totalSupply),
  });
};

const addTotalCommunityData = (accounts, denom) => {
  const notDistributed = getTokensByAccount({
    accounts: accounts,
    name: 'community',
    denom: denom,
  });
  const distributed = COMMUNITY_SUBTOTAL - notDistributed;
  addTableRow({
    label: 'Community Tokens Distributed',
    quantity: toDecimal(distributed),
    percentage: toPercent(distributed / totalSupply),
  });
  addTableRow({
    label: 'Community Tokens Not Distributed',
    quantity: toDecimal(notDistributed),
    percentage: toPercent(notDistributed / totalSupply),
  });
  addTableRow({
    label: 'Subtotal',
    quantity: toDecimal(COMMUNITY_SUBTOTAL),
    percentage: toPercent(COMMUNITY_SUBTOTAL / totalSupply),
  });
};

const addTotalFundsData = (vbrTokens, abrTokens, denom) => {
  const vbrDistributed =
    FUNDS_SUBTOTAL / 2 -
    getTokensByDenom({ balances: vbrTokens, denom: denom });
  const abrDistributed =
    FUNDS_SUBTOTAL / 2 -
    getTokensByDenom({ balances: abrTokens, denom: denom });
  const rewardsNotDistributed =
    FUNDS_SUBTOTAL - vbrDistributed - abrDistributed;
  addTableRow({
    label: 'VBR Tokens Distributed',
    quantity: toDecimal(vbrDistributed),
    percentage: toPercent(vbrDistributed / totalSupply),
  });
  addTableRow({
    label: 'ABR Tokens Distributed',
    quantity: toDecimal(abrDistributed),
    percentage: toPercent(abrDistributed / totalSupply),
  });
  addTableRow({
    label: 'ABR and VBR Rewards Not Distributed',
    quantity: toDecimal(rewardsNotDistributed),
    percentage: toPercent(rewardsNotDistributed / totalSupply),
  });
  addTableRow({
    label: 'Subtotal',
    quantity: toDecimal(FUNDS_SUBTOTAL),
    percentage: toPercent(FUNDS_SUBTOTAL / totalSupply),
  });
};

/**
 * @param {Array.<Object>} accounts
 * @param {String} name
 * @param {String} denom
 * @returns {Number}
 */
const getTokensByAccount = ({ accounts, name, denom }) => {
  const account = accounts.find((account) => account.name === name);
  return getTokensByDenom({ balances: account.balances, denom: denom });
};
