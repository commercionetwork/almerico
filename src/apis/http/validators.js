import { APIS } from '@/constants';
import axios from 'axios';

const validators = {
  /**
   *
   * @returns {AxiosPromise}
   */
  requestList() {
    return axios({
      method: 'get',
      baseURL: APIS.HTTP.BACKEND_VALIDATORS,
    });
  },
  /**
   *
   * @param {String} address
   * @returns {AxiosPromise}
   */
  requestDetail(address) {
    return axios({
      url: `/${address}`,
      method: 'get',
      baseURL: APIS.HTTP.BACKEND_VALIDATORS,
    });
  },
};

export default validators;
