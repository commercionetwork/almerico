import CryptoJS from 'crypto-js';

import { CRYPTO } from '@/constants';

const transactionsVerifyHelper = {
  getContent(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        reject('Error reading the file content');
      };
      reader.readAsBinaryString(file);
    });
  },
  getHash(content, algorithm) {
    const alg = algorithm.toLowerCase();
    let hash;
    switch (alg) {
      case CRYPTO.ALGORITHM.MD5:
        hash = CryptoJS.MD5(content);
        break;
      case CRYPTO.ALGORITHM.SHA1:
        hash = CryptoJS.SHA1(content);
        break;
      case CRYPTO.ALGORITHM.SHA224:
        hash = CryptoJS.SHA224(content);
        break;
      case CRYPTO.ALGORITHM.SHA256:
        hash = CryptoJS.SHA256(content);
        break;
      case CRYPTO.ALGORITHM.SHA384:
        hash = CryptoJS.SHA384(content);
        break;
      case CRYPTO.ALGORITHM.SHA512:
        hash = CryptoJS.SHA512(content);
        break;
      default:
        break;
    }
    return hash.toString() || '';
  },
};

export default transactionsVerifyHelper;
