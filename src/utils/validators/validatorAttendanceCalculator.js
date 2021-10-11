import { bech32Manager, numberIntlFormatter } from '@/utils';
import { orderBy, take } from 'lodash';

const validatorAttendanceCalculator = {
  /**
   * @typedef {Object} GetDefinedBlocksParam
   * @property {Array.<Object>} blocks
   * @property {Object} validator
   * @property {Array.<Object>} validatorsSet
   * @property {Number} limit
   *
   * @param {GetDefinedBlocksParam} p
   * @returns {Array.<Object>}
   */
  getDefinedBlocks({ blocks, validator, validatorsSet, limit }) {
    if (blocks.length < limit) {
      return [];
    }
    const trackedBlocks = _restrictBlocks(blocks, limit);
    const address = _decodeAddress({ validator, validatorsSet });
    return _checkBlocks({ blocks: trackedBlocks, address });
  },
  /**
   *
   * @param {Array.<Object>} definedBlocks
   * @returns {Number}
   */
  getAttendanceCount(definedBlocks) {
    return definedBlocks.filter((it) => it.status > 0).length;
  },
  /**
   *
   * @param {Number} count
   * @param {Number} limit
   * @returns {String}
   */
  getAttendancePercentage(count, limit) {
    return _calculatePercentage(count, limit);
  },
};

export default validatorAttendanceCalculator;

const _restrictBlocks = (blocks, limit) => {
  const sortedBlocks = orderBy(blocks, (block) => block.header.height, [
    'desc',
  ]);
  return take(sortedBlocks, limit);
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

const _calculatePercentage = (amount, limit) =>
  numberIntlFormatter.toPercent({
    amount: amount / limit,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
