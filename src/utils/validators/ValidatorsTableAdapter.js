import { CUSTOMIZATION } from '@/constants';
import {
  arrayHandler,
  bech32Manager,
  BlocksAttendanceCalculator,
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
      const formattedTokens = `${numberIntlFormatter.toDecimal({
        amount: tokens,
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      })} ${this.coin}`;
      const commission = numberIntlFormatter.toPercent({
        amount: parseFloat(validator.commission.commission_rates.rate),
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      });
      const accountAddress = getAccountAddress(
        validator.operator_address,
        this.accountPrefix
      );
      let votingPower = '-';
      let formattedCumulative = '-';
      let attendance = '-';
      if (active) {
        votingPower = numberIntlFormatter.toPercent({
          amount: tokens / bondedTokens,
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        });
        cumulative += tokens / bondedTokens;
        formattedCumulative = numberIntlFormatter.toPercent({
          amount: cumulative,
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        });
        if (this.blocks.length === CUSTOMIZATION.VALIDATORS.CHECKED_BLOCKS) {
          const validatorAttendance = BlocksAttendanceCalculator.setBlocks(
            this.blocks
          )
            .setValidator(validator)
            .setValidatorsSet(this.validatorsSet)
            .get();
          attendance = validatorAttendance.percentage;
        }
      }

      validatorsTable.push({
        rank: rank,
        active: active,
        moniker: validator.description.moniker,
        operator: validator.operator_address,
        account: accountAddress,
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

const getAccountAddress = (address, prefix) => {
  const hexValue = bech32Manager.decode(address);
  return bech32Manager.encode(hexValue, prefix);
};

export default new ValidatorsTableAdapter();
