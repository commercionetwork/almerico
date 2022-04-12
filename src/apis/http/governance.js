import { APIS } from '@/constants';
import axios from 'axios';

const governance = {
  requestList(status) {
    const params = { proposalStatus: status };
    return axios({
      url: `/proposals`,
      method: 'get',
      baseURL: `${APIS.HTTP.GOVERNANCE}`,
      params,
    });
  },
  requestDetail(id) {
    return axios({
      url: `/proposals/${id}`,
      method: 'get',
      baseURL: `${APIS.HTTP.GOVERNANCE}`,
    });
  },
  requestTally(id) {
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
