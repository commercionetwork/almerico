import { arrayHandler, bech32Manager } from '../index';

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
    this.blocks = restrictBlocks(blocks, 100);
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
    const bondedTokens = parseInt(this.pool.bonded_tokens);
    const tokensOrdered = arrayHandler.sortObjectsByNumberPropertyValueDesc(
      this.validators,
      'tokens'
    );
    const statusOrdered = arrayHandler.sortObjectsByNumberPropertyValueDesc(
      tokensOrdered,
      'status'
    );
    let cumulative = 0;
    let rank = 0;
    let validatorsTable = [];

    statusOrdered.forEach((validator) => {
      rank++;
      const active = validator.status === 2 ? true : false;
      const tokens = parseInt(validator.tokens);
      const commission = parseFloat(validator.commission.commission_rates.rate);
      let votingPower = 0;
      let missingCounter = 0;
      if (active) {
        votingPower = tokens / bondedTokens;
        cumulative += votingPower;
        const hex = getDecodeAddress(validator, this.validatorsSet);
        if (hex !== '') {
          getMissingBlocksCount(this.blocks, hex);
        }
      }

      validatorsTable.push({
        rank: rank,
        active: active,
        moniker: validator.description.moniker,
        operator: validator.operator_address,
        tokens:
          new Intl.NumberFormat(undefined, {
            maximumFractionDigits: 0,
          }).format(tokens / 1000000) +
          ' ' +
          this.coin,
        commission: toPercent(commission, 0, 0),
        votingPower: active ? toPercent(votingPower, 2, 2) : '-',
        cumulative: active ? toPercent(cumulative, 2, 2) : '-',
        attendance: active
          ? toPercent((100 - missingCounter) / 100, 2, 2)
          : '-',
      });
    });

    this.clear();
    return validatorsTable;
  }
}

const getMissingBlocksCount = (blocks, address) => {
  let count = 0;
  blocks.forEach((block) => {
    const signatures = block.last_commit.signatures;
    const index = signatures.findIndex(
      (signature) =>
        signature.validator_address.toUpperCase() === address.toUpperCase()
    );
    if (index > -1) count++;
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
  let orderedBlocks = [];
  if (blocks.length > 0) {
    orderedBlocks = getOrderedBlocks({
      blocks: blocks,
      prop: ['header', 'height'],
    });
  }
  return orderedBlocks.length > limit
    ? orderedBlocks.slice(orderedBlocks.length - limit, orderedBlocks.length)
    : orderedBlocks;
};

const getOrderedBlocks = ({ blocks, prop }) =>
  blocks.sort((a, b) => b[prop[0]][prop[1]] - a[prop[0]][prop[1]]);

const toPercent = (x, maximumFractionDigits, minimumFractionDigits) =>
  new Intl.NumberFormat(undefined, {
    style: 'percent',
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(x);

export default new ValidatorsTableAdapter();
