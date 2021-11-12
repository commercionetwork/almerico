import { bech32Manager } from './index';

export default {
  /**
   *
   * @param {String} address
   * @param {String} prefix
   * @param {Array.<Object>} validatorSets
   * @param {Array.<Object>} validators
   * @returns {Object}
   */
  getFromHexAddress({ address, prefix, validatorSets, validators }) {
    const consensusAddress = bech32Manager.encode(address, prefix);
    const proposer = validatorSets.find(
      (validator) => validator.address === consensusAddress,
    );
    if (!proposer) return null;
    return validators.find(
      (validator) => validator.consensus_pubkey.key === proposer.pub_key.value,
    );
  },
  /**
   *
   * @param {String} address
   * @param {String} prefix
   * @param {Array.<Object>} validatorSets
   * @param {Array.<Object>} validators
   * @returns {Object}
   */
  getFromBase64Address({ address, prefix, validatorSets, validators }) {
    const consensusAddress = _getConsensusAddress(address, prefix);
    const proposer = validatorSets.find((validator) => {
      return validator.address === consensusAddress;
    });
    if (!proposer) return null;
    return validators.find((validator) => {
      return validator.consensus_pubkey.key === proposer.pub_key.key;
    });
  },
};

const _getConsensusAddress = (address, prefix) => {
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
