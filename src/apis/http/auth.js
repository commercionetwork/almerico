import { APIS, SETTINGS } from '@/constants';
import axios from 'axios';

export default {
  /**
   *
   * @returns {AxiosPromise}
   */
  requestFreezedTokensLegacy() {
    const address = SETTINGS.MINTER_ACCOUNT;
    return axios({
      url: `/accounts/${address}`,
      method: 'get',
      baseURL: `${APIS.HTTP.AUTH_LEGACY}`,
    });
  },
};
