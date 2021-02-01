import { arrayHandler, bech32Manager } from '../index';
import { CUSTOMIZATION } from '@/constants';

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
    const blocks =
      this.blocks.length >= CUSTOMIZATION.VALIDATORS.CHECKED_BLOCKS
        ? restrictBlocks(this.blocks, CUSTOMIZATION.VALIDATORS.CHECKED_BLOCKS)
        : [];

    let cumulative = 0;
    let rank = 0;
    let validatorsTable = [];

    orderedvalidators.forEach((validator) => {
      rank++;
      const active = validator.status === 2 ? true : false;
      const tokens = parseInt(validator.tokens);
      const formattedTokens =
        new Intl.NumberFormat(undefined, {
          maximumFractionDigits: 0,
        }).format(tokens / 1000000) +
        ' ' +
        this.coin;
      const commission = toPercent(
        parseFloat(validator.commission.commission_rates.rate),
        0,
        0
      );
      let votingPower = '-';
      let formattedCumulative = '-';
      let attendance = '-';
      if (active) {
        votingPower = toPercent(tokens / bondedTokens, 2, 2);
        cumulative += tokens / bondedTokens;
        formattedCumulative = toPercent(cumulative, 2, 2);
        const hex = getDecodeAddress(validator, this.validatorsSet);
        if (hex !== '' && blocks.length > 0) {
          attendance = getAttendance(blocks, hex);
        }
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
    });

    this.clear();
    return validatorsTable;
  }
}

const toPercent = (x, maximumFractionDigits, minimumFractionDigits) =>
  new Intl.NumberFormat(undefined, {
    style: 'percent',
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(x);

const getAttendance = (blocks, address) => {
  const missingCounter = getMissingBlocksCount(blocks, address);
  return toPercent((100 - missingCounter) / 100, 2, 2);
};

const getMissingBlocksCount = (blocks, address) => {
  let count = 0;
  blocks.forEach((block) => {
    const index = block.last_commit.signatures.findIndex(
      (signature) =>
        signature.validator_address.toUpperCase() === address.toUpperCase()
    );
    if (index < 0) count++;
  });
  return count;
};

const getDecodeAddress = (validator, validatorsSet) => {
  const index = validatorsSet.findIndex(
    (val) => val.pub_key === validator.consensus_pubkey
  );
  return index > -1 ? bech32Manager.decode(validatorsSet[index].address) : '';
};

const restrictBlocks = (blocks, limit) => {
  let orderedBlocks = getOrderedBlocks({
    blocks: blocks,
    prop: ['header', 'height'],
  });
  return orderedBlocks.slice(
    orderedBlocks.length - limit,
    orderedBlocks.length
  );
};

const getOrderedBlocks = ({ blocks, prop }) =>
  blocks.sort((a, b) => b[prop[0]][prop[1]] - a[prop[0]][prop[1]]);

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
