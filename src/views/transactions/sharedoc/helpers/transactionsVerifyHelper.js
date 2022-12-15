import jsSHA from 'jssha';
import SparkMD5 from 'spark-md5';

import { CRYPTO } from '@/constants';

const transactionsVerifyHelper = {
  /**
   *
   * @param {File} file
   * @returns {Promise.<ArrayBuffer>}
   */
  getContent(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject('Error reading the file content');
    });
  },
  /**
   *
   * @param {ArrayBuffer} content
   * @param {String} algorithm
   * @returns {String}
   */
  getHash(content, algorithm) {
    const alg = algorithm.toUpperCase();
    const index = Object.values(CRYPTO.ALGORITHM).indexOf(alg);
    if (index < 0) {
      return;
    } else if (alg === CRYPTO.ALGORITHM.MD5) {
      return getMd5(content);
    } else {
      return getSha(content, alg);
    }
  },
};

export default transactionsVerifyHelper;

const getMd5 = (content) => {
  const spark = new SparkMD5.ArrayBuffer();
  spark.append(content);
  return spark.end();
};

const getSha = (content, algorithm) => {
  const shaObj = new jsSHA(algorithm, 'ARRAYBUFFER');
  shaObj.update(content);
  return shaObj.getHash('HEX');
};
