import { CUSTOMIZATION, VALIDATOR_STATUS } from '@/constants';
import { bech32Manager, coinAdapter, numberIntlFormatter } from '@/utils';
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
   * @property {Array.<Object>}validatorsSet
   *
   * @param {BuildParam} p
   * @returns {Array.<ValidatorsTableRow>}
   */
  build({ validators, accountPrefix, blocks, coin, pool, validatorsSet }) {
    const sortedValidators = orderBy(
      validators,
      (validator) => parseInt(validator.tokens),
      ['desc'],
    );
    return _getTableRows({
      sortedValidators,
      accountPrefix,
      blocks,
      coin,
      pool,
      validatorsSet,
    });
  },
};

export default validatorsTableAdapter;

const _getTableRows = ({
  sortedValidators,
  accountPrefix,
  blocks,
  coin,
  pool,
  validatorsSet,
}) => {
  let cumulativeCount = 0;
  return sortedValidators.map((validator, i) => {
    const rank = ++i;
    const active = validator.status === VALIDATOR_STATUS.BONDED ? true : false;
    const moniker = validator.description.moniker;
    const operator = validator.operator_address;
    const account = _getAccountAddress(
      validator.operator_address,
      accountPrefix,
    );
    const tokens = coinAdapter.format({
      amount: parseInt(validator.tokens),
      denom: coin,
    });
    const commission = _getPercentage(
      parseFloat(validator.commission.commission_rates.rate),
    );
    const row = new ValidatorsTableRow({
      rank,
      active,
      moniker,
      operator,
      account,
      tokens,
      commission,
    });

    if (active) {
      const extraData = new ValidatorExtraData({
        validator,
        blocks,
        cumulative: cumulativeCount,
        limit: CUSTOMIZATION.VALIDATORS.BLOCKS_MONITOR.AMOUNT,
        pool,
        validatorsSet,
        percentageFormatter: _getPercentage,
      }).data;
      cumulativeCount = extraData.cumulative.count;
      row.cumulative = extraData.cumulative.percentage;
      row.votingPower = extraData.power;
      row.attendance = extraData.attendance;
    }

    return row;
  });
};

const _getAccountAddress = (address, prefix) => {
  const hexValue = bech32Manager.decode(address);
  return bech32Manager.encode(hexValue, prefix);
};

const _getPercentage = (amount) => {
  return numberIntlFormatter.toPercent({
    amount: amount,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
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
  }
}
