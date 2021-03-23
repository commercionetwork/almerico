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
    operator: proposer ? proposer.operator_address : '-',
    txs: block.data && block.data.txs ? block.data.txs.length : 0,
    date: formatDate(block.header.time),
  };
};

const getOrderedBlocks = ({ blocks, prop }) =>
  blocks.sort((a, b) => b[prop[0]][prop[1]] - a[prop[0]][prop[1]]);

const formatDate = (timestamp) => {
  let options = {
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  };
  return new Date(timestamp).toLocaleDateString([], options);
};

export default new BlocksTableAdapter();
