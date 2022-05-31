import { APIS } from '@/constants';
import axios from 'axios';

const validators = {
  /**
   *
   * @returns {AxiosPromise}
   */
  requestList() {
    return axios({
      url: '/validators',
      method: 'get',
      baseURL: `${APIS.HTTP.BACKEND}`,
    });
  },
  /**
   *
   * @param {String} address
   * @returns {AxiosPromise}
   */
  requestDetail(address) {
    return axios({
      url: `/validators/${address}`,
      method: 'get',
      baseURL: `${APIS.HTTP.BACKEND}`,
    });
  },
};

export default validators;
