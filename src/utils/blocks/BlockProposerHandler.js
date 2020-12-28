import {
  bech32Manager
} from "../index";
import {
  CUSTOMIZATION
} from "@/constants";

class BlockProposerHandler {
  constructor() {
    this.clear();
  }

  clear() {
    this.error = null;
    this.block = null;
    this.validators = null;
    this.validatorsSets = null;
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

  get() {
    if (this.error !== "") return "";
    const address = bech32Manager.encode(
      this.block.header.proposer_address,
      CUSTOMIZATION.PREFIXES.VALIDATOR.CONSENSUS.ADDRESS
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