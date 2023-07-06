import { PROPOSALS } from '@/constants';

const proposalDetailHelper = {
  getStatsData(pool, tally, tallyParams) {
    return {
      minimum: _getMinimumStaked(pool, tallyParams),
      turnout: _getTurnout(pool, tally),
      votes: _getVotes(tally),
    };
  },
  getVoteLabel(vote) {
    return _getLabel(vote);
  },
};

export default proposalDetailHelper;

const _getLabel = (vote) => {
  if (!vote) return '';
  const optionIndex = PROPOSALS.VOTE_OPTIONS.findIndex(
    (option) => option.value === vote.options[0].option
  );
  return optionIndex < 0 ? '' : PROPOSALS.VOTE_OPTIONS[optionIndex].label;
};

const _getMinimumStaked = (pool, params) => {
  return {
    amount: _formatDecimal(
      (parseInt(pool.bonded_tokens) * parseFloat(params.quorum)) / 1000000
    ),
    percentage: _formatPercent(params.quorum),
  };
};

const _getTurnout = (pool, tally) => {
  const total = _calcTotal(tally);
  return _formatPercent(total / parseInt(pool.bonded_tokens));
};

const _getVotes = (tally) => {
  const total = _calcTotal(tally);
  const data = { ...tally };
  for (const k in data) {
    data[k] = {
      label: _getLabelFromOption(k),
      amount: _formatDecimal(data[k] / 1000000),
      percentage: _formatPercent(data[k] / total),
      raw_amount: data[k],
    };
  }
  return data;
};

const _formatDecimal = (amount) =>
  new Intl.NumberFormat(undefined, {
    style: 'decimal',
    maximumFractionDigits: 6,
    minimumFractionDigits: 6,
  }).format(amount);

const _formatPercent = (amount) =>
  new Intl.NumberFormat(undefined, {
    style: 'percent',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);

const _calcTotal = (data) => {
  let tot = 0;
  for (const k in data) {
    tot += parseInt(data[k]);
  }
  return tot;
};

const _getLabelFromOption = (tag) => {
  const option = PROPOSALS.VOTE_OPTIONS.find((option) => option.tag === tag);
  return option.label;
};
