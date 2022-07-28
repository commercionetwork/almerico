import { APIS } from '@/constants';
import axios from 'axios';

const proposals = {
  /**
   *
   * @returns {AxiosPromise}
   */
  requestList() {
    return axios({
      method: 'get',
      baseURL: `${APIS.HTTP.BACKEND_PROPOSALS}`,
    });
  },
  /**
   *
   * @param {String} id
   * @returns {AxiosPromise}
   */
  requestDetail(id) {
    return axios({
      url: `/${id}`,
      method: 'get',
      baseURL: `${APIS.HTTP.BACKEND_PROPOSALS}`,
    });
  },
};

export default proposals;
