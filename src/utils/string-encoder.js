const stringEncoder = {
  decodeBase64ToString(base64) {
    let text = window.atob(base64);
    return text.replace(/['"]+/g, '');
  },
  decodeBase64ToObj(base64) {
    return JSON.parse(window.atob(base64));
  },
  encodeObjToBase64(obj) {
    return window.btoa(JSON.stringify(obj));
  },
  decodeFromBase64(data) {
    return atob(data);
  },
  decodeFromHex(data) {
    return data
      .match(/.{2}/g)
      .map((byte) => String.fromCharCode(parseInt(byte, 16)))
      .join('');
  },
  encodeToBase64(data) {
    return btoa(data);
  },
  encodeToHex(data) {
    let hex = '';
    for (let i = 0; i < data.length; i++) {
      const charCode = data.charCodeAt(i).toString(16);
      hex += charCode.padStart(2, '0');
    }
    return hex;
  },
  removeDoubleQuotes(data) {
    return data.replace(/["]+/g, '');
  },
};

export default stringEncoder;
