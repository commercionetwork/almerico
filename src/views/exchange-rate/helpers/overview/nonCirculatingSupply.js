import { EXCHANGE_RATE } from '@/constants';
import {
  getCommonHeaders,
  getTokensByDenom,
  Header,
  Row,
  Table,
} from './commons';

export default {
  getTable({
    abrTokens,
    bondedTokens,
    // freezedTokens,
    maxSupply,
    supply,
    vbrTokens,
    denom,
    translator,
  }) {
    const headers = _getHeaders(translator);
    const amounts = _getAmounts({
      abrTokens,
      bondedTokens,
      // freezedTokens,
      maxSupply,
      supply,
      vbrTokens,
      denom,
    });
    const rows = _getRows(amounts, translator);
    const total = amounts.total;
    return new Table({ headers, rows, total });
  },
};

const _getHeaders = (translator) => {
  const $t = translator;
  const header = new Header({
    text: $t('labels.nonCirculatingSupply'),
    value: 'label',
    sortable: false,
    align: 'start',
  });
  const commonHeaders = getCommonHeaders($t);
  return [header].concat(commonHeaders);
};

const _getRows = (amounts, translator) => {
  const $t = translator;
  const vbrRow = new Row({
    rank: 1,
    label: $t('labels.vbrTokensNotDistributed'),
    value: amounts.vbrAmount,
    total: amounts.total,
  });
  const abrRow = new Row({
    rank: 2,
    label: $t('labels.abrTokensNotDistributed'),
    value: amounts.abrAmount,
    total: amounts.total,
  });
  const burnedRow = new Row({
    rank: 3,
    label: $t('labels.burned'),
    value: amounts.burnedAmount,
    total: amounts.total,
  });
  const bondedRow = new Row({
    rank: 4,
    label: $t('labels.bondedTokens'),
    value: amounts.bondedAmount,
    total: amounts.total,
  });
  const freezedRow = new Row({
    rank: 5,
    label: $t('labels.freezedTokens'),
    value: amounts.freezedAmount,
    total: amounts.total,
  });
  const unclaimedRewardsRow = new Row({
    rank: 6,
    label: $t('labels.unclaimedRewards'),
    value: $t('msgs.comingSoon'),
    style: EXCHANGE_RATE.ROW_STYLE.COMING_SOON,
  });
  const totalRow = new Row({
    rank: 7,
    label: $t('labels.totalNonCirculatingSupply'),
    value: amounts.total,
    total: amounts.total,
    style: EXCHANGE_RATE.ROW_STYLE.HIGHLIGHTED,
  });
  return [
    vbrRow,
    abrRow,
    burnedRow,
    bondedRow,
    freezedRow,
    unclaimedRewardsRow,
    totalRow,
  ];
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
