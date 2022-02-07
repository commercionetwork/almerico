import { EXCHANGE_RATE } from '@/constants';
import {
  getCommonHeaders,
  getTokensByAccount,
  getTokensByDenom,
  Header,
  Row,
  Table,
} from './commons';

export default {
  getTable({ accounts, abrTokens, vbrTokens, denom, translator }) {
    const headers = _getHeaders(translator);
    const total = _getTotal();
    const rows = _getRows({
      accounts,
      abrTokens,
      vbrTokens,
      denom,
      total,
      translator,
    });
    return new Table({ headers, rows, total });
  },
};

const _getHeaders = (translator) => {
  const $t = translator;
  const header = new Header({
    text: $t('labels.maxSupply'),
    value: 'label',
    sortable: false,
    align: 'start',
  });
  const commonHeaders = getCommonHeaders($t);
  return [header].concat(commonHeaders);
};

const _getTotal = () =>
  EXCHANGE_RATE.SUBTOTAL.FUNDS +
  EXCHANGE_RATE.SUBTOTAL.COMMUNITY +
  EXCHANGE_RATE.SUBTOTAL.LIQUIDITY_POOL +
  EXCHANGE_RATE.SUBTOTAL.VALIDATOR;

const _getRows = ({
  accounts,
  abrTokens,
  vbrTokens,
  denom,
  total,
  translator,
}) => {
  const $t = translator;
  const validatorRows = _getValidatorRows({
    accounts,
    denom,
    total,
    translator: $t,
  });
  const liquidityPoolRows = _getLiquidityPoolRows({
    accounts,
    denom,
    total,
    translator: $t,
  });
  const communityRows = _getCommunityRows({
    accounts,
    denom,
    total,
    translator: $t,
  });
  const fundsRows = _getFundsRows({
    vbrTokens,
    abrTokens,
    denom,
    total,
    translator: $t,
  });
  const totalRow = new Row({
    rank: 14,
    label: $t('labels.maxSupply'),
    value: total,
    total,
    style: EXCHANGE_RATE.ROW_STYLE.HIGHLIGHTED,
  });
  return [].concat(validatorRows, liquidityPoolRows, communityRows, fundsRows, [
    totalRow,
  ]);
};

const _getValidatorRows = ({ accounts, denom, total, translator }) => {
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
    total,
  });
  const nonDistributedRow = new Row({
    rank: 2,
    label: $t('labels.validatorTokensNotDistributed'),
    value: notDistributed,
    total,
  });
  const subtotalRow = _getSubtotal({
    rank: 3,
    label: $t('labels.subtotal'),
    value: EXCHANGE_RATE.SUBTOTAL.VALIDATOR,
    total,
  });
  return [distributedRow, nonDistributedRow, subtotalRow];
};

const _getLiquidityPoolRows = ({ accounts, denom, total, translator }) => {
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
    total,
  });
  const nonDistributedRow = new Row({
    rank: 5,
    label: $t('labels.liquidityPoolTokensNotDistributed'),
    value: notDistributed,
    total,
  });
  const subtotalRow = _getSubtotal({
    rank: 6,
    label: $t('labels.subtotal'),
    value: EXCHANGE_RATE.SUBTOTAL.LIQUIDITY_POOL,
    total,
  });
  return [distributedRow, nonDistributedRow, subtotalRow];
};

const _getCommunityRows = ({ accounts, denom, total, translator }) => {
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
    total,
  });
  const nonDistributedRow = new Row({
    rank: 8,
    label: $t('labels.communityTokensNotDistributed'),
    value: notDistributed,
    total,
  });
  const subtotalRow = _getSubtotal({
    rank: 9,
    label: $t('labels.subtotal'),
    value: EXCHANGE_RATE.SUBTOTAL.COMMUNITY,
    total,
  });
  return [distributedRow, nonDistributedRow, subtotalRow];
};

const _getFundsRows = ({ vbrTokens, abrTokens, denom, total, translator }) => {
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
    total,
  });
  const abrRow = new Row({
    rank: 11,
    label: $t('labels.abrTokensDistributed'),
    value: abrDistributed,
    total,
  });
  const nonDistributedRow = new Row({
    rank: 12,
    label: $t('labels.abrAndVbrRewardsNotDistributed'),
    value: rewardsNotDistributed,
    total,
  });
  const subtotalRow = _getSubtotal({
    rank: 13,
    label: $t('labels.subtotal'),
    value: EXCHANGE_RATE.SUBTOTAL.FUNDS,
    total,
  });
  return [vbrRow, abrRow, nonDistributedRow, subtotalRow];
};

const _getSubtotal = ({ rank, label, value, total }) =>
  new Row({
    rank,
    label,
    value,
    total,
    style: EXCHANGE_RATE.ROW_STYLE.HIGHLIGHTED,
  });
