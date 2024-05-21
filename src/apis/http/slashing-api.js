import { APIS } from '@/constants';
import axios from 'axios';

const slashing = {
  /**
   *
   * @param {String} consAddress
   * @returns {AxiosPromise}
   */
  requestSigningInfosByAddress(consAddress) {
    return axios({
      url: `/signing_infos/${consAddress}`,
      method: 'get',
      baseURL: APIS.HTTP.SLASHING,
    });
  },
};

export default slashing;
