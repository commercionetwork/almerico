import { CUSTOMIZATION } from '@/constants';
import {
  arrayHandler,
  bech32Manager,
  validatorAttendanceCalculator,
  coinAdapter,
  numberIntlFormatter,
} from '@/utils';

class ValidatorsTableAdapter {
  constructor() {
    this.clear();
  }

  clear() {
    this.accountPrefix = null;
    this.blocks = null;
    this.coin = null;
    this.pool = null;
    this.validators = null;
    this.validatorsSet = null;
  }

  setAccountPrefix(prefix) {
    this.accountPrefix = prefix;
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

  setValidators(validators) {
    this.validators = validators;
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

      let votingPower = '-';
      let formattedCumulative = '-';
      let attendance = '-';
      if (active) {
        const power = tokens / bondedTokens;
        cumulative += power;
        votingPower = getPercent(power);
        formattedCumulative = getPercent(cumulative);
        const definedBlocks = validatorAttendanceCalculator.getDefinedBlocks({
          blocks: this.blocks,
          validator: validator,
          validatorsSet: this.validatorsSet,
          limit: CUSTOMIZATION.VALIDATORS.BLOCKS_MONITOR.AMOUNT,
        });
        const attendanceCount = validatorAttendanceCalculator.getAttendanceCount(
          definedBlocks,
        );
        attendance = validatorAttendanceCalculator.getAttendancePercentage(
          attendanceCount,
          CUSTOMIZATION.VALIDATORS.BLOCKS_MONITOR.AMOUNT,
        );
      }

      validatorsTable.push({
        rank: rank,
        active: active,
        moniker: validator.description.moniker,
        operator: validator.operator_address,
        account: getAccountAddress(
          validator.operator_address,
          this.accountPrefix,
        ),
        tokens: coinAdapter.format({ amount: tokens, denom: this.coin }),
        commission: getPercent(
          parseFloat(validator.commission.commission_rates.rate),
        ),
        votingPower: votingPower,
        cumulative: formattedCumulative,
        attendance: attendance,
      });
    }

    this.clear();
    return validatorsTable;
  }
}

const orderValidators = (validators) => {
  const tokensOrdered = arrayHandler.sortObjectsByNumberPropertyValueDesc(
    validators,
    'tokens',
  );
  return arrayHandler.sortObjectsByNumberPropertyValueDesc(
    tokensOrdered,
    'status',
  );
};

const getAccountAddress = (address, prefix) => {
  const hexValue = bech32Manager.decode(address);
  return bech32Manager.encode(hexValue, prefix);
};

const getPercent = (amount) =>
  numberIntlFormatter.toPercent({
    amount: amount,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

export default new ValidatorsTableAdapter();
