import { VALIDATORS } from '@/constants';
import { bech32Manager, coinAdapter } from '@/utils';
import { orderBy } from 'lodash';
import ValidatorExtraData from './ValidatorExtraData';

const validatorsTableAdapter = {
  /**
   * @typedef {Object} BuildParam
   * @property {Array.<Object>} validators
   * @property {String} accountPrefix
   * @property {Array.<Object>} blocks
   * @property {String} coin
   * @property {Object} pool
   *
   * @param {BuildParam} p
   * @returns {Array.<ValidatorsTableRow>}
   */
  build({ validators, accountPrefix, blocks, coin, pool, bookmarks, filter }) {
    const sortedValidators = _sortValidators(validators);
    return _getTableRows({
      sortedValidators,
      accountPrefix,
      blocks,
      coin,
      pool,
      bookmarks,
      filter,
    });
  },
};

export default validatorsTableAdapter;

const _sortValidators = (validators) => {
  const bondedValidators = [];
  const unbondedValidators = [];
  for (const validator of validators) {
    if (validator.status === VALIDATORS.STATUS.BONDED) {
      bondedValidators.push(validator);
    } else {
      unbondedValidators.push(validator);
    }
  }
  const bondedSorted = orderBy(
    bondedValidators,
    (validator) => parseInt(validator.tokens),
    ['desc']
  );
  const unbondedSorted = orderBy(
    unbondedValidators,
    (validator) => parseInt(validator.tokens),
    ['desc']
  );
  return _rank(bondedSorted.concat(unbondedSorted));
};

const _rank = (validators) =>
  validators.map((validator, i) =>
    Object.assign({}, { ...validator }, { rank: ++i })
  );

const _getTableRows = ({
  sortedValidators,
  accountPrefix,
  blocks,
  coin,
  pool,
  bookmarks,
  filter,
}) => {
  let cumulativeCount = 0;
  const rows = sortedValidators.map((validator) => {
    const rank = validator.rank;
    const active = validator.status === VALIDATORS.STATUS.BONDED ? true : false;
    const moniker = validator.description.moniker;
    const operator = validator.operator_address;
    const bookmark =
      bookmarks.findIndex((address) => address === operator) > -1;
    const account = _getAccountAddress(
      validator.operator_address,
      accountPrefix
    );
    const tokens = coinAdapter.format({
      amount: parseInt(validator.tokens),
      denom: coin,
    });
    const commission = _getPercentage(
      parseFloat(validator.commission.commission_rates.rate)
    );
    const row = new ValidatorsTableRow({
      rank,
      active,
      moniker,
      operator,
      account,
      tokens,
      commission,
      bookmark,
    });

    if (active) {
      const extraData = new ValidatorExtraData({
        validator,
        blocks,
        cumulative: cumulativeCount,
        limit: VALIDATORS.CUSTOMIZATION.BLOCKS_MONITOR.AMOUNT,
        pool,
        percentageFormatter: _getPercentage,
      }).data;
      cumulativeCount = extraData.cumulative.count;
      row.cumulative = extraData.cumulative.percentage;
      row.votingPower = extraData.power;
      row.attendance = extraData.attendance;
    }

    return row;
  });

  return _filtering(rows, filter.status);
};

const _getAccountAddress = (address, prefix) => {
  const hexValue = bech32Manager.decode(address);
  return bech32Manager.encode(hexValue, prefix);
};

const _getPercentage = (amount) => {
  return new Intl.NumberFormat(undefined, {
    style: 'percent',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);
};

const _filtering = (rows, status) => {
  if (!status) return rows;
  return rows.filter((row) => {
    if (status === VALIDATORS.FILTER.ACTIVE) {
      return row.active === true;
    } else if (status === VALIDATORS.FILTER.INACTIVE) {
      return row.active === false;
    } else if (status === VALIDATORS.FILTER.BOOKMARK) {
      return row.bookmark === true;
    }
  });
};

class ValidatorsTableRow {
  constructor({
    rank,
    active,
    moniker,
    operator,
    account,
    tokens,
    commission,
    votingPower,
    cumulative,
    attendance,
    bookmark,
  }) {
    this.rank = rank;
    this.active = active;
    this.moniker = moniker;
    this.operator = operator;
    this.account = account;
    this.tokens = tokens;
    this.commission = commission;
    this.votingPower = votingPower;
    this.cumulative = cumulative;
    this.attendance = attendance;
    this.bookmark = bookmark;
  }
}
