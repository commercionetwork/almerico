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
    label: $t('labels.validatorTokensDistributed'),
    value: EXCHANGE_RATE.SUBTOTAL.VALIDATOR - notDistributed,
    total: MAX_SUPPLY_TOTAL,
  });
  const nonDistributedRow = new Row({
    rank: 2,
    label: $t('labels.validatorTokensNotDistributed'),
    value: notDistributed,
    total: MAX_SUPPLY_TOTAL,
  });
  const subtotalRow = _getSubtotal(
    3,
    EXCHANGE_RATE.SUBTOTAL.VALIDATOR,
    $t('labels.subtotal'),
  );
  return [distributedRow, nonDistributedRow, subtotalRow];
};

const _getLiquidityPoolRows = (accounts, denom, translator) => {
  const $t = translator;
  const notDistributed = getTokensByAccount({
    accounts: accounts,
    name: 'liquidityPool',
    denom: denom,
  });
  const distributedRow = new Row({
    rank: 4,
    label: $t('labels.liquidityPoolTokensDistributed'),
    value: EXCHANGE_RATE.SUBTOTAL.LIQUIDITY_POOL - notDistributed,
    total: MAX_SUPPLY_TOTAL,
  });
  const nonDistributedRow = new Row({
    rank: 5,
    label: $t('labels.liquidityPoolTokensNotDistributed'),
    value: notDistributed,
    total: MAX_SUPPLY_TOTAL,
  });
  const subtotalRow = _getSubtotal(
    6,
    EXCHANGE_RATE.SUBTOTAL.LIQUIDITY_POOL,
    $t('labels.subtotal'),
  );
  return [distributedRow, nonDistributedRow, subtotalRow];
};

const _getCommunityRows = (accounts, denom, translator) => {
  const $t = translator;
  const notDistributed = getTokensByAccount({
    accounts: accounts,
    name: 'community',
    denom: denom,
  });
  const distributedRow = new Row({
    rank: 7,
    label: $t('labels.communityTokensDistributed'),
    value: EXCHANGE_RATE.SUBTOTAL.COMMUNITY - notDistributed,
    total: MAX_SUPPLY_TOTAL,
  });
  const nonDistributedRow = new Row({
    rank: 8,
    label: $t('labels.communityTokensNotDistributed'),
    value: notDistributed,
    total: MAX_SUPPLY_TOTAL,
  });
  const subtotalRow = _getSubtotal(
    9,
    EXCHANGE_RATE.SUBTOTAL.COMMUNITY,
    $t('labels.subtotal'),
  );
  return [distributedRow, nonDistributedRow, subtotalRow];
};

const _getFundsRows = (vbrTokens, abrTokens, denom, translator) => {
  const $t = translator;
  const vbrDistributed =
    EXCHANGE_RATE.SUBTOTAL.FUNDS / 2 - getTokensByDenom(vbrTokens, denom);
  const abrDistributed =
    EXCHANGE_RATE.SUBTOTAL.FUNDS / 2 - getTokensByDenom(abrTokens, denom);
  const rewardsNotDistributed =
    EXCHANGE_RATE.SUBTOTAL.FUNDS - vbrDistributed - abrDistributed;
  const vbrRow = new Row({
    rank: 10,
    label: $t('labels.vbrTokensDistributed'),
    value: vbrDistributed,
    total: MAX_SUPPLY_TOTAL,
  });
  const abrRow = new Row({
    rank: 11,
    label: $t('labels.abrTokensDistributed'),
    value: abrDistributed,
    total: MAX_SUPPLY_TOTAL,
  });
  const nonDistributedRow = new Row({
    rank: 12,
    label: $t('labels.abrAndVbrRewardsNotDistributed'),
    value: rewardsNotDistributed,
    total: MAX_SUPPLY_TOTAL,
  });
  const subtotalRow = _getSubtotal(
    13,
    EXCHANGE_RATE.SUBTOTAL.FUNDS,
    $t('labels.subtotal'),
  );
  return [vbrRow, abrRow, nonDistributedRow, subtotalRow];
};

const _getTotalRow = (translator) => {
  const $t = translator;
  return new Row({
    rank: 14,
    label: $t('labels.maxSupply'),
    value: MAX_SUPPLY_TOTAL,
    total: MAX_SUPPLY_TOTAL,
    style: EXCHANGE_RATE.ROW_STYLE.HIGHLIGHTED,
  });
};

const _getSubtotal = (rank, value, label) =>
  new Row({
    rank,
    label,
    value,
    total: MAX_SUPPLY_TOTAL,
    style: EXCHANGE_RATE.ROW_STYLE.HIGHLIGHTED,
  });
