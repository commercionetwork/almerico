import { EXCHANGE_RATE } from '@/constants';
import { getTokensByDenom, Row } from './index';

export default {
  getRows({
    abrTokens,
    bondedTokens,
    freezedTokens,
    maxSupply,
    supply,
    vbrTokens,
    denom,
  }) {
    const amounts = _getAmounts({
      abrTokens,
      bondedTokens,
      freezedTokens,
      maxSupply,
      supply,
      vbrTokens,
      denom,
    });
    const vbrRow = _getVbrRow(amounts.vbrAmount, amounts.total);
    const abrRow = _getAbrRow(amounts.abrAmount, amounts.total);
    const burnedRow = _getBurnedRow(amounts.burnedAmount, amounts.total);
    const bondedRow = _getBondedRow(amounts.bondedAmount, amounts.total);
    const freezedRow = _getFreezedRow(amounts.freezedAmount, amounts.total);
    const unclaimedRewardsRow = _getUnclaimedRewardsRow();
    const totalRow = _getTotalRow(amounts.total);
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

const _getVbrRow = (vbrTokens, total) => {
  return new Row({
    rank: 1,
    label: 'VBR Tokens Not Distributed',
    value: vbrTokens,
    total,
  });
};

const _getAbrRow = (abrTokens, total) => {
  return new Row({
    rank: 2,
    label: 'ABR Tokens Not Distributed',
    value: abrTokens,
    total,
  });
};

const _getBurnedRow = (burnedTokens, total) => {
  return new Row({
    rank: 3,
    label: 'Burned',
    value: burnedTokens,
    total,
  });
};

const _getBondedRow = (bondedTokens, total) => {
  return new Row({
    rank: 4,
    label: 'Bonded Tokens',
    value: bondedTokens,
    total,
  });
};

const _getFreezedRow = (freezedTokens, total) => {
  return new Row({
    rank: 5,
    label: 'Freezed Tokens',
    value: freezedTokens,
    total,
  });
};

const _getUnclaimedRewardsRow = () => {
  return new Row({
    rank: 6,
    label: 'Unclaimed Rewards',
    value: 'Coming soon',
    style: EXCHANGE_RATE.ROW_STYLE.COMING_SOON,
  });
};

const _getTotalRow = (total) =>
  new Row({
    rank: 7,
    label: 'Total Non Circulating Supply',
    value: total,
    total,
    style: EXCHANGE_RATE.ROW_STYLE.HIGHLIGHTED,
  });
