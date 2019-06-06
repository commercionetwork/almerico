const bech32 = require(`bech32`);

const bech32Manager = {
  decode(value) {
    const words = bech32.decode(value);
    return Buffer.from(bech32.fromWords(words.words)).toString(`hex`);
  },
  encode(value, prefix = `comnet`, type = `hex`) {
    const words = bech32.toWords(Buffer.from(value, type));
    return bech32.encode(prefix, words);
  }
}

export default bech32Manager;
