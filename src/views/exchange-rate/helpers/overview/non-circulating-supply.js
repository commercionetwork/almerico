import { EXCHANGE_RATE } from '@/constants';
import { getTokensByDenom, Row } from './commons';

export default {
  getRows({
    abrTokens,
    bondedTokens,
    freezedTokens,
    maxSupply,
    supply,
    vbrTokens,
    denom,
    translator,
  }) {
    const $t = translator;
    const amounts = _getAmounts({
      abrTokens,
      bondedTokens,
      freezedTokens,
      maxSupply,
      supply,
      vbrTokens,
      denom,
    });
    const vbrRow = _getVbrRow(
      amounts.vbrAmount,
      amounts.total,
      $t('labels.vbrTokensNotDistributed'),
    );
    const abrRow = _getAbrRow(
      amounts.abrAmount,
      amounts.total,
      $t('labels.abrTokensNotDistributed'),
    );
    const burnedRow = _getBurnedRow(
      amounts.burnedAmount,
      amounts.total,
      $t('labels.burned'),
    );
    const bondedRow = _getBondedRow(
      amounts.bondedAmount,
      amounts.total,
      $t('labels.bondedTokens'),
    );
    const freezedRow = _getFreezedRow(
      amounts.freezedAmount,
      amounts.total,
      $t('labels.freezedTokens'),
    );
    const unclaimedRewardsRow = _getUnclaimedRewardsRow(
      $t('labels.unclaimedRewards'),
      $t('msgs.comingSoon'),
    );
    const totalRow = _getTotalRow(
      amounts.total,
      $t('labels.totalNonCirculatingSupply'),
    );
    return [
      vbrRow,
      abrRow,
      burnedRow,
      bondedRow,
      freezedRow,
      unclaimedRewardsRow,
      totalRow,
    ];
  },
  getTotal({
    abrTokens,
    bondedTokens,
    freezedTokens,
    maxSupply,
    supply,
    vbrTokens,
    denom,
  }) {
    return _getAmounts({
      abrTokens,
      bondedTokens,
      freezedTokens,
      maxSupply,
      supply,
      vbrTokens,
      denom,
    }).total;
  },
};

const _getAmounts = ({
  abrTokens,
  bondedTokens,
  // freezedTokens,
  maxSupply,
  supply,
  vbrTokens,
  denom,
}) => {
  const vbrAmount = getTokensByDenom(vbrTokens, denom);
  const abrAmount = getTokensByDenom(abrTokens, denom);
  const burnedAmount = maxSupply - getTokensByDenom(supply, denom);
  const bondedAmount = parseFloat(bondedTokens) / 1000000;
  const freezedAmount = 0; //TODO: to implement when API will be ready
  const total =
    vbrAmount + abrAmount + burnedAmount + bondedAmount + freezedAmount;
  return {
    vbrAmount,
    abrAmount,
    burnedAmount,
    bondedAmount,
    freezedAmount,
    total,
  };
};

const _getVbrRow = (vbrTokens, total, label) => {
  return new Row({
    rank: 1,
    label,
    value: vbrTokens,
    total,
  });
};

const _getAbrRow = (abrTokens, total, label) => {
  return new Row({
    rank: 2,
    label,
    value: abrTokens,
    total,
  });
};

const _getBurnedRow = (burnedTokens, total, label) => {
  return new Row({
    rank: 3,
    label,
    value: burnedTokens,
    total,
  });
};

const _getBondedRow = (bondedTokens, total, label) => {
  return new Row({
    rank: 4,
    label,
    value: bondedTokens,
    total,
  });
};

const _getFreezedRow = (freezedTokens, total, label) => {
  return new Row({
    rank: 5,
    label,
    value: freezedTokens,
    total,
  });
};

const _getUnclaimedRewardsRow = (label, msg) => {
  return new Row({
    rank: 6,
    label,
    value: msg,
    style: EXCHANGE_RATE.ROW_STYLE.COMING_SOON,
  });
};

const _getTotalRow = (total, label) =>
  new Row({
    rank: 7,
    label,
    value: total,
    total,
    style: EXCHANGE_RATE.ROW_STYLE.HIGHLIGHTED,
  });
