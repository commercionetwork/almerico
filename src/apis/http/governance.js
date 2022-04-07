import { APIS } from '@/constants';
import axios from 'axios';
import apisHelper from '../helpers/apisHelper';

const governance = {
  requestProposalsList(parameters, pagination) {
    const params = apisHelper.setupParams(parameters, pagination);
    return axios({
      url: `/proposals`,
      method: 'get',
      baseURL: `${APIS.HTTP.GOVERNANCE}`,
      params,
    });
  },
  requestProposal(id) {
    return axios({
      url: `/proposals/${id}/tally`,
      method: 'get',
      baseURL: `${APIS.HTTP.GOVERNANCE}`,
    });
  },
  requestProposalVotes(id) {
    return axios({
      url: `/proposals/${id}/votes`,
      method: 'get',
      baseURL: `${APIS.HTTP.GOVERNANCE}`,
    });
  },
  requestAccountVotes(address, id) {
    return axios({
      url: `/proposals/${id}/votes/${address}`,
      method: 'get',
      baseURL: `${APIS.HTTP.GOVERNANCE_LEGACY}`,
    });
  },
};

export default governance;
