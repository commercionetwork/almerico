import { APIS } from '@/constants';
import axios from 'axios';

const ibcCore = {
  /**
   *
   * @param {String} connectionId
   * @returns {AxiosPromise}
   */
  requestConnectionChannels(connectionId) {
    return axios({
      url: `/channel/v1/connections/${connectionId}/channels`,
      method: 'get',
      baseURL: APIS.HTTP.IBC_CORE,
    });
  },
  /**
   *
   * @param {String} connectionId
   * @returns {AxiosPromise}
   */
  requestConnectionClientState(connectionId) {
    return axios({
      url: `/connection/v1/connections/${connectionId}/client_state`,
      method: 'get',
      baseURL: APIS.HTTP.IBC_CORE,
    });
  },
};

export default ibcCore;
