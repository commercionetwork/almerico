import { APIS, CONFIG } from '@/constants';
import axios from 'axios';

export default {
  /**
   *
   * @returns {AxiosPromise}
   */
  requestFreezedTokensLegacy() {
    const address = CONFIG.MINTER_ACCOUNT;
    return axios({
      url: `/accounts/${address}`,
      method: 'get',
      baseURL: `${APIS.HTTP.AUTH_LEGACY}`,
    });
  },
};
