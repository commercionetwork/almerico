import { APIS } from '@/constants';
import axios from 'axios';

const wasms = {
  /**
   *
   * @param {String} accountAddress
   * @param {String} cw20Code
   * @param {String} swapCode
   * @returns {AxiosPromise}
   */
  requestAccountBalances({ accountAddress, cw20Code, swapCode }) {
    return axios({
      url: `/balances/${accountAddress}/${cw20Code}/${swapCode}`,
      method: 'get',
      baseURL: APIS.HTTP.BACKEND_WASMS,
    });
  },
};

export default wasms;
