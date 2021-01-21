import { proposerHandler } from '@/utils';

class BlocksTableAdapter {
  constructor() {
    this.clear();
  }

  clear() {
    this.blocks = null;
    this.validators = null;
    this.validatorsSet = null;
    this.prefix = null;
  }

  setBlocks(blocks) {
    this.blocks = blocks;
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

  setValidatorConsensusPrefix(prefix) {
    this.prefix = prefix;
    return this;
  }

  get() {
    let tableBlocks = [];

    const blocks = getOrderedBlocks({
      blocks: this.blocks,
      prop: ['header', 'height'],
    });
    blocks.forEach((block) => {
      const data = convertBlock({
        block: block,
        prefix: this.prefix,
        validators: this.validators,
        validatorsSet: this.validatorsSet,
      });
      tableBlocks.push(data);
    });

    this.clear;
    return tableBlocks;
  }
}

const convertBlock = ({ block, prefix, validators, validatorsSet }) => {
  const proposer = proposerHandler.getFromValidatorsSet({
    address: block.header.proposer_address,
    prefix: prefix,
    validatorsSet: validatorsSet,
    validators: validators,
  });

  return {
    height: block.header.height,
    hash: block.last_commit.block_id.hash,
    moniker: proposer ? proposer.description.moniker : '-',
    txs: block.data && block.data.txs ? block.data.txs.length : 0,
    date: new Date(block.header.time).toLocaleString(),
  };
};

const getOrderedBlocks = ({ blocks, prop }) =>
  blocks.sort((a, b) => b[prop[0]][prop[1]] - a[prop[0]][prop[1]]);

export default new BlocksTableAdapter();
