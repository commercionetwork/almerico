import { bech32Manager } from './index';

const proposerHandler = {
  /**
   * Get the full proposer data starting from a validators set
   *
   * @param {String} address
   * @param {String} prefix
   * @param {Array.<Object>} validatorsSet
   * @param {Array.<Object>} validators
   * @returns {Object}
   */
  getFromValidatorsSet({ address, prefix, validatorsSet, validators }) {
    const consensusAddress = _getConsensusAddress(address, prefix);
    const proposer = validatorsSet.find(
      (validator) => validator.address === consensusAddress,
    );
    return validators.find((validator) => {
      return validator.consensus_pubkey.key === proposer.pub_key.key;
    });
  },
};

export default proposerHandler;

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
