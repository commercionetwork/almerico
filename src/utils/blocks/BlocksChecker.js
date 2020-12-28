import {
  bech32Manager
} from "@/utils";

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

    let index = this.validatorsSet.findIndex(
      (validator) => validator.pub_key === this.validator.consensus_pubkey
    );
    if (index > -1) {
      let hex = bech32Manager.decode(this.validatorsSet[index].address);
      checkedBlocks = this.blocks.sort((a, b) => b['header']['height'] - a['header']['height'])
        .slice(0, this.items);
      checkedBlocks.map(block => {
        let signatureIndex = block.last_commit.signatures.findIndex(
          signature => signature.validator_address.toUpperCase() === hex.toUpperCase()
        );
        block['missing'] = signatureIndex === -1 ? true : false;
      });
    }

    this.clear;
    return checkedBlocks;
  }
}

export default new BlocksChecker();