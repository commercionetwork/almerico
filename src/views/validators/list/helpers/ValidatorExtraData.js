import validatorAttendanceCalculator from '../../helpers/validatorAttendanceCalculator';

export default class ValidatorExtraData {
  constructor({
    validator,
    blocks,
    cumulative,
    limit,
    pool,
    validatorSets,
    percentageFormatter,
  }) {
    this.validator = validator;
    this.blocks = blocks;
    this.cumulative = cumulative;
    this.limit = limit;
    this.pool = pool;
    this.validatorSets = validatorSets;
    this.percentageFormatter = percentageFormatter;
  }

  get data() {
    const power = this._getPower(this.validator, this.pool);
    this.cumulative += power.count;
    const cumulativePercentage = this.percentageFormatter(this.cumulative);
    const votingPower = this.percentageFormatter(power.count);
    const attendance = this._getAttendance({
      blocks: this.blocks,
      validator: this.validator,
      validatorSets: this.validatorSets,
      limit: this.limit,
    });
    return new ExtraData({
      cumulative: new Cumulative(this.cumulative, cumulativePercentage),
      power: votingPower,
      attendance,
    });
  }

  _getPower(validator, pool) {
    const tokens = parseInt(validator.tokens);
    const bondedTokens = parseInt(pool.bonded_tokens);
    return new Power(tokens, bondedTokens);
  }

  _getAttendance({ blocks, validator, validatorSets, limit }) {
    const definedBlocks = validatorAttendanceCalculator.getDefinedBlocks({
      blocks: blocks,
      validator: validator,
      validatorSets: validatorSets,
      limit: limit,
    });
    const attendanceCount =
      validatorAttendanceCalculator.getAttendanceCount(definedBlocks);
    return validatorAttendanceCalculator.getAttendancePercentage(
      attendanceCount,
      limit,
    );
  }
}

class Power {
  constructor(tokens, bondedTokens) {
    this.tokens = tokens;
    this.bondedTokens = bondedTokens;
  }

  get count() {
    return this.tokens / this.bondedTokens;
  }
}

class ExtraData {
  constructor({ cumulative, power, attendance }) {
    this.cumulative = cumulative;
    this.power = power;
    this.attendance = attendance;
  }
}

class Cumulative {
  constructor(count, percentage) {
    this.count = count;
    this.percentage = percentage;
  }
}
