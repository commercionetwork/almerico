const stringEncoder = {
  encodeObjToBase64(obj) {
    return window.btoa(JSON.stringify(obj));
  },
};

export default stringEncoder;
