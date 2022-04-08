import { APIS } from '@/constants';
import axios from 'axios';
import apisHelper from '../helpers/apisHelper';

const governance = {
  requestList(parameters, pagination) {
    const params = apisHelper.setupParams(parameters, pagination);
    return axios({
      url: `/proposals`,
      method: 'get',
      baseURL: `${APIS.HTTP.GOVERNANCE}`,
      params,
    });
  },
  requestDetail(id) {
    return axios({
      url: `/proposals/${id}/tally`,
      method: 'get',
      baseURL: `${APIS.HTTP.GOVERNANCE}`,
    });
  },
  requestVotes(id) {
    return axios({
      url: `/proposals/${id}/votes`,
      method: 'get',
      baseURL: `${APIS.HTTP.GOVERNANCE}`,
    });
  },
  requestAccountVotesLegacy(address, id) {
    return axios({
      url: `/proposals/${id}/votes/${address}`,
      method: 'get',
      baseURL: `${APIS.HTTP.GOVERNANCE_LEGACY}`,
    });
  },
};

export default governance;
