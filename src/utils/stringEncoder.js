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
};

export default stringEncoder;
