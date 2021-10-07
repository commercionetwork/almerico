import { CUSTOMIZATION } from '@/constants';
import { bech32Manager, numberIntlFormatter } from '@/utils';
import { orderBy, take } from 'lodash';

const validatorDetailsBlocksHelper = {
  defineBlocksAttendance({ blocks, validator, validatorsSet }) {
    if (blocks.length < CUSTOMIZATION.VALIDATORS.BLOCKS_MONITOR.AMOUNT) {
      return [];
    }
    const trackedBlocks = _restrictBlocks(blocks);
    const address = _decodeAddress({ validator, validatorsSet });
    const definedData = _checkBlocks({ blocks: trackedBlocks, address });
    const attendance = _calculateAttendance(definedData);
    return {
      blocks: definedData,
      count: attendance.count,
      percentage: attendance.percentage,
    };
  },
};

export default validatorDetailsBlocksHelper;

const _restrictBlocks = (blocks) => {
  const sortedBlocks = orderBy(blocks, (block) => block.header.height, [
    'desc',
  ]);
  return take(sortedBlocks, CUSTOMIZATION.VALIDATORS.BLOCKS_MONITOR.AMOUNT);
};

const _decodeAddress = ({ validator, validatorsSet }) => {
  const index = validatorsSet.findIndex(
    (val) => val.pub_key === validator.consensus_pubkey,
  );
  return index > -1 ? bech32Manager.decode(validatorsSet[index].address) : null;
};

const _checkBlocks = ({ blocks, address }) => {
  return blocks.map((block) => {
    const index = block.last_commit.signatures.findIndex(
      (signature) =>
        signature.validator_address.toUpperCase() === address.toUpperCase(),
    );
    const data = new VerifiedData({ block, index });
    return data.result;
  });
};

class VerifiedData {
  constructor({ block, index }) {
    this.block = block;
    this.index = index;
  }

  get result() {
    return {
      height: this.block.header.height,
      status: this.index > -1 ? 1 : 0,
    };
  }
}

const _calculateAttendance = (data) => {
  const count = data.filter((it) => it.status > 0).length;
  const percentage = _calcPercentage(count);
  return { count, percentage };
};

const _calcPercentage = (amount) =>
  numberIntlFormatter.toPercent({
    amount: amount / CUSTOMIZATION.VALIDATORS.BLOCKS_MONITOR.AMOUNT,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
