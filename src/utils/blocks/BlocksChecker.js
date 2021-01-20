import { bech32Manager } from '@/utils';

class BlocksChecker {
  constructor() {
    this.clear();
  }

  clear() {
    this.blocks = null;
    this.validator = null;
    this.validatorsSet = null;
    this.items = null;
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

  setItems(items) {
    this.items = items;
    return this;
  }

  get() {
    let checkedBlocks = [];

    const hex = getDecodeAddress(this.validator, this.validatorsSet);
    if (hex !== '') {
      const orderedBlocks = getOrderedBlocks({
        blocks: this.blocks,
        prop: ['header', 'height'],
        amount: this.items,
      });
      checkedBlocks = setMissingBlocks({
        blocks: orderedBlocks,
        prop: 'missing',
        hex: hex,
      });
    }

    this.clear;
    return checkedBlocks;
  }
}

const setMissingBlocks = ({ blocks, prop, hex }) =>
  blocks.map((block) => {
    block[prop] = getMissingBlock(block, hex);
    return block;
  });

const getMissingBlock = (block, hex) => {
  const index = block.last_commit.signatures.findIndex(
    (signature) =>
      signature.validator_address.toUpperCase() === hex.toUpperCase()
  );
  return index > -1 ? false : true;
};

const getOrderedBlocks = ({ blocks, prop, amount }) =>
  blocks
    .sort((a, b) => b[prop[0]][prop[1]] - a[prop[0]][prop[1]])
    .slice(0, amount);

const getDecodeAddress = (validator, validatorsSet) => {
  const index = validatorsSet.findIndex(
    (val) => val.pub_key === validator.consensus_pubkey
  );
  return index > -1 ? bech32Manager.decode(validatorsSet[index].address) : '';
};

export default new BlocksChecker();
