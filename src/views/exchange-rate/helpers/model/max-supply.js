import { EXCHANGE_RATE } from '@/constants';
import { getTokensByAccount, getTokensByDenom, Row } from './index';

const MAX_SUPPLY_TOTAL =
  EXCHANGE_RATE.SUBTOTAL.FUNDS +
  EXCHANGE_RATE.SUBTOTAL.COMMUNITY +
  EXCHANGE_RATE.SUBTOTAL.LIQUIDITY_POOL +
  EXCHANGE_RATE.SUBTOTAL.VALIDATOR;

export default {
  getRows({ accounts, abrTokens, vbrTokens, denom, translator }) {
    const validatorRows = _getValidatorRows(accounts, denom, translator);
    const liquidityPoolRows = _getLiquidityPoolRows(
      accounts,
      denom,
      translator,
    );
    const communityRows = _getCommunityRows(accounts, denom, translator);
    const fundsRows = _getFundsRows(vbrTokens, abrTokens, denom, translator);
    const totalRow = _getTotalRow(translator);
    return [].concat(
      validatorRows,
      liquidityPoolRows,
      communityRows,
      fundsRows,
      [totalRow],
    );
  },
  getTotal() {
    return MAX_SUPPLY_TOTAL;
  },
};

const _getValidatorRows = (accounts, denom, translator) => {
  const $t = translator;
  const notDistributed = getTokensByAccount({
    accounts: accounts,
    name: 'validator',
    denom: denom,
  });
  const distributedRow = new Row({
    rank: 1,
    label: 'Validator Tokens Distributed',
    value: EXCHANGE_RATE.SUBTOTAL.VALIDATOR - notDistributed,
    total: MAX_SUPPLY_TOTAL,
  });
  const nonDistributedRow = new Row({
    rank: 2,
    label: 'Validator Tokens Not Distributed',
    value: notDistributed,
    total: MAX_SUPPLY_TOTAL,
  });
  const subtotalRow = _getSubtotal(3, EXCHANGE_RATE.SUBTOTAL.VALIDATOR);
  return [distributedRow, nonDistributedRow, subtotalRow];
};

const _getLiquidityPoolRows = (accounts, denom) => {
  const notDistributed = getTokensByAccount({
    accounts: accounts,
    name: 'liquidityPool',
    denom: denom,
  });
  const distributedRow = new Row({
    rank: 4,
    label: 'Liquidity pool Tokens Distributed',
    value: EXCHANGE_RATE.SUBTOTAL.LIQUIDITY_POOL - notDistributed,
    total: MAX_SUPPLY_TOTAL,
  });
  const nonDistributedRow = new Row({
    rank: 5,
    label: 'Liquidity pool Tokens Not Distributed',
    value: notDistributed,
    total: MAX_SUPPLY_TOTAL,
  });
  const subtotalRow = _getSubtotal(6, EXCHANGE_RATE.SUBTOTAL.LIQUIDITY_POOL);
  return [distributedRow, nonDistributedRow, subtotalRow];
};

const _getCommunityRows = (accounts, denom) => {
  const notDistributed = getTokensByAccount({
    accounts: accounts,
    name: 'community',
    denom: denom,
  });
  const distributedRow = new Row({
    rank: 7,
    label: 'Community Tokens Distributed',
    value: EXCHANGE_RATE.SUBTOTAL.COMMUNITY - notDistributed,
    total: MAX_SUPPLY_TOTAL,
  });
  const nonDistributedRow = new Row({
    rank: 8,
    label: 'Community Tokens Not Distributed',
    value: notDistributed,
    total: MAX_SUPPLY_TOTAL,
  });
  const subtotalRow = _getSubtotal(9, EXCHANGE_RATE.SUBTOTAL.COMMUNITY);
  return [distributedRow, nonDistributedRow, subtotalRow];
};

const _getFundsRows = (vbrTokens, abrTokens, denom) => {
  const vbrDistributed =
    EXCHANGE_RATE.SUBTOTAL.FUNDS / 2 - getTokensByDenom(vbrTokens, denom);
  const abrDistributed =
    EXCHANGE_RATE.SUBTOTAL.FUNDS / 2 - getTokensByDenom(abrTokens, denom);
  const rewardsNotDistributed =
    EXCHANGE_RATE.SUBTOTAL.FUNDS - vbrDistributed - abrDistributed;
  const vbrRow = new Row({
    rank: 10,
    label: 'VBR Tokens Distributed',
    value: vbrDistributed,
    total: MAX_SUPPLY_TOTAL,
  });
  const abrRow = new Row({
    rank: 11,
    label: 'ABR Tokens Distributed',
    value: abrDistributed,
    total: MAX_SUPPLY_TOTAL,
  });
  const nonDistributedRow = new Row({
    rank: 12,
    label: 'ABR and VBR Rewards Not Distributed',
    value: rewardsNotDistributed,
    total: MAX_SUPPLY_TOTAL,
  });
  const subtotalRow = _getSubtotal(13, EXCHANGE_RATE.SUBTOTAL.FUNDS);
  return [vbrRow, abrRow, nonDistributedRow, subtotalRow];
};

const _getTotalRow = () =>
  new Row({
    rank: 14,
    label: 'Max Supply',
    value: MAX_SUPPLY_TOTAL,
    total: MAX_SUPPLY_TOTAL,
    style: EXCHANGE_RATE.ROW_STYLE.HIGHLIGHTED,
  });

const _getSubtotal = (rank, value) =>
  new Row({
    rank,
    label: 'Subtotal',
    value,
    total: MAX_SUPPLY_TOTAL,
    style: EXCHANGE_RATE.ROW_STYLE.HIGHLIGHTED,
  });
