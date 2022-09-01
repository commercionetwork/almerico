import { APIS } from '@/constants';
import axios from 'axios';

const governance = {
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
};

export default governance;
