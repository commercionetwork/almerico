import { bech32Manager } from '@/utils';
import { orderBy, take } from 'lodash';

const validatorAttendanceCalculator = {
  /**
   * @typedef {Object} GetDefinedBlocksParam
   * @property {Array.<Object>} blocks
   * @property {Object} validator
   * @property {Number} limit
   *
   * @param {GetDefinedBlocksParam} p
   * @returns {Array.<Object>}
   */
  getDefinedBlocks({ blocks, validator, limit }) {
    if (blocks.length < limit) {
      return [];
    }
    const trackedBlocks = _restrictBlocks(blocks, limit);
    let definedBlocks;
    try {
      definedBlocks = _allocateBlocks({
        blocks: trackedBlocks,
        validator: validator,
        isList: true,
      });
    } catch (error) {
      definedBlocks = [];
    }
    return definedBlocks;
  },
  /**
   * @typedef {Object} GetDefinedBlocksParam
   * @property {Array.<Object>} blocks
   * @property {Object} validator
   * @property {Number} limit
   *
   * @param {GetDefinedBlocksParam} p
   * @returns {Array.<Object>}
   */
  getDetailDefinedBlocks({ blocks, validator, limit }) {
    if (validator.status !== 3 || blocks.length < limit) {
      return [];
    }
    const trackedBlocks = _restrictBlocks(blocks, limit);
    let definedBlocks;
    try {
      definedBlocks = _allocateBlocks({
        blocks: trackedBlocks,
        validator: validator,
        isList: false,
      });
    } catch (error) {
      definedBlocks = [];
    }
    return definedBlocks;
  },
  /**
   *
   * @param {Array.<Object>} allocatedBlocks
   * @returns {Number}
   */
  getAttendanceCount(allocatedBlocks) {
    return allocatedBlocks.filter((it) => it.status > 0).length;
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
  const sortedBlocks = orderBy(blocks, (it) => it.block_height, ['desc']);
  return take(sortedBlocks, limit);
};

const _allocateBlocks = ({ blocks, validator, isList }) => {
  return blocks.map((it) => {
    const validators = it.validators;
    const hexAddress = _getHexAddress({ validator, validators, isList });
    if (!hexAddress) throw new Exception('Address not found', 404);
    const index = it.block.last_commit.signatures.findIndex(
      (signature) =>
        signature.validator_address.toUpperCase() === hexAddress.toUpperCase()
    );
    const data = new VerifiedData({ block: it.block, index });
    return data.result;
  });
};

const _getHexAddress = ({ validator, validators, isList }) => {
  const key = isList ? 'key' : 'value';
  const index = validators.findIndex(
    (val) => val.pub_key.value === validator.consensus_pubkey[key]
  );
  return index > -1 ? bech32Manager.decode(validators[index].address) : null;
};

const _calculatePercentage = (amount, limit) =>
  new Intl.NumberFormat(undefined, {
    style: 'percent',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount / limit);

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

function Exception(message, code) {
  this.message = message;
  this.code = code;
}
