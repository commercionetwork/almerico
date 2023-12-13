import { APIS } from '@/constants';
import axios from 'axios';

const proposals = {
  /**
   *
   * @returns {AxiosPromise}
   */
  requestList(status) {
    return axios({
      method: 'get',
      baseURL: APIS.HTTP.BACKEND_PROPOSALS,
      params: { status },
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
      baseURL: APIS.HTTP.BACKEND_PROPOSALS,
    });
  },
};

export default proposals;
