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
    const consensusAddress = bech32Manager.encode(address, prefix);
    const proposer = validatorsSet.find(
      (validator) => validator.address === consensusAddress,
    );
    return validators.find(
      (validator) => validator.consensus_pubkey === proposer.pub_key,
    );
  },
};

export default proposerHandler;
