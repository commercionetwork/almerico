import { bech32 } from 'bech32';

export default {
  /**
   *
   * @param {String} value
   * @param {String} type
   * @returns {String}
   */
  decode(value, type = 'hex') {
    // obj = { prefix: 'abcdef', words: [0,1,...,31] }
    const obj = bech32.decode(value);
    return Buffer.from(bech32.fromWords(obj.words)).toString(type);
  },
  /**
   *
   * @param {String} value
   * @param {String} prefix
   * @param {String} type
   * @returns {String}
   */
  encode(value, prefix, type = 'hex') {
    const words = bech32.toWords(Buffer.from(value, type));
    return bech32.encode(prefix, words);
  },
};
