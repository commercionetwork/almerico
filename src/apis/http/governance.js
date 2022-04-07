import { APIS, PROPOSALS } from '@/constants';
import axios from 'axios';

const governance = {
  requestProposalsList(status = PROPOSALS.STATUS.UNSPECIFIED) {
    return axios({
      url: `/proposals`,
      method: 'get',
      baseURL: `${APIS.HTTP.GOVERNANCE}`,
      params: {
        proposal_status: status,
      },
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
  requestAccountVotes({ id, address }) {
    return axios({
      url: `/proposals/${id}/votes/${address}`,
      method: 'get',
      baseURL: `${APIS.HTTP.GOVERNANCE_LEGACY}`,
    });
  },
};

export default governance;
