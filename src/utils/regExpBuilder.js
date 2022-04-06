const regExpBuilder = {
  // Return a regular expression to test a blockchain address
  getAddressRegExp(prefix) {
    return new RegExp(prefix + '[a-z0-9]{39}$', 'igm');
  },
  // Return a regular expression to test a transaction hash
  getHashRegExp() {
    return new RegExp(/[0-9A-F]{64}$/, 'igm');
  },
  // Return a regular expression to test a block height
  getHeightRegExp() {
    return new RegExp(/[0-9]{1,}$/, 'igm');
  },
  // Return a regular expression to test a web url
  getUrlRegExp() {
    return new RegExp(/^(ftp|http|https|www):\/\/[^ "]+$/, 'igm');
  },
  // Return a regular expression to match the last segment of a string after latest dot
  getMessageTypeRegExp() {
    return new RegExp(/\.[a-z0-9]{1,}$/, 'igm');
  },
  // Return a regular expression to match the first 3 segments, separated by a dot, of a string beginning with a '/'
  getMessageSourceRegExp() {
    return new RegExp(/^\/[a-z0-9]{1,}\.[a-z0-9]{1,}\.[a-z0-9]{1,}/, 'igm');
  },
};

export default regExpBuilder;
