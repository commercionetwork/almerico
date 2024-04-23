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
   * @param {String} channelId
   * @param {String} portId
   * @returns {AxiosPromise}
   */
  requestChannelDetail(channelId, portId) {
    return axios({
      url: `/channel/v1/channels/${channelId}/ports/${portId}`,
      method: 'get',
      baseURL: APIS.HTTP.IBC_CORE,
    });
  },
  /**
   *
   * @param {String} channelId
   * @param {String} portId
   * @param {String} lcdUrl
   * @returns {AxiosPromise}
   */
  requestCounterpartyChannelDetail({ channelId, portId, lcdUrl }) {
    return axios({
      url: `ibc/core/channel/v1/channels/${channelId}/ports/${portId}`,
      method: 'get',
      baseURL: `${lcdUrl}`,
    });
  },
};

export default ibcCore;
