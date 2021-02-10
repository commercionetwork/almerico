import { arrayHandler, BlocksAttendanceCalculator } from '@/utils';

class ValidatorsTableAdapter {
  constructor() {
    this.clear();
  }

  clear() {
    this.validators = null;
    this.blocks = null;
    this.coin = null;
    this.pool = null;
    this.validatorsSet = null;
  }

  setValidators(validators) {
    this.validators = validators;
    return this;
  }

  setBlocks(blocks) {
    this.blocks = blocks;
    return this;
  }

  setCoin(coin) {
    this.coin = coin;
    return this;
  }

  setPool(pool) {
    this.pool = pool;
    return this;
  }

  setValidatorsSet(validatorsSet) {
    this.validatorsSet = validatorsSet;
    return this;
  }

  get() {
    const orderedvalidators = orderValidators(this.validators);
    const bondedTokens = parseInt(this.pool.bonded_tokens);

    let cumulative = 0;
    let rank = 0;
    let validatorsTable = [];

    for (const validator of orderedvalidators) {
      rank++;
      const active = validator.status === 2 ? true : false;
      const tokens = parseInt(validator.tokens);
      const formattedTokens = `${toDecimal(tokens)} ${this.coin}`;
      const commission = toPercent(
        parseFloat(validator.commission.commission_rates.rate)
      );
      let votingPower = '-';
      let formattedCumulative = '-';
      let attendance = '-';
      if (active) {
        votingPower = toPercent(tokens / bondedTokens);
        cumulative += tokens / bondedTokens;
        formattedCumulative = toPercent(cumulative);
        const validatorAttendance = BlocksAttendanceCalculator.setBlocks(
          this.blocks
        )
          .setValidator(validator)
          .setValidatorsSet(this.validatorsSet)
          .get();
        attendance = validatorAttendance.percentage;
      }

      validatorsTable.push({
        rank: rank,
        active: active,
        moniker: validator.description.moniker,
        operator: validator.operator_address,
        tokens: formattedTokens,
        commission: commission,
        votingPower: votingPower,
        cumulative: formattedCumulative,
        attendance: attendance,
      });
    }

    this.clear();
    return validatorsTable;
  }
}

const toDecimal = (amount) =>
  new Intl.NumberFormat(undefined, {
    style: 'decimal',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);

const toPercent = (amount) =>
  new Intl.NumberFormat(undefined, {
    style: 'percent',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);

const orderValidators = (validators) => {
  const tokensOrdered = arrayHandler.sortObjectsByNumberPropertyValueDesc(
    validators,
    'tokens'
  );
  return arrayHandler.sortObjectsByNumberPropertyValueDesc(
    tokensOrdered,
    'status'
  );
};

export default new ValidatorsTableAdapter();
