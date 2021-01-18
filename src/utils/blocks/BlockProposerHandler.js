import {
  bech32Manager
} from "../index";

class BlockProposerHandler {
  constructor() {
    this.clear();
  }

  clear() {
    this.error = null;
    this.block = null;
    this.validators = null;
    this.validatorsSets = null;
    this.prefix = null;
  }

  setError(error) {
    this.error = error;
    return this;
  }

  setBlock(block) {
    this.block = block;
    return this;
  }

  setValidators(validators) {
    this.validators = validators;
    return this;
  }

  setValidatorsSets(validatorsSets) {
    this.validatorsSets = validatorsSets;
    return this;
  }

  setValidatorConsensusPrefix(prefix) {
    this.prefix = prefix;
    return this;
  }

  get() {
    if (this.error !== "") return "";
    const address = bech32Manager.encode(
      this.block.header.proposer_address,
      this.prefix
    );
    const pubKey = this.validatorsSets.length > 0 ?
      this.validatorsSets.find(
        validator => validator.address === address
      )["pub_key"] :
      "";
    const proposer = pubKey !== "" ? this.validators.find(validator => validator.consensus_pubkey === pubKey) : {};

    this.clear;
    return proposer;
  }
}

export default new BlockProposerHandler();