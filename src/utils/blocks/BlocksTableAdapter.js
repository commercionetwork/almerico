import {
  proposerHandler
} from "@/utils";
import {
  CUSTOMIZATION
} from "@/constants";

class BlocksTableAdapter {
  constructor() {
    this.clear();
  }

  clear() {
    this.blocks = null;
    this.validators = null;
    this.validatorsSet = null;
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

  get() {
    let blocksTable = [];
    let blocks = this.blocks.sort((a, b) => b['header']['height'] - a['header']['height']);
    blocks.forEach(block => {
      const height = block.header.height;
      const hash = block.last_commit.block_id.hash;
      const proposer = proposerHandler.getFromValidatorsSet({
        address: block.header.proposer_address,
        prefix: CUSTOMIZATION.PREFIXES.VALIDATOR.CONSENSUS.ADDRESS,
        validatorsSet: this.validatorsSet,
        validators: this.validators,
      });
      const moniker = proposer ?
        proposer.description.moniker :
        "-";
      const txs = block.data && block.data.txs ?
        block.data.txs.length :
        0;
      const date = new Date(block.header.time).toLocaleString();

      const data = {
        height: height,
        hash: hash,
        moniker: moniker,
        txs: txs,
        date: date,
      };
      blocksTable.push(data);
    });

    this.clear;
    return blocksTable;
  }
}

export default new BlocksTableAdapter();