import {
  mockErrors,
  mockPagination,
  mockPool,
  mockProposal,
  mockProposals,
  mockTally,
  mockVotes,
} from '@/__mocks__';
import actions from '../actions.js';

const mockErrorResponse = mockErrors(400);
let mockError = false;
let mockResponse = null;

describe('store/proposals/actions', () => {
  beforeEach(() => {
    mockError = false;
    mockResponse = null;
  });

  test('if "initProposalsList" reset store, set loading state and get proposals', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    await actions.initProposalsList({ commit, dispatch });

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchProposals');
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "fetchProposals" save proposals, and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchProposals({ commit });

    expect(commit).toHaveBeenCalledWith('setList', mockResponse.data);

    mockError = true;

    await actions.fetchProposals({ commit }, status);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "initProposalsDetail" reset store, set loading state then get proposal detail, tally and votes', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const id = 'id';

    await actions.initProposalsDetail({ commit, dispatch }, id);

    expect(commit).toHaveBeenCalledWith('reset');
    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(dispatch).toHaveBeenCalledWith('fetchPool');
    expect(dispatch).toHaveBeenCalledWith('fetchProposalDetail', id);
    expect(dispatch).toHaveBeenCalledWith('fetchProposalTally', id);
    expect(dispatch).toHaveBeenCalledWith('fetchProposalVotes', id);
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  test('if "fetchPool" commit "setPool", and set the error if it is caught', async () => {
    const commit = jest.fn();

    await actions.fetchPool({ commit });

    commit('setPool', mockResponse.data.pool);

    mockError = true;

    await actions.fetchPool({ commit });

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchProposalDetail" save detail, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const id = 'id';

    await actions.fetchProposalDetail({ commit }, id);

    expect(commit).toHaveBeenCalledWith('setDetail', {
      proposal: mockResponse.data,
    });

    mockError = true;

    await actions.fetchProposalDetail({ commit }, id);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchProposalTally" save proposal tally, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const id = 'id';

    await actions.fetchProposalTally({ commit }, id);

    expect(commit).toHaveBeenCalledWith('setDetail', {
      tally: mockResponse.data.tally,
    });

    mockError = true;

    await actions.fetchProposalTally({ commit }, id);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });

  test('if "fetchProposalVotes" save proposal votes, and set the error if it is caught', async () => {
    const commit = jest.fn();
    const id = 'id';

    await actions.fetchProposalVotes({ commit }, id);

    expect(commit).toHaveBeenCalledWith('setDetail', {
      votes: mockResponse.data.votes,
    });

    mockError = true;

    await actions.fetchProposalVotes({ commit }, id);

    expect(commit).toHaveBeenCalledWith('setError', mockErrorResponse);
  });
});

jest.mock('../../../apis/http/proposals.js', () => ({
  requestList: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: mockProposals(),
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestDetail: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: mockProposal(),
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));

jest.mock('../../../apis/http/governance.js', () => ({
  requestTally: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: { tally: mockTally() },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
  requestVotes: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            votes: mockVotes(),
            pagination: mockPagination(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));

jest.mock('../../../apis/http/staking.js', () => ({
  requestPool: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockError) {
          reject(mockErrorResponse);
        }

        mockResponse = {
          data: {
            pool: mockPool(),
          },
        };
        resolve(mockResponse);
      }, 1);
    });
  },
}));
