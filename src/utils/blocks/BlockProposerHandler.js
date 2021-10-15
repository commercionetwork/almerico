import { bech32Manager } from '../index';

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
    if (this.error !== null) return '';
    const proposer = getProposer({
      validators: this.validators,
      validatorsSets: this.validatorsSets,
      address: this.block.header.proposer_address,
      prefix: this.prefix,
    });

    this.clear;
    return proposer;
  }
}

const getProposer = ({ validators, validatorsSets, address, prefix }) => {
  const encodedAddress = getEncodedAddress(address, prefix);
  const pubKey = getPubKey(validatorsSets, encodedAddress);
  return getValidator(validators, pubKey);
};

const getValidator = (validators, pubKey) => {
  const index = validators.findIndex(
    (validator) => validator.consensus_pubkey.key === pubKey.key,
  );
  return index > -1 ? validators[index] : {};
};

const getPubKey = (validatorsSets, address) => {
  const index = validatorsSets.findIndex(
    (validator) => validator.address === address,
  );
  return index > -1 ? validatorsSets[index]['pub_key'] : '';
};

const getEncodedAddress = (address, prefix) => {
  const hexAddress = _getHexAddressFromBase64(address);
  return bech32Manager.encode(hexAddress, prefix);
};

const _getHexAddressFromBase64 = (address) => {
  const bytes = Uint8Array.from(atob(address), (c) => c.charCodeAt(0));
  return _toHexString(bytes);
};

const _toHexString = (byteArray) => {
  const hex = byteArray.reduce(
    (output, elem) => output + ('0' + elem.toString(16)).slice(-2),
    '',
  );
  return hex.toUpperCase();
};

export default new BlockProposerHandler();
