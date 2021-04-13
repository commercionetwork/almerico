import { CUSTOMIZATION } from '@/constants';
import { bech32Manager, numberIntlFormatter } from '@/utils';

class BlocksAttendanceCalculator {
  constructor() {
    this.clear();
  }

  clear() {
    this.blocks = null;
    this.validator = null;
    this.validatorsSet = null;
  }

  setBlocks(blocks) {
    this.blocks = blocks;
    return this;
  }

  setValidator(validator) {
    this.validator = validator;
    return this;
  }

  setValidatorsSet(validatorsSet) {
    this.validatorsSet = validatorsSet;
    return this;
  }

  get() {
    const hex = decodeAddress({
      validator: this.validator,
      validatorsSet: this.validatorsSet,
    });
    return hex !== null
      ? getBlocksAttendance({ blocks: this.blocks, address: hex })
      : null;
  }
}

const getBlocksAttendance = ({ blocks, address }) => {
  let count = 0;
  let checkedBlocks = [];
  let checkedBlock = {};

  for (const block of blocks) {
    const index = block.last_commit.signatures.findIndex(
      (signature) =>
        signature.validator_address.toUpperCase() === address.toUpperCase(),
    );
    if (index > -1) {
      checkedBlock = buildBlock({
        height: block['header']['height'],
        status: 1,
      });
      count++;
    } else {
      checkedBlock = buildBlock({
        height: block['header']['height'],
        status: 0,
      });
    }
    checkedBlocks.push(checkedBlock);
  }
  let percentage = calcPercent({
    count: count,
    limit: CUSTOMIZATION.VALIDATORS.BLOCKS_MONITOR.AMOUNT,
  });
  return {
    blocks: checkedBlocks,
    count: count,
    percentage: percentage,
  };
};

const buildBlock = ({ height, status }) => ({ height: height, status: status });

const decodeAddress = ({ validator, validatorsSet }) => {
  const index = validatorsSet.findIndex(
    (val) => val.pub_key === validator.consensus_pubkey,
  );
  return index > -1 ? bech32Manager.decode(validatorsSet[index].address) : null;
};

const calcPercent = ({ count, limit }) =>
  numberIntlFormatter.toPercent({
    amount: count / limit,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

export default new BlocksAttendanceCalculator();
