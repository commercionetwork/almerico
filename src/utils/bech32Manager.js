const bech32 = require('bech32');

const bech32Manager = {
  /**
   * Decode to hex default
   * 
   * @param {String} value 
   * @param {String} type 
   */
  decode(value, type = "hex") {
    // obj = { prefix: 'abcdef', words: [0,1,...,31] }
    const obj = bech32.decode(value);
    return Buffer.from(bech32.fromWords(obj.words)).toString(type);
  },
  /**
   * Encode from hex default
   * 
   * @param {String} value 
   * @param {String} prefix
   * @param {String} type 
   */
  encode(value, prefix, type = "hex") {
    const words = bech32.toWords(Buffer.from(value, type));
    return bech32.encode(prefix, words);
  }
}

export default bech32Manager;