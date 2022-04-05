import { APIS } from '@/constants';
import axios from 'axios';

const keybase = {
  /**
   *
   * @param {String} id
   * @returns {AxiosPromise}
   */
  requestValidatorLogo(id) {
    const params = {
      key_suffix: id,
      fields: 'pictures',
    };
    return axios({
      url: `/user/lookup.json`,
      method: 'get',
      baseURL: `${APIS.HTTP.KEYBASE}`,
      params,
    });
  },
};

export default keybase;
