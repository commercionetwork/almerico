import { bech32 } from 'bech32';

export default {
  /**
   *
   * @param {String} value
   * @param {String} type
   * @returns {String}
   */
  decode(value, type = 'hex') {
    let decoded;
    try {
      // obj = { prefix: 'abcdef', words: [0,1,...,31] }
      const obj = bech32.decode(value);
      decoded = Buffer.from(bech32.fromWords(obj.words)).toString(type);
    } catch (error) {
      throw new Error(error);
    }
    return decoded;
  },
  /**
   *
   * @param {String} value
   * @param {String} prefix
   * @param {String} type
   * @returns {String}
   */
  encode(value, prefix, type = 'hex') {
    let encoded;
    try {
      const words = bech32.toWords(Buffer.from(value, type));
      encoded = bech32.encode(prefix, words);
    } catch (error) {
      throw new Error(error);
    }
    return encoded;
  },
};
